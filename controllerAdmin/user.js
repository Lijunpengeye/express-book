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

async function uaersInfo(query) {
  let parameter = {}
  if (query.username) parameter.username = query.username
  let pageSize = query.pageSize ? query.pageSize : 20
  let pageNum = query.pageNum ? query.pageNum : 1
  let field = `id,username,qq,nickname,head_portrait,logintime,is_vip`
  let pagePromiste = await exec(sql.table('users').field(field).where(parameter).page(pageNum, pageSize).select())
  let data = {}
  data.list = pagePromiste
  let totalPromiste = await exec(sql.table('users').where(parameter).select())
  data.total = totalPromiste.length
  return Promise.resolve(data)
}

module.exports = {
  adminLogin,
  uaersInfo
}