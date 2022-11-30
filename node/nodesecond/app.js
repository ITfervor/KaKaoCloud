//웹 서버를 위한 모듈
const express =require('express');

//현재 디렉토리에 대한 절대 경로를 알아내기 위한 내장 모듈
const path = require('path');
//서버를 준비
const app = express();
app.set('port',3000);

// 일단위 로그 기록을 위한 설정
const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');

//내장모듈
const fs = require('fs')

//로그파일을 저장할 디렉터리 생성
const logDirectory = path.join(__dirname, 'log');
// 디렉토리 존재여부를 확인하고 디렉토리가 없으면 생성
try {
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

} catch (error) {
    console.log(error.message)
}
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//일단위 로그 기록 설정
const accessLogStream = FileStreamRotator.getStream({
    date_format : 'YYYYMMDD',
    filename:path.join(logDirectory, 'access-%DATE%.log'),
    frequency : 'daily',
    verbose : true
}) ;

app.use(morgan('combined', {stream: accessLogStream}));

//사용자의 요청처리
// /는 포트번호까지
app.get('/',(req,res)=>{
//http://localhost:3000/index?nam e=adam
    console.log(req.ip);
    console.log(req.query);
    //현재 디렉토리에 있는 main.html을 출력
    res.sendFile(path.join(__dirname, './main.html'))

})

//서버를 구동
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중')
});
