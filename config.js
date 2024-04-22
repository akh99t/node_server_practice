// 不可修改的用户列表
const ExceptOperationUserList = ['admin', '访客登录']
// 设置mongodb数据库路径
const baseNameList = ['dataPoolA']
// B站个人Cookie
const BLBLCookie = process?.env?.BLBL_COOKIE || null
// AI对话_邀请码_MD5加密
const AI_CHAT_INVITATION_CODE = '52c69e3a57331081823331c4e69d3f2e'

module.exports = {
  // PORT: process.env.PORT || 3000,
  // DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/mydb',
  // JWT_SECRET: process.env.JWT_SECRET || 'mysecretkey'
  MONGODB_URL_LIST: baseNameList.map(item => {
    return `mongodb://127.0.0.1:27017/${item}`
  }),
  AI_CHAT_INVITATION_CODE,
  EXCEPT_OPERATION_USER_LIST: ExceptOperationUserList,
  BLBL_COOKIE: BLBLCookie
};
