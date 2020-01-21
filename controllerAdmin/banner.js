const { exec, sql, transaction } = require('../db/mysqls')
const xss = require('xss')

// 获取banner
async function getBanner(query) {
  let pageSize = query.pageSize ? query.pageSize : 20
  let pageNum = query.pageNum ? query.pageNum : 1
  let pagePromiste = await exec(sql.table('banner').page(pageNum, pageSize).select())
  let data = {}
  data.list = pagePromiste
  let totalPromiste = await exec(sql.table('banner').where().select())
  data.total = totalPromiste.length
  return Promise.resolve(data)
}

// 获取banner详情
async function getBannerDetails(id) {
  return exec(sql.table('banner').where({ id: id }).select()).then(data => {
    return data[0]
  })
  // console.log('-------------', id)
  // let sql = `select * from book where id=${id}`
  // console.log(sql)
  // return exec(sql).then(data => {
  //   return data[0]
  // })
}


// `banner_img` varchar(200) DEFAULT NULL COMMENT 'banner图片路径',
// `name` varchar(30) DEFAULT '' COMMENT 'banner名',
// `start_time` date DEFAULT NULL COMMENT '开始时间',
// `end_time` date DEFAULT NULL COMMENT '结束时间',
// `is_display` varchar(10) DEFAULT '' COMMENT 'Y显示，N不显示',
// 新增banner
async function addBanner(query) {
  const parameter = {
    banner_img: query.banner_img,
    name: xss(query.name),
    start_time: new Date(xss(query.start_time)),
    end_time: new Date(xss(query.end_time)),
    is_display: xss(query.is_display),
  }
  return exec(sql.table('banner').data(parameter).insert()).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

// 修改banner
async function updateBanner(query) {
  const id = query.id
  const parameter = {
    name: xss(query.name),
    start_time: new Date(xss(query.start_time)),
    end_time: new Date(xss(query.end_time)),
    is_display: xss(query.is_display),
  }
  if (query.banner_img) parameter.banner_img = query.banner_img
  return exec(sql.table('banner').data(parameter).where({ id: id }).update()).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

// 上下架
async function updateIsDisplay(query) {
  const id = query.id
  const parameter = {
    is_display: xss(query.is_display),
  }
  return exec(sql.table('banner').data(parameter).where({ id: id }).update()).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getBanner,
  addBanner,
  updateBanner,
  updateIsDisplay,
  getBannerDetails
}