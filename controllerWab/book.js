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
  const content = await exec(sql.table('book_comment').where({ book_id: book_id }).select())
  const user_info = await exec(sql.table('user_info').where({ user_id: user_id }).field('like_book_comment,collection_book_ids').select())
  const chapters = await exec(sql.table('chapter').where({ book_id: book_id }).field('chapter_id,chapter_name,book_id').order('order_num desc').select())
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
    bookshelf: bookshelf,
    chapters: chapters[0]
  }
  return Promise.resolve(data)
}

// 收藏书本
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

// 搜索
async function querySearch(req) {
  const title = req.query.title
  return exec(sql.table('book').where({ bookname: { like: `%${title}%` } }).select())
}

// 加入书架
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
    return Promise.resolve(false)
  } else {
    let ids = `${book_id}`
    if (user_info[0].collection_book_ids) {
      ids = `${user_info[0].collection_book_ids},${book_id}`
    }
    exec(sql.table('user_info').data({ collection_book_ids: ids }).where({ user_id: user_id }).update());
    let collection = book[0].collection + 1
    return exec(sql.table('book').data({ collection: collection }).where({ id: book_id }).update());
  }
}

// 新增书本评论
async function addcomment(req) {
  const book_id = req.body.book_id
  const content = req.body.comment
  const user_id = req.user.id
  let userInfo = await exec(sql.table('users').where({ id: user_id }).field('nickname,head_portrait').select())
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
  return exec(sql.table('book_comment').data(data).insert()).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

// 获取个人书架
async function deleteCollection(req) {
  const user_id = req.user.id
  const book_id = req.body.id
  const userInfo = await exec(sql.table('user_info').where({ user_id: user_id }).field('collection_book_ids').select())
  const collection_book_ids = userInfo[0].collection_book_ids
  let bookids = []
  let index
  if (collection_book_ids) {
    bookids = userInfo[0].collection_book_ids.split(",");
    bookids.forEach((item, index) => {
      if (book_id === item) {
        index = index
      }
    })
    bookids.splice(index, 1)
  }
  let bookStr = bookids.toString()
  return exec(sql.table('user_info').data({ collection_book_ids: bookStr }).where({ user_id: user_id }).update())
}

// 书本列表
async function bookList(query) {
  const type = query.type ? query.type : "M"
  const is_free = query.is_free ? query.is_free : 0  //0不筛选  1免费 2付费
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
  let pagePromiste = await exec(sql.table('book').order('collection desc').where(parameter).page(pageNum, pageSize).select())
  let sort = await exec(sql.table('sort').where().select())
  pagePromiste.forEach(item => {
    sort.forEach(s => {
      if (item.sortid === s.id) {
        item.sortname = s.sortname
      }
    })
  })
  data.list = pagePromiste
  let totalPromiste = await exec(sql.table('book').where(parameter).select())
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
    book_id: req.query.bookid,
    chapter_id: req.query.chapterid
  }
  return exec(sql.table('chapter').where(params).order('order_num').select()).then(data => {
    return data[0]
  })
}


// 获取书本章节列表
async function getChapterList(req) {
  let params = {
    book_id: req.query.bookid
  }
  return exec(sql.table('chapter').where(params).order('order_num').select()).then(data => {
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