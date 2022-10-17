const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
app.use(express.json());
var cors = require('cors');
app.use(cors());

var db;
const data = require('./utils/data');

MongoClient.connect(
  'mongodb+srv://admin:admin1234@cluster0.peo3g.mongodb.net/yourPaper?retryWrites=true&w=majority',
  (err, client) => {
    if (err) return console.log(err);
    db = client.db('yourPaper');

    //디비가 붙었을 경우
    app.listen(3000, function () {
      console.log('디비가 잘 붙었습니다');
    });
  }
);

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//paper 조회
app.get('/view/:id', (req, res) => {
  db.collection('post')
    .find({ memberId: req.params.id })
    .sort({ _id: -1 })
    .toArray((err, results) => {
      res.send(results);
    });
});

// paper 작성
app.post('/api/write/:id', (req, res) => {
  db.collection('post').insertMany([req.body], (err, res) => {
    if (err) return res.json({ success: false });
  });

  return res.json({
    success: true,
    body: req.body,
  });
});

// 금칙어 검사
app.post('/api/badwords', (req, res) => {
  let isBad = false;
  data.badwords.map(word => {
    if(req.body.content.includes(word)){
      isBad = true;
    }
  });
  if(!isBad) return res.json({ bad: isBad });
  else return res.json({
    bad: isBad,
  });
});

//paper 읽음 상태 업데이트
app.put('/update/:id', (req, res) => {
  var oId = new ObjectId(req.params.id);
  db.collection('post').updateOne(
    { _id: oId },
    { $set: { readYn: true } },
    (err, results) => {
    }
  );
});

//paper 삭제
app.delete('/delete/:id', (req, res) => {
  var oId = new ObjectId(req.params.id);
  console.log(oId);
  db.collection('post').deleteOne(
    { _id: oId },
    (err, results) => {
      if (err) return console.log(err);
    }
  );
});

//뷰가 라우팅할 수 있게 전권을 넘김
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
