const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')
const { genPassword } = require('../utils/cryp')
const { secretKey } = require('../utils/index')
const jwt = require('jsonwebtoken')


async function wabLogin(username, password) {
  username = username
  // 生成加密密码
  password = genPassword(password)
  console.log(username, password)
  let logintime = new Date()
  let promiste = {
    username: username,
    password: password,
  }
  return exec(sql.table('users').where(promiste).select()).then(data => {
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
      exec(sql.table('users').data({ logintime: logintime }).where({ id: userInfo.id }).update())
      return Promise.resolve(parameter)
      // return true
    } else {
      return false
    }
  }).catch(err => {
    console.log(err)
  })
}

async function getUserInfo(req) {
  let id = req.user.id
  return exec(sql.table('users').where({ id: id }).field('username,nickname,account,is_vip').select())
}


async function buyBook(req) {
  return new Promise(async (resolve, reject) => {
    const id = req.user.id
    const book_id = req.body.book_id
    let userInfo = await exec(sql.table('users').where({ id: id }).field('account,is_vip').select())
    const account = userInfo[0].account
    const vip = userInfo[0].is_vip
    let bookInfo = await exec(sql.table('book').where({ id: book_id }).field('price,vip_price').select())
    let buy_book_ids = await exec(sql.table('user_info').where({ user_id: id }).field('buy_book_ids').select())
    buy_book_ids = buy_book_ids[0].buy_book_ids
    const price = bookInfo[0].price
    const vip_price = bookInfo[0].vip_price
    let buy_price = 0
    if (vip === 'Y') {
      if (account < vip_price) {
        reject({ message: '余额不足~' })
        return
      } else {
        buy_price = vip_price
      }
    } else {
      if (account < price) {
        reject({ message: '余额不足~' })
        return
      } else {
        buy_price = price
      }
    }
    if (buy_book_ids) {
      buy_book_ids += `,${book_id}`
    } else {
      buy_book_ids = book_id
    }
    let parameter = {
      user_id: id,
      buy_book_id: parseInt(book_id),
      order_money: buy_price,
      order_number: randomNumber()
    }
    console.log(parameter.order_number)
    const balance = account - buy_price
    exec(sql.table('users').data({ account: balance }).where({ id: id }).update()).then(async (data) => {
      let upinfo = await exec(sql.table('user_info').data({ buy_book_ids: buy_book_ids }).where({ user_id: id }).update())
      let order = await exec(sql.table('buy_order').data(parameter).insert())
      if (upinfo && order) {
        resolve({ message: '购买成功' })
      }
    })
  })
}
function randomNumber() {
  let outTradeNo = ''
  for (var i = 0; i < 6; i++) {
    outTradeNo += Math.floor(Math.random() * 10);
  }
  outTradeNo = new Date().getTime() + outTradeNo;
  return outTradeNo
}
module.exports = {
  wabLogin,
  getUserInfo,
  buyBook
}