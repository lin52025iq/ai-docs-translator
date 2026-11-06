/** 进度写入 stderr，保证 stdout 可单独保存为项目结果 JSON。 */
export function logProgress(message: string) {
    console.error(`[${new Date().toISOString()}] ${message}`)
}

/** Actions 显示警告注解，本地仍写入 stderr，不影响结果 JSON。 */
export function logWarning(message: string) {
    if (process.env.GITHUB_ACTIONS === 'true') {
        const escaped = message.replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A')
        console.error(`::warning::${escaped}`)
    } else {
        logProgress(`警告：${message}`)
    }
}
