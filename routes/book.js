var express = require('express');
var router = express.Router();
var formidable = require('formidable')
var path = require('path');
var fs = require('fs')
const Routers = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getBookList, getBookDetails, addBook, updateType, updateBook } = require('../controller/book')


/* GET home page. */
router.get('/list', function (req, res, next) {
  let result = getBookList(req.query)
  result.then(data => {
    data.list.forEach(item => {
      if (item.type === 0) {
        item.type = false
      } else {
        item.type = true
      }
    })
    res.json(
      new SuccessModel(data)
    )
  })
});

router.post('/add', function (req, res, next) {
  let body = req.body
  let result = addBook(body)
  result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
});


router.get('/getBookDetails', function (req, res, next) {
  let id = req.query.id
  let result = getBookDetails(id)
  result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
});

router.post('/updateBook', function (req, res, next) {
  let body = req.body
  let result = updateBook(body)
  result.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    } else {
      res.json(
        new ErrorModel(data, '操作失败')
      )
    }
  })
});


router.post('/updateType', function (req, res, next) {
  let body = req.body
  let result = updateType(body)
  result.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    } else {
      res.json(
        new ErrorModel(data, '操作失败')
      )
    }
  })
});



router.post("/upload", function (req, res, next) {
  let datas = {};
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  let PUBLIC_PATH = '../public';
  console.log("PUBLIC_PATH:" + PUBLIC_PATH);
  let filedr = "/upload";
  form.uploadDir = path.join(__dirname, PUBLIC_PATH + filedr);
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;
  form.parse(req, function (err, fields, files) {
    console.log(files.file);
    var filename = files.file.name
    var nameArray = filename.split('.');
    var type = nameArray[nameArray.length - 1];
    var name = '';
    for (var i = 0; i < nameArray.length - 1; i++) {
      name = name + nameArray[i];
    }
    var date = new Date();
    // var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
    //var avatarName = '/' + name + '_' + date.getTime() + '.' + type;
    var avatarName = '/' + date.getTime() + '.' + type;
    var newPath = form.uploadDir + avatarName;
    fs.renameSync(files.file.path, newPath); //重命名
    // res.send({data:"/upload/"+avatarName})
    let data = {};
    data.name = avatarName;
    data.url = `http://localhost:3000/public` + filedr + avatarName;
    datas.data = data
    // res.send(datas);

    res.json(
      new SuccessModel(data, '上传图片成功')
    )
    return;
  })
})
module.exports = router;
