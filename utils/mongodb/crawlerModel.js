const mongoose = require('mongoose')

// 创建文档的结构对象
let hotSchama  = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    unique: true
  },
  data: {
    type: Object,
    default: []
  },
  Date: {
    type: Date,
    required: true,
    default: new Date() 
  }
})

module.exports = mongoose.model('hotSchama', hotSchama)