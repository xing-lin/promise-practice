// 动态导入
const value = await import("./data.js");

console.log("value->", value);

// {
//   a: 123,
//   default: {
//     age: 18,
//     name: "张三",
//   },
// };
