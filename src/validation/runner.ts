import { execFile } from 'node:child_process'
import { access, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import { promisify } from 'node:util'

import picomatch from 'picomatch'
import { z } from 'zod'

import { type Project } from '../project/config.ts'
import { repositoryPathSchema } from '../shared/files.ts'

const diagnosticSchema = z.strictObject({
    path: repositoryPathSchema.optional(),
    message: z.string().min(1),
    line: z.number().int().positive().optional(),
    column: z.number().int().positive().optional()
})
export type Diagnostic = z.infer<typeof diagnosticSchema>
const execute = promisify(execFile)

/** 项目维护者提供的命令受信任。只传运行所需环境，不继承业务凭据。 */
export function createValidation(project?: Project) {
    const configDir = project?.directory ?? process.cwd()
    const rules =
        project?.config.validation.files.map((rule) => ({
            ...rule,
            matches: picomatch(rule.include, { dot: true })
        })) ?? []
    const { global, prepare } = project?.config.validation ?? {}
    const prepared = new Set<string>()

    async function run(command: [string, ...string[]], cwd: string, variables: Record<string, string>, stdin?: string) {
        const [program, ...parameters] = command
        let executable = program
        let args = parameters.map((value) => {
            if (value === '{file}') return variables.file
            if (value === '{path}') return variables.path
            return value.replace('{configDir}', configDir)
        })
        for (const [index, value] of parameters.entries()) {
            if (value.startsWith('{configDir}/')) await access(args[index])
        }
        const pnpm = process.env.npm_execpath
        if (executable === 'pnpm' && process.platform === 'win32' && pnpm && /\.[cm]?js$/i.test(pnpm)) {
            executable = process.execPath
            args = [pnpm, ...args]
        }
        if (executable === 'node') executable = process.execPath
        const systemVariables =
            /^(PATH|HOME|USERPROFILE|SYSTEMROOT|WINDIR|COMSPEC|PATHEXT|TMPDIR|TEMP|TMP|APPDATA|LOCALAPPDATA|CI)$/i
        const env = Object.fromEntries(Object.entries(process.env).filter(([name]) => systemVariables.test(name)))
        try {
            const execution = execute(executable, args, { cwd, env, timeout: 600_000, maxBuffer: 1024 * 1024 })
            execution.child.stdin?.on('error', (error: NodeJS.ErrnoException) => {
                if (error.code !== 'EPIPE') execution.child.kill()
            })
            execution.child.stdin?.end(stdin)
            await execution
            return []
        } catch (error) {
            if (!(error instanceof Error) || !('code' in error) || error.code !== 1) {
                throw new Error('校验命令执行失败：' + command[0], { cause: error })
            }
            const stdout = 'stdout' in error ? String(error.stdout).trim() : ''
            const stderr = 'stderr' in error ? String(error.stderr).trim() : ''
            if (stdout.startsWith('[')) {
                return z.array(diagnosticSchema).min(1).parse(JSON.parse(stdout))
            }
            const output = [stdout, stderr].filter(Boolean).join('\n')
            return [{ message: (output || '校验命令拒绝了译文').slice(-8000) }]
        }
    }

    async function prepareSnapshot(directory: string) {
        if (!prepare || prepared.has(directory)) return
        const issues = await run(prepare, directory, { configDir })
        if (issues.length) throw new Error('校验环境准备失败：' + issues.map((issue) => issue.message).join('\n'))
        prepared.add(directory)
    }

    return {
        needsSnapshot: rules.some((rule) => rule.cwd === 'snapshot'),
        async file(path: string, content: string, snapshot?: string): Promise<Diagnostic[]> {
            const selected = rules.filter((rule) => rule.matches(path))
            if (!selected.length) return []
            const directory = await mkdtemp(join(tmpdir(), 'translator-candidate-'))
            try {
                const file = join(directory, basename(path))
                await writeFile(file, content)
                const diagnostics: Diagnostic[] = []
                for (const rule of selected) {
                    const cwd = rule.cwd === 'snapshot' ? snapshot : configDir
                    if (!cwd) throw new Error('该文件校验规则需要项目快照')
                    if (rule.cwd === 'snapshot') await prepareSnapshot(cwd)
                    const result = await run(
                        rule.command,
                        cwd,
                        { configDir, file, path },
                        rule.stdin ? content : undefined
                    )
                    diagnostics.push(...result.map((entry) => ({ ...entry, path })))
                }
                return diagnostics
            } finally {
                await rm(directory, { recursive: true, force: true })
            }
        },
        async global(directory: string): Promise<Diagnostic[]> {
            if (!global) return []
            await prepareSnapshot(directory)
            const commands = 'commands' in global ? global.commands : [global.command]
            for (const command of commands) {
                const issues = await run(command, directory, { configDir })
                if (issues.length) return issues
            }
            return []
        }
    }
}
