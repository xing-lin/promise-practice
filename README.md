# prmoise

## promise state

1. promise 内部有三种状态："pending"、"fulfilled" 和 "rejected"。
2. 每个 promise 都会从 pending 状态开始经历一个短暂的声明周期。pending 表示 promise 是未交付（unsettled）。
3. 当 promise 交付时（settled），promise 会进入 Fulfilled（成功完成） 或者 Rejected（失败） 其中一种状态。
4. 状态的变化只能由 pending 到 fulfilled，或者 pending 到 rejected。

## promise then

1. promise 可以用 then 方法去接收，同时 then 方法携带两个参数，第一个参数返回 fulfilled function（与异步操作相关的数据都传递给该函数），第二个参数返回 rejected function（拒绝交付的相关数据都传递给该函数）。
2. then 方法的参数是可选的，可以两个都写，可以只写第一个，也可以将第一个设置为 null，只设置 rejection handler。

```js
const promise = fetch("./data.json");

promise.then(
  (response) => {
    console.log("response->", response.status);
  },
  (reason) => {
    console.error("reason->", reason.message);
  }
);

promise.then((response) => {
  console.log("response->", response.status);
});

promise.then(null, (reason) => {
  console.error("reason->", reason.message);
});
```

## promise catch

1. catch 方法与 then 方法中第二个参数方法一样，接收 rejection handler。
2. then 与 catch 结合使用的目的是更清楚的显示和如何处理结果，它使成功或者失败更加的清楚。建议写法上 then 只处理成功的情况，catch 专门处理失败的情况。

```js
const promise = fetch("./data.json");

promise.catch((reason) => {
  // rejection
  console.error("reason->", reason.message);
});

// is the same as:

promise.then(null, (reason) => {
  // rejection
  console.log("reason->", reason.message);
});
```

## promise finally

1. finally 不像 then 和 catch，它的回调不接收任何参数。因为它不关心 promise 此时的状态是 fulfilled 还是 rejected。
2. 不管 promise 是 fulfilled 还是 rejected 都会执行到 finally。

```js
promise.finally(() => {
  // no way to know if fulfilled or rejected
  console.log("settled ->", promise);
});

// 就像这种写法，then 中的两个回调都会执行到该方法一样。

const callback = () => {
  console.log("settled ->");
};

promise.then(callback, callback);
```

## 微任务和宏任务

1. promise 中所有的方法，无论是 then，catch，finally，all 等都是微任务。
2. 微任务会抢先在宏任务前面执行，常见的宏任务有 setTimeout 和 setInterval。
3. Promise 类方法一旦创建会立即生效，它既不是宏任务也不是微任务。

```js
setTimeout(() => {
  console.log("timer");

  Promise.resolve(null).then(() => {
    console.log("microtask in timer");
  });
}, 0);

console.log("normal1");

Promise.resolve(null).then(() => {
  console.log("microtask1");
});

new Promise(() => {
  console.log("new Promise");
});

Promise.all([]).then(() => {
  console.log("microtask2");
});

console.log("normal2");

// normal1
// new Promise
// normal2
// microtask1
// microtask2
// timer
// microtask in timer
```

## new Promise

- 在 Promise 类方法中，状态只会被 resolve 或者 reject 响应一次，后面的 resolve 或者 reject 方法会被忽略。

```js
new Promise((resolve, reject) => {
  reject(3);
  // 后面的 resolve 或者 reject 会被忽略
  resolve(1);
  resolve(2);
  reject(4);

  console.log("end");
})
  .then((response) => {
    console.log("response->", response);
  })
  .catch((error) => {
    console.error("error->", error);
  });

// end
// error-> 3
```

- 如果在 Promise 类方法中抛出了异常，视为 reject 方法被调用了。

```js
const promise = new Promise(() => {
  throw new Error("error!");
});

// is the same as
const promise1 = new Promise((resolve, reject) => {
  try {
    throw new Error("error!");
  } catch (error) {
    reject(error);
  }
});

promise.catch((error) => {
  console.error("error->", error.message);
});

// error-> error!
```

### promise resolve

- resolve 接收一个参数，并以 promise fulfiiled 状态返回。并且 rejection handler 永远不会被执行。

```js
const promise = Promise.resolve(2);

promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log("never be called");
  });

// 2
```

