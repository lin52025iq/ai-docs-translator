<a id="eslint-documentation"></a>
# ESLint 文档

<a id="install-dependencies"></a>
## 安装依赖项

在 `docs` 文件夹中运行以下命令，安装文档站点所需的所有依赖项：

```shell
npm install
```

<a id="run-locally"></a>
## 在本地运行

在 `docs` 文件夹中运行以下命令，在本地启动文档站点：

```shell
npm start
```

构建完成后，可通过
<http://localhost:2023> 访问文档站点。

<a id="scripts"></a>
## 脚本

在项目根目录（而非 `docs` 文件夹）中运行以下命令，更新链接数据文件：

```shell
npm run build:docs:update-links
```

在项目根目录（而非 `docs` 文件夹）中运行以下命令，对文档中的 JavaScript 文件进行代码检查：

```shell
npm run lint:docs:js
```

在项目根目录（而非 `docs` 文件夹）中运行以下命令，自动修复 JavaScript 文件：

```shell
npm run lint:fix:docs:js
```

<a id="license"></a>
## 许可证

© OpenJS Foundation 和 ESLint 贡献者，[www.openjsf.org](https://www.openjsf.org/)。内容依据 [MIT 许可证](https://github.com/eslint/eslint/blob/main/LICENSE)授权。
