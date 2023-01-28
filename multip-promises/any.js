// {
//   const promise1 = Promise.reject(43);

//   const promise2 = Promise.resolve(42);

//   const promise3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(44);
//     }, 100);
//   });

//   const promise4 = Promise.any([promise1, promise2, promise3]);

//   promise4
//     .then((value) => {
//       console.log("value->", value); // 42
//     })
//     .catch((reason) => {
//       // 不会走到这边
//       console.log("reason->", reason);
//     });
// }

// {
//   const promise1 = Promise.reject(43);

//   const promise2 = Promise.reject(42);

//   const promise3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(44);
//     }, 100);
//   });

//   const promise4 = Promise.any([promise1, promise2, promise3]);

//   promise4
//     .then((value) => {
//       // 不会走到这边
//       console.log("value->", value);
//     })
//     .catch((reason) => {
//       console.log("reason->", reason);
//       console.log(reason.message); // All promises were rejected
//       console.log(reason.errors); // [ 43, 42, 44 ]
//     });

//   //   reason-> [AggregateError: All promises were rejected] {
//   //     [errors]: [ 43, 42, 44 ]
//   //   }
// }

const promise1 = new Promise((resolve) => {
  resolve(42);
});
const promise2 = new Promise((resolve) => {
  resolve(43);
});
const promise3 = Promise.resolve(44);

const promise4 = Promise.any([promise1, promise2, promise3]).then((res) => {
  console.log(res); // 42
});
