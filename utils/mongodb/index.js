// 连接mongodb数据库
const mongoose = require('mongoose');

module.exports = new Promise((resolve, reject) => {
  // 严格查询模式，当进行查询时，如果遇到查询条件不正确的情况，Mongoose 将会抛出错误。
  mongoose.set('strictQuery', true)
  
  // 连接 mongodb
  mongoose.connect('mongodb://localhost:27017/usersList')
  
  const db = mongoose.connection;
  // 回调-连接成功
  db.once('open', async () => {
    let collections = null;
    try {
        // 获取集合列表
        collections = await db.listCollections();
    } catch (err) {
        console.error('获取集合列表时出错：', err);
    }
    resolve({message: 'mongoose-连接成功', collections})
  })
  // 回调-连接失败
  mongoose.connection.on('error', () => {
    reject('mongoose-连接失败')
  })
  // 回调-连接关闭
  mongoose.connection.on('close', () => {
    console.log('mongoose-连接关闭');
  })

})