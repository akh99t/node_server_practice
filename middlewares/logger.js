// 连接数据库
const mongodbFun = require('../utils/mongodb/index')
// 数据库-用户
const logModel = require('../utils/mongodb/logModel')
// 数据库-用户登录凭证
const sessionModel = require('../utils/mongodb/sessionModel')
// 配置无需上传接口日志的接口
const NO_LOG_UPLOAD_ENDPOINT = [
  '/login/validateUserCredentials', // 验证当前用户凭证
]

// logger.js
const logRoute = (req, res, next) => {
  const requestTime = new Date();
  const ipAddress = req.ip;
  const routePath = req.path;
  if (NO_LOG_UPLOAD_ENDPOINT.includes(routePath)) {
    next()
  } else {
    let {
      userName: userNameBody,
      _id
    } = req.body || {}
    let {
      userName: userNameQuery
    } = req.query || {}
    
    let parameter = {
      userName: userNameBody || userNameQuery || '',
      IP: ipAddress,
      path: routePath,
      date: requestTime,
      sessionID: _id || ''
    }
    let mongodbData = mongodbFun
    mongodbData.then(() => {
      logModel.create(parameter)
        .then(result => {
          // 上传数据库成功
          next();
        })
        .catch(error => {
          next();
        });
    }).catch(() => {
      next();
    })

  }
};

module.exports = logRoute;