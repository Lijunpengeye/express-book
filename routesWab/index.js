var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getBanner } = require('../controllerWab/banner')

router.get('/banner', function (req, res, next) {
  let result = getBanner(req.query)
  result.then(data => {
    data.forEach(item => {
      item.banner_img = `http://localhost:3000/upload${item.banner_img}`
    })
    res.json(
      new SuccessModel(data)
    )
  })
});

module.exports = router