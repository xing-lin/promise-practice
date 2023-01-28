// // without await

// function retrieveJsonData(url) {
//   return fetch(url)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error(
//           `Unexpected status code: ${response.status} ${response.statusText}`
//         );
//       }
//     })
//     .catch((reason) => {
//       console.error("reason->", reason.message);
//     });
// }

// // with await

// async function retrieveJsonData(url) {
//   try {
//     const response = await fetch(url);
//     if (response.ok) {
//       return await response.json();
//     } else {
//       throw new Error(
//         `Unexpected status code: ${response.status} ${response.statusText}`
//       );
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// // 注意 response.json() 要用 await 去 return 出去。
// // response.json() 在成功的时候，用不用 await 都一样，但是假如 response.json() 返回的是失败，用 await 可以让错误在 try-catch 捕获，否则还要添加 catch 来处理

// retrieveJsonData("https://api.example.com/users")
//   .then((data) => {
//     // doSometing
//   })
//   .catch((reason) => {
//     // 如果不加 await，这边还要处理 response.json() 可能为失败的情况
//   });

async function doSomething() {
  try {
    return await Promise.all([
      Promise.resolve(1),
      Promise.reject("2"),
      Promise.resolve(3),
    ]);
  } catch (error) {
    console.error("error->", error, error.message);
  }
}

doSomething().then((value) => {
  console.log("value->", value);
});
