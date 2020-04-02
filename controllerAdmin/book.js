const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')

// 获取书单列表
async function getBookList(query) {
  let pageSize = query.pageSize ? query.pageSize : 20
  let pageNum = query.pageNum ? query.pageNum : 1
  let start_from = (pageNum - 1) * pageSize
  let pageSql = `SELECT b.id ,b.bookname,b.is_free, b.renqun_type,
  b.images, b.author, b.sortid, b.createtime, b.vip_price,
  b.is_display ,b.description,b.price,s.sortname,t.title
  FROM book b 
  INNER JOIN sort s ON b.sortid = s.id  
  INNER JOIN book_type t ON b.book_type_id = t.type_id
  ORDER BY createtime DESC
  LIMIT ${start_from}, ${pageSize}`
  let data = {}
  let pagePromiste = await exec(pageSql)
  data.list = pagePromiste
  let totalPromiste = await exec(
    sql
      .table('book')
      .where()
      .select()
  )
  data.total = totalPromiste.length
  return Promise.resolve(data)
}

// 获取获取书本详情
async function getBookDetails(id) {
  let params = {}
  let chapters = await exec(
    sql
      .table('chapter')
      .where({ book_id: id })
      .order('order_num')
      .select()
  )
  let book_info = await exec(
    sql
      .table('book')
      .where({ id: id })
      .select()
  )
  params = {
    detail: book_info[0],
    chapters: chapters
  }
  return Promise.resolve(params)
}

// 新增书本
async function addBook(query) {
  let createtime = new Date()
  let parameter = {
    bookname: xss(query.bookname),
    sortid: query.sortid,
    description: xss(query.description),
    author: xss(query.author),
    createtime: createtime,
    images: xss(query.imageName),
    is_free: xss(query.is_free),
    is_display: xss(query.is_display),
    book_type_id: xss(query.book_type_id),
    renqun_type: xss(query.renqun_type)
  }
  if (query.is_free === 'N') {
    parameter.price = xss(query.price)
    parameter.vip_price = xss(query.vip_price)
  }
  return exec(
    sql
      .table('book')
      .data(parameter)
      .insert()
  ).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
  // const sql = `
  //       insert into book (bookname, sortid, type, description, author, createtime, images)
  //       values ('${bookname}', '${sortid}', '${type}', '${description}', '${author}', '${createtime}', '${imageName}');
  //   `
  // return exec(sql).then(insertData => {
  //   return {
  //     id: insertData.insertId
  //   }
  // }).catch(err => {
  // })
}

// 更新上架状态
async function updateType(query) {
  let { id } = query
  return exec(
    sql
      .table('book')
      .data({ is_display: xss(query.is_display) })
      .where({ id: id })
      .update()
  ).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
  // const sql = `
  //       update book set type=${type} where id=${id}
  //   `
  // return exec(sql).then(updateData => {
  //   if (updateData.affectedRows > 0) {
  //     return true
  //   }
  //   return false
  // })
}

// 更新书本信息
async function updateBook(query) {
  let { id, imageName } = query
  let uptime = new Date()
  let parameter = {
    bookname: xss(query.bookname),
    sortid: query.sortid,
    description: xss(query.description),
    author: xss(query.author),
    uptime: uptime,
    is_display: xss(query.is_display),
    is_free: xss(query.is_free),
    book_type_id: xss(query.book_type_id),
    renqun_type: xss(query.renqun_type)
  }
  if (query.is_free === 'N') {
    parameter.price = xss(query.price)
    parameter.vip_price = xss(query.vip_price)
  }
  if (imageName) parameter.images = imageName
  return exec(
    sql
      .table('book')
      .data(parameter)
      .where({ id: id })
      .update()
  ).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

// 获取分类详情
async function getSortType() {
  return exec(sql.table('sort').select()).then(data => {
    return data
  })
}

// 获取书本在前端显示的分类
async function getBookType() {
  return exec(sql.table('book_type').select()).then(data => {
    return data
  })
}

// 获取某章节
async function getChapter(req) {
  let params = {
    book_id: req.query.bookid,
    chapter_id: req.query.chapterid
  }
  return exec(
    sql
      .table('chapter')
      .where(params)
      .select()
  ).then(data => {
    return data[0]
  })
}

// 更新某章节
async function upChapter(req) {
  let params = {
    book_id: parseInt(req.body.book_id),
    chapter_id: parseInt(req.body.chapter_id)
  }
  let updata = {
    chapter_name: xss(req.body.chapter_name),
    order_num: xss(req.body.order_num),
    content: req.body.content
  }
  return exec(
    sql
      .table('chapter')
      .data(updata)
      .where(params)
      .field('book_id,chapter_name,chapter_id,content,order_num')
      .update()
  ).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

// 新增章节
async function addChapter(req) {
  let data = {
    book_id: req.body.book_id,
    chapter_name: xss(req.body.chapter_name),
    order_num: xss(req.body.order_num),
    content: xss(req.body.content),
    createtime: new Date()
  }
  return exec(
    sql
      .table('chapter')
      .data(data)
      .insert()
  ).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

// 更新某章节
async function sortOrder(req) {
  const orderNum = req.body.list
  let upSql = `UPDATE chapter SET order_num = CASE chapter_id `
  let whenSql = ``
  let whereSql = ` WHERE chapter_id IN (`
  orderNum.forEach((item, index) => {
    whenSql += ` WHEN ${item.chapter_id} THEN ${item.order_num}  `
    if (index === orderNum.length - 1) {
      whereSql += item.chapter_id
    } else {
      whereSql += item.chapter_id + ','
    }
  })
  whenSql += ` END `
  whereSql += `)`
  console.log(upSql + whenSql + whereSql, '------upSql + whenSql + whereSql')
  return exec(upSql + whenSql + whereSql).then(updateData => {
    console.log(updateData)
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getBookList,
  addBook,
  updateType,
  getBookDetails,
  updateBook,
  getSortType,
  getBookType,
  getChapter,
  upChapter,
  addChapter,
  sortOrder
}
