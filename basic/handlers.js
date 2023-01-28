const promise = fetch("../data.json");

promise.finally(() => {
  // no way to know if fulfilled or rejected
  console.log("settled ->", promise);
});

promise.then(
  (response) => {
    console.log("response->", response.status);
  },
  (reason) => {
    console.log("reason->", reason.message);
  }
);

promise.then((response) => {
  console.log("response->", response.status);
});

promise.then(null, (reason) => {
  // rejection
  console.log("reason->", reason.message);
});

promise.catch((reason) => {
  // rejection
  console.error("reason->", reason.message);
});
