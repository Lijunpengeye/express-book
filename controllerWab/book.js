const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')

// 获取banner
async function getBookDetail(query) {
  const book_id = query.id
  const detail = await exec(sql.table('book').where({ id: book_id }).select())
  const content = await exec(sql.table('comment').where({ book_id: book_id }).select())
  let data = {
    detail: detail[0],
    content: content
  }
  return Promise.resolve(data)
}

async function getCollection(req) {
  const userid = req.user.id
  const data = await exec(sql.table('user_info').where({ user_id: userid }).select());
  let bookids = data[0].collection_book_ids.split(",");
  if (bookids.length) {
    let sql = `SELECT * FROM book WHERE id IN (${bookids}) `
    return exec(sql)
  } else {
    return false
  }
}

async function querySearch(req) {
  const title = req.query.title
  return exec(sql.table('book').where({ bookname: { like: `%${title}%` } }).select())
}
module.exports = {
  getBookDetail,
  getCollection,
  querySearch
}