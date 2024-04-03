// AI问答记录
const mongoose = require('mongoose')

// 获取当前时间戳（UTC时间）
const utcTimestamp = Date.now();
// 将UTC时间戳转换为Date对象
const utcDate = new Date(utcTimestamp);
// 将UTC时间加上8小时得到北京时间
utcDate.setHours(utcDate.getHours() + 8);

// 创建文档的结构对象
let aiQADataSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: utcDate,
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