// 定时执行
const schedule = require('node-schedule');
// 知乎热度数据
const { crawlHotFun } = require('./crawler/hot')

const spiderTimerFun = () => {
  crawlHotFun();
}

// 定义定时任务
const job = schedule.scheduleJob('30 * * * *', function() {
    console.log('--- 每个小时执行的函数 ---', new Date());
    spiderTimerFun()
});

module.exports = spiderTimerFun