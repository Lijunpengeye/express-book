var express = require('express');
var router = express.Router();
const { getBanner } = require('../controllerWab/banner')
const { getIndexBookList } = require('../controllerWab/index')

// 获取首页banner
router.get('/banner', function (req, res, next) {
  let result = getBanner(req.query)
  result.then(data => {
    data.forEach(item => {
      item.banner_img = `http://localhost:3000/upload${item.banner_img}`
    })
    res.json(
      new this.SuccessModel(data)
    )
  })
});

// 获取首页列表
router.get('/booklist', function (req, res, next) {
  let result = getIndexBookList(req.query)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
})

module.exports = router