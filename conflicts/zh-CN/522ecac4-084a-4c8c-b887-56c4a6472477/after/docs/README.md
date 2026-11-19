# ESLint 文档

<a id="install-dependencies"></a>

## 安装依赖

在 `docs` 文件夹中运行以下命令，为文档站点安装所有必需的依赖：

```shell
npm install
```

<a id="run-locally"></a>

## 本地运行

在 `docs` 文件夹中运行以下命令，即可在本地启动文档站点：

```shell
npm start
```

构建完成后，文档站点将在以下地址提供：
<http://localhost:2023>.

<a id="scripts"></a>

## 脚本

要更新链接数据文件，请在项目根目录（而非 `docs` 文件夹）运行以下命令：

```shell
npm run build:docs:update-links
```

要对文档的 JavaScript 文件进行代码检查，请在项目根目录（而非 `docs` 文件夹）运行以下命令：

```shell
npm run lint:docs:js
```

要自动修复 JavaScript 文件，请在项目根目录（而非 `docs` 文件夹）运行以下命令：

```shell
npm run lint:fix:docs:js
```

<a id="license"></a>

## 许可证

© OpenJS Foundation 和 ESLint 贡献者，[www.openjsf.org](https://www.openjsf.org/)。内容采用 [MIT 许可证](https://github.com/eslint/eslint/blob/main/LICENSE)授权。