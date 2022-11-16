//암호화 모듈 가져오기
const crypto = require("crypto");

let password = "123456"
//단방향 암호화 수행
let p1 = crypto.createHash("sha256").update(password).digest('base64');
console.log(p1)

let str = "123456";
let p2 = crypto.createHash("sha256").update(str).digest('base64');
console.log(p1 === p2);


str = "1234567";
p2 = crypto.createHash("sha256").update(str).digest('base64');
console.log(p1 === p2)

const algorithm = "aes-256-cbc"
//Node의 crypto 모듈에서는 key는 32자리 iv는 16자리
const key = "12345678901234567890123456789012"
const iv = "1234567890123456"

//암호화 객체 생성
let cipher = crypto.createCipheriv(algorithm, key, iv);
let result = cipher.update ('01052812796', 'utf8', 'base64');
result += cipher.final('base64');
console.log(result);

let decipher = crypto.createDecipheriv(algorithm, iv, key);
let result2 = decipher.update (result, 'base64', 'utf8');
result2 += decipher.final('utf8');
console.log(result2)