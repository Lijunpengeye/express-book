var express = require('express');
var router = express.Router();
const {
  getBanner,
  addBanner,
  updateBanner,
  updateIsDisplay,
  getBannerDetails
} = require('../controllerAdmin/banner')

router.get('/list', function (req, res, next) {
  let result = getBanner(req.query)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
});

router.get('/getBannerDetails', function (req, res, next) {
  let id = req.query.id
  let result = getBannerDetails(id)
  result.then(data => {
    res.json(
      new this.SuccessModel(data)
    )
  })
});

router.post('/add', function (req, res, next) {
  let body = req.body
  let result = addBanner(body)
  result.then(data => {
    if (data.id) {
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

router.post('/update', function (req, res, next) {
  let body = req.body
  let result = updateBanner(body)
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


router.post('/updateIsDisplay', function (req, res, next) {
  let body = req.body
  let result = updateIsDisplay(body)
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

// router.get('/getBookDetails', function (req, res, next) {
//   let id = req.query.id
//   let result = getBookDetails(id)
//   result.then(data => {
//     res.json(
//       new this.SuccessModel(data)
//     )
//   })
// });

// router.post('/updateBook', function (req, res, next) {
//   let body = req.body
//   let result = updateBook(body)
//   result.then(data => {
//     if (data) {
//       res.json(
//         new this.SuccessModel(data)
//       )
//     } else {
//       res.json(
//         new this.ErrorModel(data, '操作失败')
//       )
//     }
//   })
// });


// router.post('/updateType', function (req, res, next) {
//   let body = req.body
//   let result = updateType(body)
//   result.then(data => {
//     if (data) {
//       res.json(
//         new this.SuccessModel(data)
//       )
//     } else {
//       res.json(
//         new this.ErrorModel(data, '操作失败')
//       )
//     }
//   })
// });

// router.get('/sort', function (req, res, next) {
//   let result = getSortType()
//   result.then(data => {
//     res.json(
//       new this.SuccessModel(data)
//     )
//   })
// })

module.exports = router;
