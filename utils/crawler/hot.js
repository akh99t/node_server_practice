const axios = require('axios');
const mongodbFun = require('../mongodb/index')
const crawlerModel = require('../mongodb/crawlerModel')
const { BLBL_COOKIE } = require('../../config')

const hotFun = (name, data) => {
  mongodbFun().then(async () => {
    try {
      // 尝试在数据库中查找符合条件的文档
      const existingDoc = await crawlerModel.findOneAndUpdate(
        {
          name,
        },
        {
          // 更新的数据
          name,
          data,
          updateTime: new Date(),
        }, {
          upsert: true,
          new: true
        }
      );
    } catch (error) {
      throw error;
    }
  })
}

// 获取知乎热度并且存储数据库
async function crawlZhihuHot() {
  const url = 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total';
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get(url) || {};
      let zhihuHot = data?.data
      if (zhihuHot && zhihuHot.length) {
        hotFun('zhihuHot', zhihuHot)
        console.log('知乎更新01: ', zhihuHot?.[0]?.target?.title);
        resolve({
          data: zhihuHot
        })
      } else {
        reject({
          data: []
        })
      }
    } catch (error) {
      reject({
        error,
      })
    }
  })
}

// 获取B站热门视频并且存储数据库
async function crawlBLBLHot() {
  const url = 'https://api.bilibili.com/x/web-interface/popular';
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    Referer: 'https://www.bilibili.com/v/popular/all/',
    Cookie: BLBL_COOKIE
  }
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get(url, { headers }) || {};
      let BLBLHot = data?.data?.list
      if (BLBLHot && BLBLHot.length) {
        hotFun('BLBLHot', BLBLHot)
        resolve({
          data: BLBLHot
        })
      } else {
        reject({
          data: []
        })
      }
    } catch (error) {
      reject({
        error,
      })
    }
  })
}

// 数据库查询热点数据并返回前端
let crawlerHotPosts = (req, res, responseFormat) => {
  let { name } = req.body || {}
  if (name) {
    mongodbFun().then(() => {
      try {
        crawlerModel.findOne({ name }).then(
          ({data, updateTime}) => {
            res.json({
              code: 200,
              data,
              updateTime,
              message: `获取 ${name} 成功`
            })
          }
        ).catch(() => {
          res.json({
            code: 200,
            data: [],
            message: `获取 ${name} 失败`
          })
        })
      } catch (error) {
        res.status(500).json({
          code: 500,
          data: [],
          error,
          message: `sorry, 出现预期之外的情况~`
        })
      }
    })
  }
}

module.exports = {
  crawlerHotPosts,
  crawlHotFun: () => {
    console.log('--- 执行爬虫 更新数据库数据 ---');
    crawlZhihuHot().then(() => {}, () => {});
    crawlBLBLHot().then(() => {}, () => {});
  }
}
