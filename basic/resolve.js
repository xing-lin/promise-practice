const promise = Promise.resolve(2);

promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log("never be called");
  });

// 2

const promise1 = Promise.resolve(22);
const promise2 = Promise.resolve(Promise.resolve(promise1));

console.log(promise1 === promise2); // true
