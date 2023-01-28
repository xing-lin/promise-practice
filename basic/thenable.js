// {
//   const thenable = {
//     then(resolve, reject) {
//       resolve(42);
//     },
//   };

//   const promise = Promise.resolve(thenable);

//   promise.then((value) => {
//     console.log(value); //42
//   });
// }

const thenable = {
  then(resolve, reject) {
    reject(22);
  },
};

const promise = Promise.reject(thenable).then(
  (response) => {},
  (reason) => {
    reason.then(null, (reason) => {
      console.log("err->", reason);
    });
  }
);
