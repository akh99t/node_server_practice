const express = require('express');
const router = express.Router();
const {
  responseFormat
} = require('./responseFormat')

const { crawlerHotPosts } = require('../utils/crawler/hot')

// 爬取热榜
router.post('/hot', function (req, res, next) {
  crawlerHotPosts(req, res, responseFormat);
});



module.exports = router;