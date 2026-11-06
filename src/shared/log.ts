/** 进度写入 stderr，保证 stdout 可单独保存为项目结果 JSON。 */
export function logProgress(message: string) {
    console.error(`[${new Date().toISOString()}] ${message}`)
}
