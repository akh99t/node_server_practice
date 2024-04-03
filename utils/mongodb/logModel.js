// 接口日志
const mongoose = require('mongoose')

// 创建文档的结构对象
let LogSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    required: true,
    default: new Date() 
  },
  sessionID: {
    type: String,
  },
  path: {
    type: String,
    required: true,
  },
  IP: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('logRouter', LogSchema)