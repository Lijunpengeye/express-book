const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')

// let pageSql = `SELECT b.id ,b.bookname,b.is_free, b.renqun_type,
// b.images, b.author, b.sortid, b.createtime, b.vip_price,
// b.is_display ,b.description,b.price,s.sortname,t.title
// FROM book b 
// INNER JOIN sort s ON b.sortid = s.id  
// INNER JOIN book_type t ON b.book_type_id = t.type_id
// ORDER BY createtime DESC
// LIMIT ${start_from}, ${pageSize}`

// 获取书本详情
async function getBookDetail(req) {
  const book_id = req.query.id
  const user_id = req.user.id
  const _sql = `SELECT  b.id ,b.bookname,b.is_free, b.renqun_type,
  b.images, b.author, b.sortid, b.createtime, b.vip_price,
  b.is_display ,b.description,b.price,s.sortname,t.title
  FROM book b 
  INNER JOIN sort s ON b.sortid = s.id  
  INNER JOIN book_type t ON b.book_type_id = t.type_id
  WHERE b.id=${book_id}
   `
  const detail = await exec(_sql)
  const content = await exec(sql.table('book_comment').where({ book_id: book_id }).select())
  const user_info = await exec(sql.table('user_info').where({ user_id: user_id }).field('like_book_comment,collection_book_ids').select())
  let bookshelf = false
  let likeId = []
  let collection_book_ids = []
  if (user_info[0].like_book_comment) {
    likeId = user_info[0].like_book_comment.split(",")
  }
  if (user_info[0].collection_book_ids) {
    collection_book_ids = user_info[0].collection_book_ids.split(",")
    for (var i in collection_book_ids) {
      if (collection_book_ids[i] == book_id) {
        bookshelf = true;
      }
    }
  }
  content.forEach(item => {
    item.likeType = false
  })
  if (likeId.length) {
    content.forEach(item => {
      likeId.forEach(i => {
        if (item.comment_id === parseInt(i)) {
          item.likeType = true
        }
      })
    })
  }
  let data = {
    detail: detail[0],
    content: content,
    bookshelf: bookshelf
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

async function addBookshelf(req) {
  const user_id = req.user.id
  const book_id = req.body.book_id
  const user_info = await exec(sql.table('user_info').where({ user_id: user_id }).select());
  // const collection
  const book = await exec(sql.table('book').where({ id: book_id }).select());
  let bookids = user_info[0].collection_book_ids.split(",");
  let shelf = false
  if (user_info[0].collection_book_ids) {
    for (var i in bookids) {
      if (bookids[i] == book_id) {
        shelf = true;
      }
    }
  }

  if (shelf) {
    return Promise.resolve({ code: -1, message: "已在书架" })
  } else {
    let ids = ''
    if (user_info[0].collection_book_ids) {
      ids = `${user_info[0].collection_book_ids},${book_id}`
    }
    exec(sql.table('user_info').data({ collection_book_ids: ids }).where({ user_id: user_id }).update());
    let collection = book[0].collection + 1
    return exec(sql.table('book').data({ collection: collection }).where({ id: book_id }).update());
  }
}

module.exports = {
  getBookDetail,
  getCollection,
  querySearch,
  addBookshelf
}