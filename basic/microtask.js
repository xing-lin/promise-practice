setTimeout(() => {
  console.log("timer");

  Promise.resolve(null).then(() => {
    console.log("microtask in timer");
  });
}, 0);

console.log("normal1");

Promise.resolve(null).then(() => {
  console.log("microtask1");
});

new Promise(() => {
  console.log("new Promise");
});

Promise.all([]).then(() => {
  console.log("microtask2");
});

console.log("normal2");

// normal1
// new Promise
// normal2
// microtask1
// microtask2
// timer
// microtask in timer
