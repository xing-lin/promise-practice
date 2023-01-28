// 追踪未处理的 promise 失败的情况
const possiblyUnhandledRejections = new Map();

let rejected = Promise.reject(new Error("hhh"));

setTimeout(() => {
  rejected.catch((reason) => {
    console.log(reason);
  });
}, 5000);

globalThis.onunhandledrejection = (event) => {
  // 去掉浏览器控制台上的输出警告
  //   event.preventDefault();
  console.log(event.type);
  possiblyUnhandledRejections.set(event.promise, event.reason);
  console.log(possiblyUnhandledRejections);
};

globalThis.onrejectionhandled = (event) => {
  console.log(event.type);
  possiblyUnhandledRejections.delete(event.promise);
  console.log(possiblyUnhandledRejections);
};
