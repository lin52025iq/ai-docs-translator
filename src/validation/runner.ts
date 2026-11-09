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
    const global = project?.config.validation.global

    async function run(command: [string, ...string[]], cwd: string, variables: Record<string, string>) {
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
            await execute(executable, args, { cwd, env, timeout: 600_000, maxBuffer: 1024 * 1024 })
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
            return [{ message: (stderr || stdout || '校验命令拒绝了译文').slice(0, 8000) }]
        }
    }

    return {
        async file(path: string, content: string): Promise<Diagnostic[]> {
            const selected = rules.filter((rule) => rule.matches(path))
            if (!selected.length) return []
            const directory = await mkdtemp(join(tmpdir(), 'translator-candidate-'))
            try {
                const file = join(directory, basename(path))
                await writeFile(file, content)
                const diagnostics: Diagnostic[] = []
                for (const rule of selected) {
                    const result = await run(rule.command, configDir, { configDir, file, path })
                    diagnostics.push(...result.map((entry) => ({ ...entry, path })))
                }
                return diagnostics
            } finally {
                await rm(directory, { recursive: true, force: true })
            }
        },
        async global(directory: string): Promise<Diagnostic[]> {
            return global ? await run(global.command, directory, { configDir }) : []
        }
    }
}
