var express = require('express');
var router = express.Router();
const { getBookDetail, getCollection, querySearch, addBookshelf, addcomment, deleteCollection, bookRanking } = require('../controllerWab/book')
const { getIPAddress } = require('../utils/common')

// 获取书本详情
router.get('/detail', function (req, res, next) {
  let result = getBookDetail(req)
  let Ip = getIPAddress()
  result.then(data => {
    data.detail.images = `http://${Ip}:3000/upload${data.detail.images}`
    if (data.content.length) {
      data.content.map(item => {
        item.head_portrait = `http://${Ip}:3000/upload${item.head_portrait}`
      })
    }
    res.json(
      new this.SuccessModel(data)
    )
  })
});
// 获取个人收藏
router.get('/collection', function (req, res, next) {
  let result = getCollection(req)
  let Ip = getIPAddress()
  result.then(data => {
    if (data.length) {
      data.map(item => {
        return item.images = `http://${Ip}:3000/upload${item.images}`
      })
    }
    res.json(
      new this.SuccessModel(data)
    )
  }).catch(err => {
    res.json(
      new this.ErrorModel(err, err.message)
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

// 加入书架
router.post('/addbookshelf', function (req, res, next) {
  let result = addBookshelf(req)
  result.then(data => {
    if (data.code === 0) {
      res.json(
        new this.SuccessModel(data)
      )
    } else {
      res.json(
        new this.ErrorModel({}, data.message)
      )
    }
  }).catch(err => {
    res.json(
      new this.ErrorModel(err, err.message)
    )
  })
});

// 添加评论
router.post('/addcomment', function (req, res, next) {
  let result = addcomment(req)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  }).catch(err => {
    res.json(
      new this.ErrorModel(err, err.message)
    )
  })
});

// 收藏中移除某书本
router.post('/deletecollection', function (req, res, next) {
  let result = deleteCollection(req)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  }).catch(err => {
    res.json(
      new this.ErrorModel(err, err.message)
    )
  })
});

// 排行
router.get('/ranking', function (req, res, next) {
  let result = bookRanking(req.query)
  let Ip = getIPAddress()
  result.then(data => {
    if (data.list.length) {
      data.list.map(item => {
        return item.images = `http://${Ip}:3000/upload${item.images}`
      })
    }
    res.json(
      new this.SuccessModel(data)
    )
  }).catch(err => {
    res.json(
      new this.ErrorModel(err, err.message)
    )
  })
});



module.exports = router