- 如果将 Promise.resolve 传给 Promise.resolve，它会返回相同的 Promise.resolve

```js
const promise1 = Promise.resolve(22);
const promise2 = Promise.resolve(Promise.resolve(Promise.resolve(promise1)));

console.log(promise1 === promise2); // true
```

## promise reject

```js
const promise = Promise.reject(42);

promise.catch((error) => {
  console.log(error);
});
```

## thenable

- Any object that has a method named “then” is called a “thenable” object.
- promise 是 thenable，thenable 不一定是 promise。
- Promise.resolve、Promise.reject 可以将 thenable 的对象转为 promise 对象

```js
const thenable = {
  then(resolve, reject) {
    resolve(42);
  },
};

const promise = Promise.resolve(thenable);

promise.then((value) => {
  console.log(value); //42
});
```

## chaining promises

- then(), catch() 或者 finally() 都会创建并返回一个 promise。
- then() 和 catch() 都会取上一个 promise 状态为 settled 返回的值和状态。

```js
const promise = Promise.resolve(18);

promise
  .then((value) => {
    console.log(value);
    return 33;
  })
  .then((value2) => {
    console.log(value2);
  });

// 18
// 33

const promise = Promise.resolve(18);

promise
  .then((value) => {
    console.log("value->", value);
    return Promise.reject(111);
  })
  .then((value2) => {
    console.log(value2);
  })
  .catch((error) => {
    console.log("error->", error);
  });

// value-> 18
// error-> 111
```

- finally() 不同，它取不到上一次 settled promise 的状态和值。它也不返回 fulfiiled 的值（如果有 return fulfilled 的值也会被忽略），但是会返回 rejected 的值。

```js
{
  const promise = Promise.resolve(18);

  promise
    .finally(() => {
      console.log("finally");
      return Promise.resolve(20); // 会被忽略
    })
    .then((value) => {
      console.log(value); // 返回的是 18
    });

  // finally
  // 18
}

{
  const promise = Promise.reject(18);

  promise
    .finally(() => {
      console.log("finally");
      // finally 会忽略 fulfilled 的值，但是会返回 rejected 的值
      // throw Error 相当于隐式调用了 promise.reject
      //   return Promise.reject(20);
      throw new Error("20");
    })
    .catch((value) => {
      console.log(value.message);
    });

  // finally
  // 20
}

{
  const promise1 = Promise.resolve(42);

  const promise2 = promise1.finally(() => {
    console.log("Finally called.");
  });

  promise2.then((value) => {
    console.log(value); // 42
  });

  // 虽然 promise1 跟 promise2 最终都是返回一个 promise 并且值为 42
  // 但是它们不是一个对象
  console.log(promise1 === promise2); // false
}
```

- 在 then() 和 catch() 中 return 的值都视为 fulfilled 并返回到下一个 promise

```js
{
  const promise = Promise.reject(18);

  promise
    .catch((value) => {
      return value + 1;
    })
    .then((value) => {
      console.log(value); // 19;
    });
}

{
  const promise = Promise.resolve(18);

  promise
    .then((value) => {
      return value + 2;
    })
    .then((value) => {
      console.log(value); // 20
    });
}
```

## Promise.all()

- Promise.all()接收一个可迭代的参数（比如数组），并且当这个可迭代参数中的每个 promise 都是 resolved 的状态，返回的 promise 才是 fulfilled 状态

```js
const promise1 = Promise.resolve(42);

const promise2 = new Promise((resolve, reject) => {
  resolve(43);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(44);
  }, 100);
});

const promise4 = Promise.all([promise1, promise2, promise3]);

promise4.then((value) => {
  console.log(Array.isArray(value)); // true
  console.log(value[0]); // 42
  console.log(value[1]); // 43
  console.log(value[2]); // 44
});
```

- 当 Promise.all() 接收的参数中有一个返回了 rejection，那么 Promise.all() 会立即返回 rejected 状态（不会走到 fulfilled handler），而不会等待所有任务全都执行完成。

```js
const promise1 = Promise.reject(42);

const promise2 = new Promise((resolve, reject) => {
  reject(43);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(44);
  }, 100);
});

const promise4 = Promise.all([promise1, promise2, promise3]);

promise4
  .then((value) => {
    console.log("one of value is rejected, here is never called");
  })
  .catch((err) => {
    // 有多个rejection，也只会返回第一个。
    console.log(err); // 42
  });
```

