const express = require('express');
const router = express.Router();
const {
  responseFormat
} = require('./responseFormat')
const { getOperationLog } = require('../utils/users/log')

// users
router.post('/', function (req, res, next) {
  
});

// 获取操作日志
router.post('/log', function (req, res, next) {
  getOperationLog(req, res, responseFormat)
});


module.exports = router;