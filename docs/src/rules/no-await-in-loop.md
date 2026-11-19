---
title: no-await-in-loop
rule_type: problem
---


对可迭代对象中的每个元素执行操作是常见任务。不过，如果在每次操作中都使用 `await`，这可能表明程序没有充分利用 `async`/`await` 的并行化优势。

通常，可以重构代码，一次性创建所有 Promise，然后使用 `Promise.all()`（或其他[Promise 并发方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#promise_concurrency)）获取结果。否则，每次后续操作都要等前一次操作完成后才能开始。

具体来说，下面的函数可以按如下方式重构：

```js
async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Bad: each loop iteration is delayed until the entire asynchronous operation completes
    results.push(await doAsyncWork(thing));
  }
  return results;
}
```

```js
async function foo(things) {
  const promises = [];
  for (const thing of things) {
    // Good: all asynchronous operations are immediately started.
    promises.push(doAsyncWork(thing));
  }
  // Now that all the asynchronous operations are running, here we wait until they all complete.
  const results = await Promise.all(promises);
  return results;
}
```

这样做在细微的错误处理方面也可能有好处。如果有一个 Promise 数组，其中的 Promise 可能会被拒绝，按顺序等待会使程序面临未处理的 Promise 拒绝风险。未处理拒绝的具体行为取决于代码运行的环境，但无论如何，它们通常都被认为有害。例如，在 Node.js 中，除非另行配置，否则[未处理的拒绝会导致程序终止](https://nodejs.org/api/cli.html#--unhandled-rejectionsmode)。

```js
async function foo() {
    const arrayOfPromises = somethingThatCreatesAnArrayOfPromises();
    for (const promise of arrayOfPromises) {
        // Bad: if any of the promises reject, an exception is thrown, and
        // subsequent loop iterations will not run. Therefore, rejections later
        // in the array will become unhandled rejections that cannot be caught
        // by a caller.
        const value = await promise;
        console.log(value);
    }
}
```

```js
async function foo() {
    const arrayOfPromises = somethingThatCreatesAnArrayOfPromises();
    // Good: Any rejections will cause a single exception to be thrown here,
    // which may be caught and handled by the caller.
    const arrayOfValues = await Promise.all(arrayOfPromises);
    for (const value of arrayOfValues) {
        console.log(value);
    }
}
```

<a id="rule-details"></a>

## 规则详情

此规则禁止在循环体内使用 `await`。

符合此规则的代码示例：

:::correct

```js
/*eslint no-await-in-loop: "error"*/

async function foo(things) {
  const promises = [];
  for (const thing of things) {
    // Good: all asynchronous operations are immediately started.
    promises.push(doAsyncWork(thing));
  }
  // Now that all the asynchronous operations are running, here we wait until they all complete.
  const results = await Promise.all(promises);
  return results;
}
```

:::

不符合此规则的代码示例：

:::incorrect

```js
/*eslint no-await-in-loop: "error"*/

async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Bad: each loop iteration is delayed until the entire asynchronous operation completes
    results.push(await doAsyncWork(thing));
  }
  return results;
}

async function bar(things) {
  for (const thing of things) {
    await using resource = getAsyncResource(thing);
  }
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

在许多情况下，循环的各次迭代实际上并非彼此独立，因此在循环中等待是正确的。以下是一些示例：

* 任何应按顺序运行的代码，例如实现倒计时，或按顺序处理项目（其中每个项目已经并行处理），如下例所示：

    ```js
    async function printCountdown() {
        for (let i = 0; i < 10; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // sleep 1 second
            console.log(i);
        }
    }
    ```

* 使用本质上按顺序运行（由底层操作系统控制）的标准浏览器/操作系统 API，例如 `File` 或读取目录内容，如下例所示：

    ```js
    async function writeNumbersToFile() {
        for (let i = 0; i < 100; i++) {
            // Doing this in parallel would interleave (garble) the resulting file contents.
            await fileWriteStream.write(i + "\n");
        }
    }
    ```

* 创建 Promise 会分配有限资源（RAM、文件描述符、网络带宽）的代码，如下例所示：

    ```js
    async function streamingProcess() {
        for (let i = 0; i < 10; i++) {
            await ramIntensiveAction(data[i]);
        }
    }
    ```

    ```js
    async function checkFiles() {
        for (let i = 0; i < 10000; i++) {
            // Here some concurrency may be desirable to reduce I/O bottlenecks,
            // but not unbounded concurrency as that will fail,
            // running out of file descriptors.
            await openFileAndThrowIfContentsMeetCondition(filenames[i]);
        }
    }
    ```

* 某次迭代的输出可能会用作另一次迭代的输入。

    ```js
    async function loopIterationsDependOnEachOther() {
        let previousResult = null;
        for (let i = 0; i < 10; i++) {
            const result = await doSomething(i, previousResult);
            if (someCondition(result, previousResult)) {
                break;
            } else {
                previousResult = result;
            }
        }
    }
    ```

    前面的示例与此情况类似，但它们依赖的是某次迭代所需的副作用；而此示例则通过结果变量明确体现了这种依赖关系。

* 循环可用于重试未成功的异步操作。

    ```js
    async function retryUpTo10Times() {
        for (let i = 0; i < 10; i++) {
            const wasSuccessful = await tryToDoSomething();
            if (wasSuccessful)
                return 'succeeded!';
            // wait to try again.
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        return 'failed!';
    }
    ```

* 循环可用于防止代码并行发送过多请求。

    ```js
    async function makeUpdatesToRateLimitedApi(thingsToUpdate) {
        // we'll exceed our rate limit if we make all the network calls in parallel.
        for (const thing of thingsToUpdate) {
            await updateThingWithRateLimitedApi(thing);
        }
    }
    ```

在这些情况下，在循环中使用 `await` 是合理的，建议通过标准的 ESLint 禁用注释禁用此规则。
