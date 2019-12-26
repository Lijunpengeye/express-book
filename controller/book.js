const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')

// 获取书单列表
async function getBookList(query) {
  let pageSize = query.pageSize ? query.pageSize : 20
  let pageNum = query.pageNum ? query.pageNum : 1
  let start_from = (pageNum - 1) * pageSize
  let pageSql = `SELECT * FROM newbook LIMIT ${start_from}, ${pageSize}`;
  let data = {}
  let pagePromiste = await exec(pageSql)
  data.list = pagePromiste
  let totalPromiste = await exec(sql.table('newbook').where().select())
  data.total = totalPromiste.length
  return Promise.resolve(data)
}

// 获取获取书本详情
async function getBookDetails(id) {
  return exec(sql.table('newbook').where({ id: id }).select()).then(data => {
    return data[0]
  })
  // console.log('-------------', id)
  // let sql = `select * from newbook where id=${id}`
  // console.log(sql)
  // return exec(sql).then(data => {
  //   return data[0]
  // })
}


// 新增书本
async function addBook(query) {
  let { bookname, sortid, type, descs, author, imageName } = query
  if (type) {
    type = 1
  } else {
    type = 0
  }
  bookname = xss(bookname)
  sortid = xss(sortid)
  descs = xss(descs)
  author = xss(author)
  let createtime = Date.now()
  let parameter = {
    bookname: bookname,
    sortid: sortid,
    descs: descs,
    author: author,
    createtime: createtime,
    images: imageName,
    type: type
  }
  return exec(sql.table('newbook').data(parameter).insert()).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
  // const sql = `
  //       insert into newbook (bookname, sortid, type, descs, author, createtime, images)
  //       values ('${bookname}', '${sortid}', '${type}', '${descs}', '${author}', '${createtime}', '${imageName}');
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
  let { id, type } = query
  if (type) {
    type = 1
  } else {
    type = 0
  }
  return exec(sql.table('newbook').data({ type: type }).where({ id: id }).update()).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
  // const sql = `
  //       update newbook set type=${type} where id=${id} 
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
  let { bookname, sortid, type, descs, author, imageName, id } = query
  if (type) {
    type = 1
  } else {
    type = 0
  }
  bookname = xss(bookname)
  sortid = xss(sortid)
  descs = xss(descs)
  author = xss(author)
  let uptime = Date.now()
  let parameter = {
    bookname: bookname,
    sortid: sortid,
    descs: descs,
    author: author,
    type: type,
    uptime: uptime
  }
  if (imageName) parameter.images = imageName
  return exec(sql.table('newbook').data(parameter).where({ id: id }).update()).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
  // let sql = `
  //       update newbook set 
  //       bookname='${bookname}',
  //       sortid=${sortid}, 
  //       type=${type},
  //       author='${author}',
  //       descs='${descs}',`
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

module.exports = {
  getBookList,
  addBook,
  updateType,
  getBookDetails,
  updateBook
}