var express = require('express');
var router = express.Router();
const {
  getBookList,
  getBookDetails,
  addBook,
  updateType,
  updateBook,
  getSortType,
  getBookType,
  getChapter,
  upChapter,
  addChapter,
  sortOrder } = require('../controllerAdmin/book')


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
      new this.SuccessModel(data)
    )
  })
});

router.post('/add', function (req, res, next) {
  let body = req.body
  let result = addBook(body)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
});


router.get('/getBookDetails', function (req, res, next) {
  let id = req.query.id
  let result = getBookDetails(id)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
});

router.post('/updateBook', function (req, res, next) {
  let body = req.body
  let result = updateBook(body)
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
});


router.post('/updateType', function (req, res, next) {
  let body = req.body
  let result = updateType(body)
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
});

router.get('/sort', function (req, res, next) {
  let result = getSortType()
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
})

router.get('/booktype', function (req, res, next) {
  let result = getBookType()
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
})

router.get('/chapter', function (req, res, next) {
  let result = getChapter(req)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
})

router.post('/upchapter', function (req, res, next) {
  let result = upChapter(req)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
})


router.post('/addchapter', function (req, res, next) {
  let result = addChapter(req)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
})

router.post('/sortorder', function (req, res, next) {
  let result = sortOrder(req)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
})


module.exports = router;
