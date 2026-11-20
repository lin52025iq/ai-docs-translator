import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'

const source = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const candidate = JSON.parse(readFileSync(0, 'utf8'))
const errors = []
if (!candidate || !isDeepStrictEqual(Object.keys(source), Object.keys(candidate))) {
    errors.push('请逐项保留原始对象的规则名和顺序。')
} else {
    for (const [rule, description] of Object.entries(source)) {
        const translated = candidate[rule]
        if (
            typeof translated !== 'string' ||
            !/\p{Script=Han}/u.test(translated) ||
            /[<>\0\r\n]/.test(translated) ||
            /\[[^\]]*\][(:]|!\[/.test(translated) ||
            !isDeepStrictEqual(description.match(/`[^`]+`/g)?.sort(), translated.match(/`[^`]+`/g)?.sort())
        ) {
            errors.push(`${rule}: 请用纯文本简体中文翻译，并保留所有反引号内的字面量。原文：${description}`)
        }
    }
}
if (errors.length) {
    console.log(JSON.stringify([{ message: errors.slice(0, 20).join('\n') }]))
    process.exitCode = 1
}
