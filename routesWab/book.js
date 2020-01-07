var express = require('express');
var router = express.Router();
const { getBookDetail, getCollection, querySearch } = require('../controllerWab/book')

// 获取书本详情
router.get('/detail', function (req, res, next) {
  let result = getBookDetail(req.query)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
});
// 获取个人收藏
router.get('/collection', function (req, res, next) {
  let result = getCollection(req)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
});
// 获取搜索
router.get('/search', function (req, res, next) {
  let result = querySearch(req)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
});


module.exports = router