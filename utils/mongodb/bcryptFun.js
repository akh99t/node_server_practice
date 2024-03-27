// bcrypt 密码加密
const bcrypt = require('bcrypt');

// 哈希的盐的轮数
const saltRounds = 10;

module.exports = {
  // 加密
  encryptFun(password) {
    return new Promise((res, rej) => {
      // 生成哈希密码
      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) {
          rej(error)
        } else {
          res(hash)
        }
      });
    })
  },
  // 校验密码
  checkPasswordFun(password, hash) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, hash, (error, result) => {
        if (error) {
          rej()
        } else {
          res(result)
        }
      });
    })
  }
}