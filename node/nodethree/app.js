// 웹서버 모듈가져오기
const express = require('express');

// 웹서버 객체 생성과 포트설정
const app = express();
app.set('port', 3000);

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const boardRouter = require('./routes/board')


//pug설정
const path = require('path');
// res.render로 출력할때 사용할 디렉토리를 설정
app.set('views', path.join(__dirname, 'views'));
// 템플릿 엔진은 pug를 사용하겠다고 설정
app.set('view engine', 'pug');
app.use("/",(req,res) =>{
    // 템플릿 엔진으로 출력
    //views/index.html로 출력
    res.render('index',{'title' : 'pug', 'aespa' : ['카리나', '지젤', '윈터']})
})

// url과 매핑
// app.use('/',indexRouter); // /요청은 indexrouter에서 처리
app.use('/user', userRouter); // /user가 앞에 있는것은 userrouter에서 처리
app.use('/board', boardRouter); // 괄호 안 /board에서 /는 ->board.js 파일에 있는 5번째줄 /와 같은 역할을 함.

/* app.요청처리메소드(url, (req,res) =>{
    //res.send, res.sendFile : 정적인 테스트나 HTML출력
    //res.json(데이터) : 서버에서 클라이언트에게 데이터를 전송 
}) */

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
})
