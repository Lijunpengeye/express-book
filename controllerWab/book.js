const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')

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
  const bookComment = await exec(
    sql
      .table('book_comment')
      .where({ book_id: book_id })
      .select()
  )
  const userBookComent = await exec(
    sql
      .table('user_book_comment')
      .where({ book_id: book_id, user_id: user_id })
      .select()
  )
  const userCollecton = await exec(
    sql
      .table('collection_book')
      .where({ book_id: book_id, user_id: user_id })
      .select()
  )
  const chapters = await exec(
    sql
      .table('chapter')
      .where({ book_id: book_id })
      .field('chapter_id,chapter_name,book_id')
      .order('order_num desc')
      .select()
  )
  bookComment.forEach(item => {
    item.likeType = false
  })
  if (bookComment.length && userBookComent.length) {
    bookComment.forEach(item => {
      userBookComent.forEach(i => {
        if (i.comment_id === item.id) {
          item.likeType = true
        }
      })
    })
  }
  let bookshelf = false
  if (userCollecton.length) bookshelf = true
  let data = {
    detail: detail[0],
    content: bookComment,
    bookshelf: bookshelf,
    chapters: chapters
  }
  return Promise.resolve(data)
}

// 收藏书本
async function getCollection(req) {
  const userId = req.user.id
  const userBook = await exec(
    sql
      .table('collection_book')
      .where({ user_id: userId })
      .select()
  )
  if (userBook.length) {
    let ids = []
    userBook.forEach(item => {
      ids.push(item.book_id)
    })
    const bookids = ids.toString()
    let sql = `SELECT * FROM book WHERE id IN (${bookids}) `
    return exec(sql)
  } else {
    return false
  }
}

// 搜索
async function querySearch(req) {
  const title = req.query.title
  return exec(
    sql
      .table('book')
      .where({ bookname: { like: `%${title}%` } })
      .select()
  )
}

// 加入书架
async function addBookshelf(req) {
  const user_id = req.user.id
  const book_id = req.body.book_id
  const createtime = new Date()
  let books = await exec(
    sql
      .table('collection_book')
      .where({ user_id: user_id, book_id: book_id })
      .select()
  )
  if (books.length) return { message: '该书本已在书架' }
  let data = { user_id: user_id, book_id: book_id, createtime: createtime }
  return exec(
    sql
      .table('collection_book')
      .data(data)
      .insert()
  )
}

// 新增书本评论
async function addcomment(req) {
  const book_id = req.body.book_id
  const content = req.body.comment
  const user_id = req.user.id
  let userInfo = await exec(
    sql
      .table('users')
      .where({ id: user_id })
      .field('nickname,head_portrait')
      .select()
  )
  const nick_name = userInfo[0].nickname
  const head_portrait = userInfo[0].head_portrait
  const createtime = new Date()
  let data = {
    user_id: user_id,
    book_id: book_id,
    nick_name: nick_name,
    content: content,
    createtime: createtime,
    head_portrait: head_portrait
  }
  return exec(
    sql
      .table('book_comment')
      .data(data)
      .insert()
  ).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

// 获取个人书架
async function deleteCollection(req) {
  const user_id = req.user.id
  const book_id = req.body.id
  return exec(
    sql
      .table('collection_book')
      .where({ user_id: user_id, book_id: book_id })
      .delet()
  )
}

// 书本列表
async function bookList(query) {
  const type = query.type ? query.type : 'M'
  const is_free = query.is_free ? query.is_free : 0 //0不筛选  1免费 2付费
  let pageSize = query.pageSize ? query.pageSize : 20
  let pageNum = query.pageNum ? query.pageNum : 1
  let data = {}
  let parameter = {
    renqun_type: type,
    is_display: 'Y'
  }
  if (parseInt(is_free) === 1) {
    parameter.is_free = 'Y'
  } else if (parseInt(is_free) === 2) {
    parameter.is_free = 'N'
  }
  if (query.sortid) {
    parameter.sortid = parseInt(query.sortid)
  }
  let pagePromiste = await exec(
    sql
      .table('book')
      .order('collection desc')
      .where(parameter)
      .page(pageNum, pageSize)
      .select()
  )
  let sort = await exec(
    sql
      .table('sort')
      .where()
      .select()
  )
  pagePromiste.forEach(item => {
    sort.forEach(s => {
      if (item.sortid === s.id) {
        item.sortname = s.sortname
      }
    })
  })
  data.list = pagePromiste
  let totalPromiste = await exec(
    sql
      .table('book')
      .where(parameter)
      .select()
  )
  data.totalPage = Math.ceil(totalPromiste.length / pageSize)
  return Promise.resolve(data)
}

// 获取分类详情
async function getSortType(req) {
  return exec(sql.table('sort').select()).then(data => {
    return data
  })
}

// 获取书本章节列表
async function getChapter(req) {
  let params = {
    book_id: req.query.bookid
  }
  return exec(
    sql
      .table('chapter')
      .where(params)
      .order('order_num')
      .select()
  )
}

// 获取书本章节列表
async function getChapterList(req) {
  let params = {
    book_id: req.query.bookid
  }
  return exec(
    sql
      .table('chapter')
      .where(params)
      .order('order_num')
      .select()
  ).then(data => {
    return data
  })
}

module.exports = {
  getBookDetail,
  getCollection,
  querySearch,
  addcomment,
  addBookshelf,
  deleteCollection,
  bookList,
  getSortType,
  getChapter,
  getChapterList
}
