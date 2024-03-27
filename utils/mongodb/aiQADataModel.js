// AI问答记录
const mongoose = require('mongoose')

// 创建文档的结构对象
let aiQADataSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now() + 8 * 60 * 60 * 1000 // 默认值为当前北京时间
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