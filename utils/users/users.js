// 连接数据库
const mongodbFun = require('../mongodb/index')
// 数据库-用户操作日志
const usersModel = require('../mongodb/usersModel')

// 获取用户列表
const getOperationUsers = (req, res, responseFormat) => {
  let {
    currentPage,
    pageSize
  } = req.body

  mongodbFun().then(() => {
    return Promise.all([
      usersModel.countDocuments({}), // 获取数据总数
      usersModel.find({}) // 查询数据
      .skip((currentPage - 1) * pageSize) // 跳过前面的记录
      .limit(pageSize) // 限制返回的记录数量
      .sort({
        grade: 1
      })
      .select({
        password: 0
      }) // 排除 id 字段
    ])
  }).then(([total, users]) => {
    res.json({
      message: '获取用户列表成功',
      code: 200,
      data: {
        total,
        data: users
      }
    })
  }).catch(err => {
    res.status(500).json({
      ...responseFormat,
      message: '获取用户列表失败',
      error: err.message // 将错误信息返回给客户端
    })
  })
}

// 删除用户
const deleteUserFun = (req, res, responseFormat) => {
  let {
    _id,
  } = req.body

  mongodbFun().then(({
    ObjectId
  }) => {
    return Promise.all([
      usersModel.findByIdAndDelete(new ObjectId(_id))
    ]).then(([delUser]) => {
      res.json({
        message: '删除用户成功',
        code: 200,
        data: delUser,
      })
    }).catch(err => {
      res.status(500).json({
        ...responseFormat,
        message: '删除用户失败',
        error: err.message // 将错误信息返回给客户端
      })
    })
  })
}

module.exports = {
  getOperationUsers,
  deleteUserFun,
}