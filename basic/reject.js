const promise = Promise.reject(42);

promise.catch((error) => {
  console.log(error);
});
