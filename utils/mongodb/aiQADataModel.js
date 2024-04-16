// AI问答记录
const mongoose = require('mongoose')
const { fetchBeijingTime } = require('../../public/javascripts/timeUtils')

// 获取当前时间戳（UTC时间）
const utcTimestamp = Date.now();

// 创建文档的结构对象
let aiQADataSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: fetchBeijingTime(),
  },
  userID: {
    type: String,
    required: true,
  },
  dataJSON: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('aiQAData', aiQADataSchema)