// 连接mongodb数据库
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { MONGODB_URL_LIST } = require('../../config')
// 严格查询模式，当进行查询时，如果遇到查询条件不正确的情况，Mongoose 将会抛出错误。
mongoose.set('strictQuery', true)

let connectPromiseList = MONGODB_URL_LIST.map((url, index) => {
  let data = index ? mongoose.createConnection(url) : mongoose.connect(url)
  return data
})

const getMongodbConnect = (db) => {
  return new Promise((resolve, reject) => {
    // 回调-连接成功
    db.once('open', async () => {
      let collections = null;
      try {
          // 获取集合列表
          collections = await db.listCollections();
      } catch (err) {
          console.error('获取集合列表时出错：', err);
      }
      resolve({message: 'mongoose-连接成功', collections, ObjectId})
    })
    // 回调-连接失败
    db.on('error', () => {
      reject('mongoose-连接失败')
    })
    // 回调-连接关闭
    db.on('close', () => {
      console.log('mongoose-连接关闭');
    })
  
  })
}

const mongodbUsersList = getMongodbConnect(mongoose.connection);
// const mongodbCrawlerData = getMongodbConnect(connectPromiseList[1]);


module.exports = (type = '') => {
  let data = mongodbUsersList
  // if (type === 'crawlerData') {
  //   data = mongodbCrawlerData
  // }
  return data;
}