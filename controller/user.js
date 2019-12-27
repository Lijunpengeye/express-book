const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')
const { genPassword } = require('../utils/cryp')
const { secretKey } = require('../utils/index')
const jwt = require('jsonwebtoken')
const adminLogin = (username, password) => {
  username = username
  // 生成加密密码
  password = genPassword(password)
  console.log(username, password)
  let promiste = {
    username: username,
    password: password
  }
  let logintime = Date.now()
  return exec(sql.table('admin').where(promiste).select()).then(data => {
    if (data.length > 0) {
      let userInfo = data[0]
      let tokenObj = {   //携带参数
        id: userInfo.id,
        username: userInfo.uasername
      }
      let tokenKey = secretKey  //加密内容
      let token = jwt.sign(tokenObj, tokenKey, {
        expiresIn: 3600 * 3  // token时长
      })
      token = 'Bearer ' + token
      let parameter = {
        token: token
      }
      return Promise.resolve(parameter)
      // return true
    } else {
      return false
    }
  }).catch(err => {
    console.log(err)
  })
}

module.exports = {
  adminLogin
}