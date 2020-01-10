var express = require('express');
var router = express.Router();
const { wabLogin, getUserInfo, buyBook, changeLike } = require('../controllerWab/user')

// 用户登陆
router.post('/login', function (req, res, next) {
  let username = req.body.username
  let password = req.body.password
  const result = wabLogin(username, password)
  result.then(data => {
    if (data) {
      res.json(
        new this.SuccessModel(data)
      )
    } else {
      res.json(
        new this.ErrorModel(data, '操作失败')
      )
    }
  })
})

// 获取用户信息
router.get('/userinfo', function (req, res, next) {
  const result = getUserInfo(req)
  result.then(data => {
    if (data) {
      res.json(
        new this.SuccessModel(data[0])
      )
    } else {
      res.json(
        new this.ErrorModel(data, '操作失败')
      )
    }
  })
})
// 购买
router.post('/buy', function (req, res, next) {
  let result = buyBook(req)
  result.then(data => {
    console.log(data, '-------data')
    res.json(
      new this.SuccessModel(data, data.message)
    )
  }).catch(err => {
    console.log(err, '-------err')
    res.json(
      new this.ErrorModel(err, err.message)
    )
  })
});

// 点赞评论
router.post('/commentlike', function (req, res, next) {
  let result = changeLike(req)
  result.then(data => {
    console.log(data, '-------data')
    res.json(
      new this.SuccessModel(data, data.message)
    )
  }).catch(err => {
    console.log(err, '-------err')
    res.json(
      new this.ErrorModel(err, err.message)
    )
  })
});
module.exports = router