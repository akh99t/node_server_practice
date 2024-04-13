const { EXCEPT_OPERATION_USER_LIST } = require('../../config')
// 连接数据库
const mongodbFun = require('../mongodb/index')
// 数据库-用户
const userModel = require('../mongodb/usersModel')
// 数据库-用户凭证
const sessionModel = require('../mongodb/sessionModel')

// 密码加密与校验
const {
  encryptFun,
  checkPasswordFun
} = require('../mongodb/bcryptFun');

// 设置session
function setSession(req, userName, grade = 1) {
  if (req && req.session) {
    req.session.text = 'akh999'
    req.session.user = userName
    req.session.key = `userName_${userName}`
    req.session.grade = grade
  }
}

// 登录账号与密码验证
const authenticateCredentials = (req = {}, res = {}) => {
  return new Promise((resolve, rejcte) => {
    // 登录账号与密码验证
    let {
      userName,
      password
    } = req.body || {}

    if (userName && password) {
      let mongodbData = mongodbFun()
      // 连接数据库成功后的回调
      mongodbData.then(mongodbFunResolve => {
        // 判断数据库中是否有重复的用户名
        userModel.findOne({
            userName
          })
          .then(user => {
            let grade = userName === 'admin' ? 0 : 1
            if (user) {
              // 如果有相同的userName, 则校验密码
              let checkPasswordData = checkPasswordFun(password, user.password);
              checkPasswordData.then(value => {
                // 如果校验密码成功 生成cookie校验
                if (value) {
                  setSession(req, userName, grade)
                }
                resolve({
                  message: value ? '登录成功' : '密码校验失败',
                  code: value ? 200 : 400,
                })
              }, err => {
                rejcte(false)
              })

            } else {
              userModel.countDocuments().then(value => {
                // 当前允许存在账号上限: 10
                if (value >= 10) {
                  resolve({
                    message: '密码校验失败',
                    code: 400,
                  })
                } else {
                  // 数据库无匹配userName - 注册
                  let encryptData = encryptFun(password);
                  // hash - 通过哈希加密的密码
                  encryptData.then(hash => {
                    // 注册 上传数据库
                    let parameter = {
                      userName,
                      password: hash,
                      grade,
                      exceptOperation: EXCEPT_OPERATION_USER_LIST.includes(userName),
                      date: new Date(),
                    }
                    userModel.create(parameter)
                      .then(result => {
                        // 上传数据库成功
                        setSession(req, userName, grade)
                        resolve({
                          code: 200,
                          message: '注册成功',
                        })
                      })
                      .catch(error => {
                        // 上传数据库失败
                        reject({
                          code: 500,
                          message: '注册失败',
                        })
                      });
                  })
                }
              }).catch(err => {
                rejcte(false)
              })
            }
          })
          .catch(error => {
            rejcte(false)
          })
      })

    } else {
      rejcte(401)
    }
  })
}

// 返回用户凭证
const getUserCredentials = (req = {}) => {
  return new Promise((resolve, reject) => {
    let {
      userName,
    } = req.body || {}
    let regexPattern = new RegExp(`userName_${userName}`)
    sessionModel.findOne({
      session: {
        $regex: regexPattern
      }
    }).sort({
      expires: -1
    }).then(
      value => {
        resolve(value)
      }
    )
  })
}

// id查询用户凭证
const findUserCredentialsById = (req = {}) => {
  return new Promise((resolve, rejcte) => {
    let {
      _id
    } = req.body || {};

    try {
      let mongodbData = mongodbFun()
      mongodbData.then(() => {
        sessionModel.findOne({
          _id,
        }).then(
          value => {
            value ? resolve(value) : rejcte(value)
          }
        ).catch(error => {
          rejcte(error)
        })
      }).catch(error => {
        rejcte(error)
      })
    } catch (error) {
      rejcte(error)
    }
  })
}

module.exports = {
  authenticateCredentials,
  getUserCredentials,
  findUserCredentialsById
}