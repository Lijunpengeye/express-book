const expressJwt = require('express-jwt');
const secretKey = 'my_book_city_9988_#~_li'
//unless 为排除那些接口
const jwtAuth = expressJwt({ secret: secretKey }).unless({
  path: [
    '/users/admin/login',
    '/upload/*',
    '/wab/index/booklist',
    '/wab/user/login',
    '/wab/book/search',
    '/wab/book/ranking',
    '/wab/index/banner',
    '/wab/index/booklist',
    '/wab/user/register',
    '/wab/book/sort',
    '/wab/book/booklist',
  ]
})
module.exports = {
  secretKey,
  jwtAuth
} 