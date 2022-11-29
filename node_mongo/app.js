const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const fs = require('fs')


//express web server 를 9000번 포트로 생성
const app = express();
app.set('port', process.env.PORT || 9000);
//로그를 화면에 출력
app.use(morgan('dev'));

//form이 아닌 형태의 POST방식의 파라미터를 읽기위한 설정
let bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
//파일 다운로드를 구현하기 위한 모듈
let util = require('util')
let mime = require('mime')

//파일 업로드를 위한 디렉토리를 없으면 생성
try {
    fs.readdirSync('img');
} catch (error) {
    console.error('img 폴더가 없어 img 폴더를 생성합니다.');
    fs.mkdirSync('img');
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            //업로드할 디텍토리 설정    
            done(null, 'img/');
        },
        filename(req, file, done) {
            //업로드 될 때의 파일 이름설정
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
});

//템플릿 엔진 설정(서버의 데이터를 html에 출력하기 위한 모듈) 설정
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//Mongo DB사용을 위한 모듈 가져오기
let MongoClient = require('mongodb').MongoClient
//접속할 데이터 베이스 URL설정
let databaseUrl = 'mongodb://0.0.0.0:27017/';

//node데이터베이스의 item컬렉션에 존재하는 모든 데이터를 리턴
app.get('/item/all', (req, res) => {
    //데이터베이스 연결
    MongoClient.connect(databaseUrl, { useNewUrlParser: true },
        (error, database) => {
            if (error) {
                console.log(error)
                res.json({ "result": false, "message": "이유" });
            } else {
                console.log("디비 연결 성공")
                //데이터베이스 가져오기
                let db = database.db('node');
                console.log(db)
                //아이템 컬렉션의 모든 데이터가져오기
                db.collection('item').find().sort({ itemid: -1 }).toArray((error, items) => {
                    if (error) {
                        console.log(error)
                        res.json({ "result": false, "message": "이유" });

                    } else {
                        console.log(items);
                        res.json({ 'count': items.length, 'list': items, 'result': true });
                    }
                })
            }
        });
})


//node 데이터베이스의 item컬렉션의 데이터를 페이지 단위로 가져오기

//데이터 베잇 에서 페이지 단위로 데이토룰 가져올때는 건너뛸개수와 가져올 데이터개수가 필요
//클라이언트에서 넘겨주는 데이터:페이지 번호 와 데이터 개수

app.get('/item/paging', (req, res) => {
    //클라이언트의 데이터 받아오기
    let pageno = req.query.pageno; //페이지번호
    let count = req.query.count // 한번에 가져올 데이터 개수

    //건너뛸개수 계산
    if (pageno == undefined) {
        pageno = 1;
    }
    if (count == undefined) {
        count = 2;
    }

    //웹에서 클라이언트가 전송하는 데이터는 기본적으로 
    // 무조건 문자열이다
    // 계싼을 할떄는 숫자로 변형을 해서 계산을 해야한다.
    let start = (parseInt(pageno) - 1) * parseInt(count);

    //데이터베이스 연결
    MongoClient.connect(databaseUrl, { useNewUrlParser: true },
        (error, database) => {
            console.log("!23")
            if (error) {
                console.log(error)
                res.json({ "result": false, "message": "이유" });
            } else {
                //데이터베이스 가져오기
                let db = database.db('node');
                //아이템 컬렉션의 모든 데이터가져오기
                db.collection('item').find().sort({ itemid: -1 }).skip(start).limit(count).toArray((error, items) => {
                    if (error) {
                        console.log(error)
                        res.json({ "result": false, "message": "이유" });
                    } else {
                        res.json({ "result": true, "list": items, "count": items.length });
                    }
                })
            }
        });
});

//상세보기
//기본키 하나의 데이터를 필요로하는 경우가 많고
//결과는 하나의 데이터를 리턴하는 경우가 많고
//그 이외에 주위의 2 - 10여개의 같ㅌ이 리턴하는 경우가 많음

app.get('/item/:itemid', (req, res) => {
    //클라이언트의 데이터 받아오기


    //데이터베이스 연결
    MongoClient.connect(databaseUrl, { useNewUrlParser: true },
        (error, database) => {
            if (error) {
                console.log(error)
                res.json({ "result": false, "message": "이유" });
            } else {
                //데이터베이스 가져오기
                let db = database.db('node');
                //아이템 컬렉션의 모든 데이터가져오기
                db.collection('item').findOne({ "itemid": Number(itemid) }, (error, item) => {
                    if (error) {
                        console.log(error);
                        res.json({ "result": false, "message": "이유" });
                    } else {
                        res.json({ "result": true, "item": item })
                    }
                })
            }
        });
})
//데이터 삽입구현
//itemname, description,price,pictureurl
app.post('/item', upload.single('pictureurl'), (req, res) => {
    console.log(req.body.itemname);
    //파라미터 읽어오기
    const itemname = req.body.itemname;
    const description = req.body.description;
    const price = req.body.price;

    let pictureurl;
    //업로드한 파일이 있으면 파일의 이름을 설정하고 없으면 default값 설정
    if (req.file) {
        pictureurl = req.file.filename;
    } else {
        pictureurl = 'default.jpg';
    }

    MongoClient.connect(databaseUrl, { useNewUrlParser: true }, (error, database) => {
        console.log("!23")
        if (error) {
            console.log(error);
            res.json({ "result": false });

        } else {
            let db = database.db('node');
            console.log(db);
            //가장 큰 itemid를 찾아오기
            db.collection("item").find({}, { projection: { _id: 0, itemid: 1 } }).sort({ itemid: -1 })
                .limit(1).toArray((error, result) => {
                    let itemid = 1;
                    if (result[0] != null) {
                        itemid = result[0].itemid + 1;
                    }
                    db.collection('item').insertOne({
                        "itemid": itemid,
                        "itemname": itemname,
                        "description": description,
                        "price": price,
                        "pictureurl": pictureurl
                    }, (error, result) => {
                        if (error) { res.json({ "result": false }) }
                        else { res.json({ "result": true }) }
                    })
                })
        }
    })


})
//에러처리를 위한 부분
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), ' 번 포트에서 대기중')
})