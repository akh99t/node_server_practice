const express = require('express');
const router = express.Router();
const {
  responseFormat
} = require('./responseFormat')
const { getOperationLog } = require('../utils/users/log')
const { getOperationUsers, deleteUserFun } = require('../utils/users/users')

// users
// router.post('/', function (req, res, next) {});

// 获取操作日志
router.post('/log', function (req, res, next) {
  getOperationLog(req, res, responseFormat)
});

// 获取用户列表
router.post('/usersList', function (req, res, next) {
  getOperationUsers(req, res, responseFormat)
});

// 注销用户
router.post('/deleteUser', function (req, res, next) {
  deleteUserFun(req, res, responseFormat)
});


module.exports = router;