/* // 모듈 가져오기
const mysql = require('mysql')

//접속정보 생성
let connection = mysql.createConnection({
host:'127.0.0.1',
port:3306,
user:'root',
password:'wnddkd',
database:'adam'
});

connection.connect((error) =>{
    if(error){
        console.log(error);
    }else{
       connection.query(
            'create table family(id int auto_increment primary key, name varchar(20))');
     //데이터 삽입 구문
        connection.query(
            'insert into family(name) values(?)', '을지문덕');
        connection.query(
            'insert into family(name) values(?)', '강감찬');
        connection.query(
            'insert into family(name) values(?)', '조헌'); 

            //SELECT구문
            connection.query("select * from family", (err, results,fields) => {
                if(err){
                    console.log(err);
                    console.log("{result:false}");
                }else{
                    let result = JSON.stringify(results);
                    console.log(result);

                }

               
            });
                
        }
        
}
)

 */

const express = require('express');
const morgan = require('morgan');
const compression = require('compression')
const path = require('path');
const mysql = require('mysql');

const cookieParser = require('cookie-parser');
const session = require("express-session");

const multer = require('multer');
const dotenv = require('dotenv');

//설정파일의 내용 가져오기
dotenv.config();

//서버설정
const app = express();
app.set('port', process.env.PORT || 9000);

//로그를 매일 기록하기위한 설정
let FileStreamRotator = require('file-stream-rotator');
let fs = require('fs');

//로그를 기록할 디렉토리 셩로 생성
let logDirectory = path.join(__dirname, 'log');

//로그 디렉트리가 없으면 생성
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

//로그 파일 옵션을 설정
let accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  });
  

//로그 기록설정
app.use(morgan('combined', {stream: accessLogStream}))

//압축해서 전송하는 옵션 설정
app.use(compression());

//POST방식의 파라미터 읽을수 있도록 설정
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));


//세션을 데이터베이스에 저장하는 작업

//데이터베이스 접속정보
let options = {
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'wnddkd',
    database:'mysql'
};
//세션을 저장하기 위한 mysql데이터 베이스 저장소 생성
const MariaDBStore = require('express-mysql-session')(session);
//세션 설정
app.use(session({
    secret:'NODE',
    resave: false,
    savsUninitialized:true,
    store:new MariaDBStore(options)
}));

//파일 업로드 설정
const upload = multer({
    storage:multer.diskStorage({
        destination(req, file, done){
            done(null, 'public/img');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext );
        }
    }),
    limits : {fileSize : 10*1024*1024}
});


//정적파일의 경로 설정
app.use('/', express.static('public'));

//파일 다운로드를 위한 모듈
let util = require('util');
let mime = require('mime');

//데이터베이스 연결
let connection = mysql.createConnection(options);

connection.connect((err) => {
	if (err) {
		console.log('mariadb connection error');
		console.log(err);
		throw err;
	}else{
        console.log("db연결완룐")
    }
});

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'index.html'))
});
app.get('/item/all', (req, res)=>{
    //HTML출력 res.sendFile(파일경로) - 서버의 데이터 출력 못함.
    //템플릿엔진 : res.render(파일경로, 데이터)
    //JSON출력 : res.json(데이터)
})


//에러발생시 처리하는 부분
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).send(err.message);
});

//서버구동
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트 대기중');
}) 
