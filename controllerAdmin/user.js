const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')
const { genPassword } = require('../utils/cryp')
const { secretKey } = require('../utils/index')
const jwt = require('jsonwebtoken')


async function adminLogin(username, password) {
  username = username
  // 生成加密密码
  password = genPassword(password)
  console.log(username, password)
  let logintime = new Date()
  let promiste = {
    username: username,
    password: password,
  }

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
      exec(sql.table('amdin').data({ logintime: logintime }).where({ id: userInfo.id }).update())
      return Promise.resolve(parameter)
      // return true
    } else {
      return false
    }
  }).catch(err => {
    console.log(err)
  })
}

async function uaersInfo(req) {
  let id = req.user.id
  return exec(sql.table('admin').where({ id: id }).field('username,avatar').select()).then(data => {
    return data[0]
  })
}

module.exports = {
  adminLogin,
  uaersInfo
}