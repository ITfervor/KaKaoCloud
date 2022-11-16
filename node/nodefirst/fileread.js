//파일을 읽고 쓸수있는 모듈 가져오기
const fs = require("fs");

let data = fs.readFileSync("./test.txt")
// console.log(data.toString());

let ar = data.toString().split("\n");
console.log(ar[0]);
console.log(ar[1]);