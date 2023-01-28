// {
//   const promise = Promise.resolve(18);

//   promise
//     .then((value) => {
//       console.log(value);
//       return 33;
//     })
//     .then((value2) => {
//       console.log(value2);
//     });

//   // 18
//   // 33
// }

// {
//   const promise = Promise.resolve(18);

//   promise
//     .then((value) => {
//       console.log("value->", value);
//       return Promise.reject(111);
//     })
//     .then((value2) => {
//       console.log(value2);
//     })
//     .catch((error) => {
//       console.log("error->", error);
//     });

//   // value-> 18
//   // error-> 111
// }

// {
//   const promise = Promise.resolve(18);

//   promise
//     .finally(() => {
//       console.log("finally");
//     })
//     .then((value) => {
//       console.log(value);
//     });

//   // finally
//   // 18
// }

// {
//   const promise = Promise.resolve(18);

//   promise
//     .finally(() => {
//       console.log("finally");
//       return Promise.resolve(20);
//     })
//     .then((value) => {
//       console.log(value);
//     });

//   // finally
//   // 18
// }

// {
//   const promise = Promise.reject(18);

//   promise
//     .finally(() => {
//       console.log("finally");
//       //   return Promise.reject('20');
//       throw new Error("20");
//     })
//     .catch((value) => {
//       console.log(value.message);
//     });

//   // finally
//   // 20
// }

// {
//   const promise1 = Promise.resolve(42);

//   const promise2 = promise1.finally(() => {
//     console.log("Finally called.");
//   });

//   promise2.then((value) => {
//     console.log(value); // 42
//   });

//   // 虽然 promise1 跟 promise2 最终都是返回一个 promise 并且值为 42
//   // 但是它们不是一个对象
//   console.log(promise1 === promise2); // false
// }

// {
//   const promise = Promise.reject(18);

//   promise
//     .catch((value) => {
//       return value + 1;
//     })
//     .then((value) => {
//       console.log(value); // 19;
//     });
// }

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
