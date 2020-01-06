var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getBookDetail } = require('../controllerWab/book')

router.get('/detail', function (req, res, next) {
  let result = getBookDetail(req.query)
  result.then(data => {

    res.json(
      new SuccessModel(data)
    )
  })
});



module.exports = router