// 连接数据库
const mongodbFun = require('../mongodb/index')
// 数据库-用户操作日志
const logModel = require('../mongodb/logModel')

const getOperationLog = (req, res, responseFormat) => {
  let {
    currentPage,
    pageSize
  } = req.body

  mongodbFun().then(() => {
    return Promise.all([
      logModel.countDocuments({}), // 获取数据总数
      logModel.find({}) // 查询数据
      .skip((currentPage - 1) * pageSize) // 跳过前面的记录
      .limit(pageSize) // 限制返回的记录数量
      .sort({
        date: -1
      }) // 根据日期字段倒序排序
    ])
  }).then(([total, logs]) => {
    res.json({
      message: '获取用户操作日志成功',
      code: 200,
      data: {
        total,
        data: logs
      }
    })
  }).catch(err => {
    res.status(500).json({
      ...responseFormat,
      message: '获取用户操作日志失败',
      error: err.message // 将错误信息返回给客户端
    })
  })
}

module.exports = {
  getOperationLog,
}