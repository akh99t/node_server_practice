// 获取当前时间并更改为北京时区
const fetchBeijingTime = () => {
  let time = new Date()
  time.setHours(time.getHours() + 8); // 调整时区为东八区（北京时间）
  return time;
}

module.exports = {
  fetchBeijingTime,
}