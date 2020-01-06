const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')

// 获取banner
async function getBanner(query) {
  let pageSize = query.pageSize ? query.pageSize : 5
  let pageNum = query.pageNum ? query.pageNum : 1
  return exec(sql.table('banner').page(pageNum, pageSize).select())
}

module.exports = {
  getBanner
}