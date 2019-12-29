const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')

// 获取书单列表
async function getBookList(query) {
  let pageSize = query.pageSize ? query.pageSize : 20
  let pageNum = query.pageNum ? query.pageNum : 1
  let start_from = (pageNum - 1) * pageSize
  let pageSql = `SELECT b.id ,b.bookname,b.is_free, 
  b.images, b.author, b.sortid, b.createtime, b.vip_price,
  b.is_display ,b.description,b.price,s.sortname
  FROM book b 
  INNER JOIN sort s ON b.sortid = s.id  
  ORDER BY createtime DESC
   LIMIT ${start_from}, ${pageSize}`
  let data = {}
  let pagePromiste = await exec(pageSql)
  data.list = pagePromiste
  let totalPromiste = await exec(sql.table('book').where().select())
  data.total = totalPromiste.length
  return Promise.resolve(data)
}

// 获取获取书本详情
async function getBookDetails(id) {
  return exec(sql.table('book').where({ id: id }).select()).then(data => {
    return data[0]
  })
  // console.log('-------------', id)
  // let sql = `select * from book where id=${id}`
  // console.log(sql)
  // return exec(sql).then(data => {
  //   return data[0]
  // })
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
    images: xss(query.imagesName),
    price: xss(query.price),
    is_free: xss(query.is_free),
    is_display: xss(query.is_display),
    vip_price: xss(query.vip_price),
  }
  return exec(sql.table('book').data(parameter).insert()).then(insertData => {
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
  return exec(sql.table('book').data({ is_display: xss(query.is_display) }).where({ id: id }).update()).then(updateData => {
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
    price: xss(query.price),
    is_free: xss(query.is_free),
    vip_price: xss(query.vip_price),
  }
  if (imageName) parameter.images = imageName
  return exec(sql.table('book').data(parameter).where({ id: id }).update()).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
  // let sql = `
  //       update book set 
  //       bookname='${bookname}',
  //       sortid=${sortid}, 
  //       type=${type},
  //       author='${author}',
  //       description='${description}',`
  // if (imageName) {
  //   sql += ` images='${imageName}',`
  // }
  // sql += ` uptime=${uptime}
  //       where id=${id}
  //       `
  // console.log(sql)
  // return exec(sql).then(updateData => {
  //   if (updateData.affectedRows > 0) {
  //     return true
  //   }
  //   return false
  // })
}

// 获取分类详情
async function getSortType() {
  return exec(sql.table('sort').select()).then(data => {
    return data
  })
}

module.exports = {
  getBookList,
  addBook,
  updateType,
  getBookDetails,
  updateBook,
  getSortType
}