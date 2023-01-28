{
  function requestURL(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("load", () => {
        resolve({
          status: xhr.status,
          text: xhr.responseText,
        });
      });

      xhr.addEventListener("error", (error) => {
        reject(error);
      });

      xhr.open("get", url);
      xhr.send();
    });
  }

  const promise = requestURL("../data.json");

  promise
    .then((response) => {
      console.log(response.status);
      console.log(response.text);
    })
    .catch((error) => {
      console.error(error.message);
    });
}

{
  // 在 Promise 类方法中，状态只会被 resolve 或者 reject 响应一次，后面的 resolve 或者 reject 方法会被忽略
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
  // 3
}

{
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
}
