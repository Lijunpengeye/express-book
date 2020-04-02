var express = require('express')
var router = express.Router()
var formidable = require('formidable')
var path = require('path')
var fs = require('fs')

router.post('/upload', function(req, res, next) {
  let datas = {}
  var form = new formidable.IncomingForm()
  form.encoding = 'utf-8'
  let PUBLIC_PATH = '../public'
  let filedr = '/upload'
  form.uploadDir = path.join(__dirname, PUBLIC_PATH + filedr)
  form.keepExtensions = true //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024
  form.parse(req, function(err, fields, files) {
    var filename = files.file.name
    var nameArray = filename.split('.')
    var type = nameArray[nameArray.length - 1]
    var name = ''
    for (var i = 0; i < nameArray.length - 1; i++) {
      name = name + nameArray[i]
    }
    var date = new Date()
    // var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
    //var avatarName = '/' + name + '_' + date.getTime() + '.' + type;
    var avatarName = '/' + date.getTime() + '.' + type
    var newPath = form.uploadDir + avatarName
    fs.renameSync(files.file.path, newPath) //重命名
    let data = {}
    data.name = avatarName
    data.url = `http://localhost:3000` + filedr + avatarName
    datas.data = data
    res.json(new this.SuccessModel(data, '上传图片成功'))
    return
  })
})
module.exports = router
