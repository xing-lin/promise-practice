async function throwError() {
  throw new Error("Oh no");
}

// try-catch 捕捉不到错误，因为返回的是一个 rejected promise
try {
  throwError();
  console.log("catch error");
} catch (error) {
  console.log("never called");
}

throwError().catch((reason) => {
  console.log(reason.message); // 'Oh no'
});


// // 如果想要在 try-catch 中捕获，需要使用 await 表达式

// async function a() {
//   try {
//     await throwError(); // 直接抛出异常
//     console.log("catch error"); // 这句不会被执行
//   } catch (error) {
//     console.log("never called"); // 这句会输出
//   }
// }
// a(); // never called
