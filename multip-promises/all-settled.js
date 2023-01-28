const promise1 = Promise.resolve('42');

const promise2 = Promise.reject(43);

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(44);
  }, 100);
});

const promise4 = Promise.allSettled([promise1, promise2, promise3]);

promise4.then((results) => {
  console.log("results->", results);
});

// results-> [
//     { status: 'fulfilled', value: '42' },
//     { status: 'rejected', reason: 43 },
//     { status: 'fulfilled', value: 44 }
//   ]
