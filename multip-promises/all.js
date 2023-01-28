// const promise1 = Promise.resolve(42);

// const promise2 = new Promise((resolve, reject) => {
//   resolve(43);
// });

// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(44);
//   }, 100);
// });

// const promise4 = Promise.all([promise1, promise2, promise3]);

// promise4
//   .then((value) => {
//     console.log(Array.isArray(value)); // true
//     console.log(value[0]); // 42
//     console.log(value[1]); // 43
//     console.log(value[2]); // 44
//   })
//   .catch((err) => {
//     console.log("err->", err);
//   });

// {
//   const promise1 = Promise.reject(42);

//   const promise2 = new Promise((resolve, reject) => {
//     reject(43);
//   });

//   const promise3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(44);
//     }, 100);
//   });

//   const promise4 = Promise.all([promise1, promise2, promise3]);

//   promise4
//     .then((value) => {
//       console.log("one of value is rejected, here is never called");
//       console.log(Array.isArray(value));
//       console.log(value[0]);
//       console.log(value[1]);
//       console.log(value[2]);
//     })
//     .catch((err) => {
//       console.log("err->", err);
//     });
// }

// fetch multip api
// {
//   const API_BASE = "https://jsonplaceholder.typicode.com";

//   function createError(response) {
//     return new Error(
//       `Unexpected status code: ${response.status} ${response.statusText} for ${response.url}`
//     );
//   }

//   function fetchUserData(userId) {
//     const urls = [
//       `${API_BASE}/users/${userId}/posts`,
//       `${API_BASE}/users/${userId}/albums`,
//     ];

//     return Promise.all(urls.map((url) => fetch(url)));
//   }

//   fetchUserData(1)
//     .then((response) => {
//       return Promise.all(
//         response.map((response) => {
//           if (response.ok) {
//             return response.json();
//           } else {
//             return Promise.reject(createError(response));
//           }
//         })
//       );
//     })
//     .then(([posts, albums]) => {
//       console.log("posts->", posts);
//       console.log("albums->", albums);
//     });
// }

// creat artifical delays

{
  const API_BASE = "https://jsonplaceholder.typicode.com";
  const appElement = document.createElement("div");
  appElement.style.width = "100px";
  appElement.style.height = "100px";
  appElement.style.background = "red";
  document.body.appendChild(appElement);

  function createError(response) {
    return new Error(
      `Unexpected status code: ${response.status} ${response.statusText} for ${response.url}`
    );
  }

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

    return Promise.all([...urls.map((url) => fetch(url)), delay(1500)]).then(
      (results) => {
        return results.slice(0, results.length - 1);
      }
    );
  }

  fetchUserData(1)
    .then((response) => {
      return Promise.all(
        response.map((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject(createError(response));
          }
        })
      );
    })
    .then(([posts, albums]) => {
      console.log("posts->", posts);
      console.log("albums->", albums);
    })
    .finally(() => {
      // appElement.remove();
      appElement.style.background = "red";
    });
}
