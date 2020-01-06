var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getUserInfo } = require('../controllerWab/user')
const { getIndexBookList } = require('../controllerWab/index')
var jwt = require('jsonwebtoken')
router.get('/userinfo', function (req, res, next) {
  // let result = getUserInfo(req.query)
  // result.then(data => {
  //   data.forEach(item => {
  //     item.banner_img = `http://localhost:3000/upload${item.banner_img}`
  //   })
  //   res.json(
  //     new SuccessModel(data)
  //   )
  // })
});
