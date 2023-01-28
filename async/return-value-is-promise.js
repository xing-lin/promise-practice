{
  async function getMeaningOfLife() {
    return 42;
    // return Promise.resolve(Promise.reject(43));
    // return Promise.reject(43);
  }

  // function getMeaningOfLife1() {
  //   return 42;
  // }

  // console.log(getMeaningOfLife() instanceof Promise); // true
  // console.log(getMeaningOfLife1() instanceof Promise); // false

  const result = getMeaningOfLife();

  result
    .then((value) => {
      console.log("value->", value); // 42 'number'
    })
    .catch((reason) => {
      console.log("reason->", reason); // 43
    });
}

{
  async function doNothing() {}

  doNothing().then((value) => {
    console.log("value->", value); // undefined
  });
}
