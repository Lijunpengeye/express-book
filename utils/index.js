const expressJwt = require('express-jwt');
const secretKey = 'my_book_city_9988_#~_li'
//unless 为排除那些接口
const jwtAuth = expressJwt({ secret: secretKey }).unless({ path: ['/users/admin/login'] })
module.exports = {
  secretKey,
  jwtAuth
} 