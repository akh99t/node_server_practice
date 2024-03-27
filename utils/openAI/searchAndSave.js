// mongodb数据库连接
const mongodbFun = require('../mongodb/index')
// 存储
const aiQADataModel = require('../mongodb/aiQADataModel')

// 获取今日问答记录
const aiQADataFindFun = (userName) => {
  const todayStart = new Date();
  const todayEnd = new Date();

  todayStart.setHours(todayStart.getHours() + 8); // 调整时区为东八区（北京时间）
  todayEnd.setHours(todayStart.getHours() + 8); // 调整时区为东八区（北京时间）
  todayStart.setUTCHours(0, 0, 0, 0); // 设置为今天的UTC零点
  todayEnd.setUTCHours(23, 59, 59, 999); // 设置为今天的UTC 23:59:59.999

  return aiQADataModel.find({
    userName,
    date: {
      $gte: todayStart,
      $lte: todayEnd
    }
  }).exec()
}

// 获取问答限制次数与可用次数
let fetchQALimitAndAvailabilityFun = (userName) => {
  return new Promise((reslove, reject) => {
    // 连接数据库
    let mongodbData = mongodbFun
    try {
      mongodbData.then(() => {
        let aiQAData = aiQADataFindFun(userName)
        aiQAData.then(value => {
          reslove(value)
        })
        aiQAData.catch(error => {
          reject(error)
        })
      })
    } catch (error) {
      reject(error)
    }
  })
}

// 存储问答数据
let saveAIQARecordFun = (userName, dataJSON, userID) => {
  return new Promise((resolve, reject) => {
    try {
      // 连接数据库
      let mongodbData = mongodbFun
      mongodbData.then(() => {
        // 存储问答记录
        let newRecord = new aiQADataModel({
          userName,
          dataJSON,
          userID
        })
        newRecord.save().then(() => {
          resolve({
            message: '存储问答记录 200',
            code: 200
          })
        })
      })
      mongodbData.catch(error => {
        reject({
          message: '存储问答记录 500',
          code: 500,
          error
        })
      })
    } catch (error) {
      reject({
        message: '存储问答记录_出现意料之外的报错 500',
        code: 500,
        error
      })
    }
  })
}

// 获取问答记录
let getAIDialogueRecordsFun = (userName) => {
  return new Promise((resolve, reject) => {
    try {
      // 连接数据库
      let mongodbData = mongodbFun
      mongodbData.then(() => {
        let aiQAData = aiQADataFindFun(userName)
        aiQAData.then(value => {
          resolve({
            message: '获取问答记录 200',
            code: 200,
            data: value
          })
        })
        aiQAData.catch(error => {
          reject({
            message: '获取问答记录 500',
            code: 500,
            error
          })
        })
      })
      mongodbData.catch(error => {
        reject({
          message: '获取问答记录 500',
          code: 500,
          error
        })
      })
    } catch (error) {
      reject({
        message: '获取问答记录_出现意料之外的报错 500',
        code: 500,
        error
      })
    }
  })
}

module.exports = {
  fetchQALimitAndAvailabilityFun,
  saveAIQARecordFun,
  getAIDialogueRecordsFun
}