- 何时使用 Promise.all()
  - 需要等待多个 promise 返回并且任何一个 promise 错误整个操作都将失败（访问多个接口，处理文件）。
  - 创建人为的延时，比如请求一个接口，但是该请求接口速度太快，以至于 loading 的样式变化不易察觉，用户感知不到，那么可以添加一个延时在接口中。

```js
function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

function fetchUserData(userId) {
  appElement.style.background = "green";
  const urls = [
    `${API_BASE}/users/${userId}/posts`,
    `${API_BASE}/users/${userId}/albums`,
  ];

  return Promise.all(
    [...urls.map((url) => fetch(url)), delay(1500)].then((results) => {
      return results.slice(0, result.length - 1);
    })
  );
}
```

## Promise.allSettled()

- Promise.allSettled() 与 Promise.all() 的区别就是 Promise.allSettled() 总会返回可迭代参数中的每个结果，不论参数中的结果是 fulfilled 还是 rejected，整个 Promise.allSettled 返回的都是 fulfilled 状态。
- Promise.allSettled() 返回的结果还是一个对象数组，且每一个对象都有两个属性值。一个属性值为 status ，它有 'fulfilled' or 'reason'两种。如果 status 值为 fulfilled，那么另一个属性为 value，如果 status 值为 rejected，那么另一个属性为 reason。

```js
const promise1 = Promise.resolve("42");

const promise2 = Promise.reject(43);

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(44);
  }, 100);
});

const promise4 = Promise.allSettled([promise1, promise2, promise3]);

promise4.then((results) => {
  console.log("results->", results);
});

// results-> [
//   { status: 'fulfilled', value: '42' },
//   { status: 'rejected', reason: 43 },
//   { status: 'fulfilled', value: 44 }
// ]
```

- 何时使用 Promise.allSettled()：使用 Promise.all() 的场景下都可以用 Promise.allSettled() 来代替。不过它最佳使用场景是你想要忽略 rejections，不需要所有的请求都是成功的。

## Promise.any()

- Promise.any() 方法也是接收一个可迭代的 promise 参数，同时只要有一个任意一个 promise 为 fulfiiled 返回，整个结果就会以 fulfilled 返回。

```js
const promise1 = Promise.reject(43);

const promise2 = Promise.resolve(42);

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(44);
  }, 100);
});

const promise4 = Promise.any([promise1, promise2, promise3]);

promise4
  .then((value) => {
    console.log("value->", value); // 42
  })
  .catch((reason) => {
    // 不会走到这边
    console.log("reason->", reason);
  });
```

- 如果全部返回的是 rejected 状态

```js
const promise1 = Promise.reject(43);

const promise2 = Promise.reject(42);

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(44);
  }, 100);
});

const promise4 = Promise.any([promise1, promise2, promise3]);

promise4
  .then((value) => {
    // 不会走到这边
    console.log("value->", value);
  })
  .catch((reason) => {
    console.log("reason->", reason);
    console.log(reason.message); // All promises were rejected
    console.log(reason.errors); // [ 43, 42, 44 ]
  });

//   reason-> [AggregateError: All promises were rejected] {
//     [errors]: [ 43, 42, 44 ]
//   }
```

- 何时使用 Promise.any()：只要其中一个成功，不关心其他是否失败。除非全部失败。
  - 对冲请求 <https://www.barroso.org/publications/TheTailAtScale.pdf>：客户端向多个服务器发出请求，并接受第一个响应的服务器的响应
  - 使用最快的响应（数据一样，来源不同）。比如说一个是从缓存里面拿的数据，一个是从服务端拿的数据，在一些情况下，服务端返回的数据可能更快。
  - 判断服务器是否能正常响应数据，请求多个接口，能有正常的返回的就行。

## Promise.race()

- Promise.race() 跟 Promise.any() 区别：Promise.any() 尽量会返回 fulfilled 的状态，除非整个数组中全是 rejections，而 Promise.race() 返回的 promise 状态取决于参数中最快返回的那个的状态，哪怕状态是 rejected。

