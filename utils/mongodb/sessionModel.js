// 用户凭证
const mongoose = require('mongoose')

let SessionSchema = new mongoose.Schema({
  expires: {
    type: Date,
    required: true,
    unique: true
  },
  session: {
    type: String,
    required: true,
    unique: true
  },
  _id: {}
})

module.exports = mongoose.model('sessions', SessionSchema)