//{}로 묶어서 내보낸 것은 이름을 맞추어서 받아야한다.
const {odd, even} = require('./var');
//하나를 내보냈을 때는 이름을 바꿔서 받을 수없다
//func의 내용을 가져와서 checkNumber라는 이름을 붙이는 것입니다.
const checkNumber = require('./func');
const path = require("path");


console.log(checkNumber(10));
console.log(__dirname);
console.log(path.join(__dirname, "public"));

/* const url = require('url');
const addr = "http://www.naver.com.login?id=ggangpae1";
//url 분해
const p = url.parse(addr);
//pathname 에는 서버 URL을 제외한 경로를 저장하고 있고 
//query는 query string을 저장하고 있음

console.log(p);

//->URL에서 특정 파라미터 값 가져오기
//addr에서 파라미터 부분만 가져오기
//searchParams 속성을 호출하면 파라미터 부분에 해당하는 객체를 리턴
const address = new URL("http://www.naver.com.login?id=ggangpae1")
console.log(address.searchParams);
//id 의 값만 추출
console.log(address.searchParams.get("id")); */