```js
{
  const promise1 = Promise.resolve(42);

  const promise2 = new Promise((resolve, reject) => {
    resolve(43);
  });

  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(44);
    }, 100);
  });

  const promise4 = Promise.race([promise1, promise2, promise3]);

  promise4.then((value) => {
    console.log(value); // 42
  });
}

{
  const promise1 = Promise.reject(42);

  const promise2 = new Promise((resolve, reject) => {
    resolve(43);
  });

  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(44);
    }, 100);
  });

  const promise4 = Promise.race([promise1, promise2, promise3]);

  promise4
    .then((value) => {
      // 不会走到这方法
      console.log(value);
    })
    .catch((reason) => {
      console.log("reason->", reason);
    });
}
```

- 何时使用 Promise.race()：返回最快请求的那个，短路剩下的 promise 操作。
  - fetch 中没有超时机制，利用 Promise.race() 设置超时机制，当超时的时间是 race 中返回的最短时间，意味着其他接口可能超时

```js
function timeout(milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Request timed out"));
    }, milliseconds);
  });
}

function fetchWithTimeout(...args) {
  return Promise.race([fetch(...args), timeout(5000)]);
}

const API_URL = `https://jsonplaceholder.typicode.com/users`;

fetchWithTimeout(API_URL)
  .then((response) => response.json())
  .then((users) => console.log(users))
  .catch((reason) => console.error(reason.message));
```

## async-await（底层 promise，generator）

- async-await 抽象了 promise，不用担心跟踪 promise 和 promise 的各种处理程序，最终使代码遵循一个自上而下的顺序。
- the return value is always a promise（实际上 async 在幕后总是调用 promise.resolve 来保证总会返回一个 promise）

```js
async function doNothing() {}

doNothing().then((value) => {
  console.log("value->", value); // undefined
});

async function getMeaningOfLife() {
  return 42;
  // return Promise.resolve(Promise.reject(43));
  // return Promise.reject(43);
}

// function getMeaningOfLife1() {
//   return 42;
// }

// console.log(getMeaningOfLife() instanceof Promise); // true
// console.log(getMeaningOfLife1() instanceof Promise); // false

const result = getMeaningOfLife();

result
  .then((value) => {
    console.log("value->", value); // 42 'number'
  })
  .catch((reason) => {
    console.log("reason->", reason); // 43
  });
```

- thrown errors are promise rejections

```js
async function throwError() {
  throw new Error("Oh no");
}

// try-catch 捕捉不到错误，因为返回的是一个 rejected promise
// try {
//   throwError();
//   console.log("catch error");
// } catch (error) {
//   console.log("never called");
// }

throwError().catch((reason) => {
  console.log(reason.message); // 'Oh no'
});
```

- the await expression can be used：await 表达式中使用的任何 promise 的行为更像同步函数中的代码：当 promise 成功时，表达式返回 promise 的已实现值，当 promise 失败时抛出拒绝值。这允许您轻松地将 await 表达式的结果分配给变量，并使用 try-catch 语句捕获任何拒绝。

```js
// without await

function retrieveJsonData(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Unexpected status code: ${response.status} ${response.statusText}`
        );
      }
    })
    .catch((reason) => {
      console.error(reason.message);
    });
}

// with await

async function retrieveJsonData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        `Unexpected status code: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(error.message);
  }
}
```

- the for-await-of loop can be used

async 函数中启用的另一个特殊语法是 for-await-of 循环（第一个特殊用法是 await 表达式），它允许您从可迭代对象或异步可迭代对象中检索值。iterable 是一个具有符号的对象。 for-await-of 循环在每个循环上调用 Promise.resolve() 从可迭代对象返回的值，然后等待之前解析的每个 promise 继续到循环的下一次迭代。

```js
async function* foo() {
  yield 1;
  yield 2;
}

(async function () {
  for await (const num of foo()) {
    console.log(num);
    // Expected output: 1

    break; // Closes iterator, triggers return
  }
})();
```

### “for await…of”和“Promise.all()”之间的主要区别

除了 for await...of 和 Promise.all() 返回值的细微差别以外，最主要的区别是 for await...of 是串行执行，可以更精细地控制数组内每个 promise 执行的顺序，如果 promise 完成的顺序很重要，那么 for await...of 是首选。Promise.all() 是并行执行，不关心数组内每个 promise 执行的顺序，执行速度更快。

## Unhandled Rejection Tracking

1. onunhandledrejection
2. onrejectionhandled
