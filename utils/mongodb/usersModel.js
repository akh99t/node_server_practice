// 用户名与密码
const mongoose = require('mongoose')

// 创建文档的结构对象
let UserSchema = new mongoose.Schema({
  userName: {
    // 用户名唯一
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
    default: 1
  },
  exceptOperation: {
    type: Boolean,
    required: false
  }
})

module.exports = mongoose.model('users', UserSchema)