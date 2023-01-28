const thing = [
  new Promise((resolve) => {
    setTimeout(resolve, 3000, "one");
  }),
  new Promise((resolve, reject) => {
    setTimeout(
      () => {
        reject("222");
      },
      2000,
      "two"
    );
  }),
  new Promise((resolve) => {
    setTimeout(resolve, 1000, "three");
  }),
];

(async function () {
  try {
    for await (let res of thing) {
      console.log(res);
    }
  } catch (error) {
    console.log("error->", error.message);
  }
})();

// Promise.all(thing).then((res) => {
//   console.log(res);
// });
