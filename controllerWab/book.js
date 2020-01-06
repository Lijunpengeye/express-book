const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')

// 获取banner
async function getBookDetail(query) {
  let book_id = query.id
  let detail = await exec(sql.table('book').where({ id: book_id }).select())
  let content = await exec(sql.table('comment').where({ book_id: book_id }).select())
  let data = {
    detail: detail[0],
    content: content
  }
  return Promise.resolve(data)
}

module.exports = {
  getBookDetail
}