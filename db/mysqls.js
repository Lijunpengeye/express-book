const { init, exec, sql, transaction } = require('mysqls')
const { MYSQL_CONF } = require('../conf/db')
init(MYSQL_CONF)

module.exports = {
  exec,
  sql,
  transaction
}