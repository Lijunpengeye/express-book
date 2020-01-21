const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')

// 获取banner
async function getIndexBookList(query) {
  let bookType = await exec(sql.table('book_type').where().select())
  let renqun_type = query.renqun_type
  let arr = []
  let obj = {}
  return new Promise((resolve, reject) => {
    bookType.map(async (item, index) => {
      let book = await exec(sql.table('book').where({ book_type_id: item.type_id, renqun_type: renqun_type, is_display: "Y" }).page(1, 5).order('collection desc').select())
      obj = {
        title: item.title,
        list: book
      }
      arr.push(obj)
      if (bookType.length === arr.length) {
        resolve(arr)
      }
    })
  })
}

module.exports = {
  getIndexBookList
}