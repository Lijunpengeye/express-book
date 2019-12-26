var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { adminLogin } = require('../controller/user')

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/admin/login', function (req, res, next) {
  let username = req.body.username
  let password = req.body.password
  const result = adminLogin(username, password)
  result.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    } else {
      res.json(
        new ErrorModel(data, '操作失败')
      )
    }
  })
  // res.send('respond with a resource');
});


module.exports = router;
