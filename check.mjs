#!/usr/bin/env node
// 通过 Nx 运行整个仓库的 TypeScript 类型检查。
//
// `nx run-many` 在目标选择为空时会以 0 退出（“No tasks were
// run”）。这就是根命令指向一个没有任何项目配置的目标名称时，数月来仍然
// 显示成功的原因（PNI-299）。此包装脚本会在没有项目提供 `typecheck` 目标时失败，
// 并打印所选项目数量，确保空选择不会悄无声息地通过。
//
// 此命令的约定是“检查每个项目的类型”。`--projects`/`--exclude` 等选择标志会被
// 拒绝，而不会转发：它们可能绕过保护机制，将运行范围缩小到零个任务；而仅为
// 确保计数准确就重新实现 Nx 的参数解析，是得不偿失的做法。若要自定义选择，
// 请直接运行 `pnpm nx run-many -t typecheck --projects=...`，并自行处理其空选择语义。

import { spawnSync } from "node:child_process";

const useShell = process.platform === "win32";

// pnpm 会原样转发 `--` 分隔符（`pnpm run check-types -- --skip-nx-cache`
// 会得到 argv ["--", "--skip-nx-cache"]），而 nx 会将 `--` 后的所有内容视为
// 任务覆盖参数并传给 tsc。移除它，以便转发的标志传递给 nx。
const forwarded = process.argv.slice(2).filter((arg, index) => !(arg === "--" && index === 0));

// 只允许不影响选择范围的标志；其他参数一律拒绝，并提示使用 nx。
const allowedFlags = new Set(["--skip-nx-cache", "--verbose"]);
const rejected = forwarded.filter((arg) => !allowedFlags.has(arg));
if (rejected.length > 0) {
  console.error(
    `check-types：不支持的参数：${rejected.join(" ")}\n` +
      "check-types 始终检查每个项目的类型。若要自定义选择，请运行\n" +
      "  pnpm nx run-many -t typecheck --projects=<projects>\n" +
      "（注意：选择为空时 nx 会以 0 退出）。",
  );
  process.exit(1);
}

const shown = spawnSync("nx", ["show", "projects", "--with-target", "typecheck", "--json"], {
  encoding: "utf8",
  shell: useShell,
});

if (shown.status !== 0) {
  process.stderr.write(shown.stdout ?? "");
  process.stderr.write(shown.stderr ?? "");
  console.error("check-types：列出具有 typecheck 目标的项目失败。");
  process.exit(shown.status ?? 1);
}

let projects;
try {
  projects = JSON.parse(shown.stdout);
} catch {
  console.error("check-types：无法解析 `nx show projects` 的输出：");
  console.error(shown.stdout);
  process.exit(1);
}

if (!Array.isArray(projects) || projects.length === 0) {
  console.error(
    "check-types：没有项目提供 `typecheck` 目标；拒绝报告成功。",
  );
  process.exit(1);
}

console.log(`check-types：正在为 ${projects.length} 个项目运行 typecheck 目标`);

const run = spawnSync("nx", ["run-many", "-t", "typecheck", ...forwarded], {
  stdio: "inherit",
  shell: useShell,
});

process.exit(run.status ?? 1);
