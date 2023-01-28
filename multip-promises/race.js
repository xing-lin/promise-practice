// {
//   const promise1 = Promise.resolve(42);

//   const promise2 = new Promise((resolve, reject) => {
//     resolve(43);
//   });

//   const promise3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(44);
//     }, 100);
//   });

//   const promise4 = Promise.race([promise1, promise2, promise3]);

//   promise4.then((value) => {
//     console.log(value); // 42
//   });
// }

// {
//   const promise1 = Promise.reject(42);

//   const promise2 = new Promise((resolve, reject) => {
//     resolve(43);
//   });

//   const promise3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(44);
//     }, 100);
//   });

//   const promise4 = Promise.race([promise1, promise2, promise3]);

//   promise4
//     .then((value) => {
//       // 不会走到这方法
//       console.log(value);
//     })
//     .catch((reason) => {
//       console.log("reason->", reason);
//     });
// }

// fetch 中建立超时操作（注意，返回超时并不会取消 fetch 请求，如果要取消请求用 AbortController）

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
