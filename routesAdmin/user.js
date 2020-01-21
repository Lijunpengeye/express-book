var express = require('express');
var router = express.Router();
const { adminLogin, uaersInfo, usersList } = require('../controllerAdmin/user')

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
        new this.SuccessModel(data)
      )
    } else {
      res.json(
        new this.ErrorModel(data, '操作失败')
      )
    }
  })
});


router.get('/usersinfo', function (req, res, next) {
  // console.log(req.user.id, '--------------id')
  const result = uaersInfo(req)
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

router.get('/userslist', function (req, res, next) {
  const result = usersList(req)
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


module.exports = router;
