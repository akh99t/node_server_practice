const express = require('express');
const router = express.Router();
const {
  responseFormat
} = require('./responseFormat')
const {
  fetchQALimitAndAvailabilityFun,
  saveAIQARecordFun,
  getAIDialogueRecordsFun
} = require('../utils/openAI/searchAndSave')
const { AI_CHAT_INVITATION_CODE } = require('../config')
// const openAI = require('../utils/openAI/index')

// 限制每个账号AI聊天次数
const dialogueLimit = 100

// openAI
router.get('/', function (req, res, next) {
  // console.log('--- openAI ---', openAI);
  // openAI().then(value => {})
  res.json({
    message: 'openAI'
  });
});

// 校验验证码
router.post('/qualifyValidation', function (req, res, next) {
  let {
    invitationCode,
    userID
  } = req.body || {};

  let cloneResponseFormat = {
    ...responseFormat
  }

  if (invitationCode === AI_CHAT_INVITATION_CODE) {
    res.status(200).json({
      ...cloneResponseFormat,
      message: '邀请码正确',
      code: 200,
    });
  } else {
    res.status(200).json({
      ...cloneResponseFormat,
      message: '邀请码错误',
      code: 403,
    });
  }
});

// 获取问答限制次数与可用次数
router.get('/fetchQALimitAndAvailability', function (req, res, next) {
  let {
    userName
  } = req.query || {}
  let fetchQALimitAndAvailability = fetchQALimitAndAvailabilityFun(userName)
  fetchQALimitAndAvailability.then(value => {
    if (value instanceof Array) {
      res.json({
        ...responseFormat,
        data: {
          todayCount: value.length,
          dialogueLimit,
        },
        message: `${userName}今日对话次数: ${value.length}`,
        code: 200,
      });
    } else {
      res.status(500).json({
        ...responseFormat,
        code: 500,
        message: '获取今日对话次数失败'
      });
    }
  })
  fetchQALimitAndAvailability.catch(error => {
    res.status(500).json({
      ...responseFormat,
      code: 500,
      message: '出现未知错误, 叫网管吧'
    });
  })
});

// 存储AI问答记录
router.post('/saveAIQARecord', function (req, res, next) {
  let {
    userName,
    dataJSON,
    userID
  } = req.body || {}
  saveAIQARecordFun(userName, dataJSON, userID).then(value => {
    res.json({
      ...responseFormat,
      ...value
    });
  }, error => {
    res.status(500).json({
      ...responseFormat,
      ...error
    });
  })

});

// 获取AI问答记录
router.post('/getAIDialogueRecords', function (req, res, next) {
  let {
    userName,
  } = req.body || {}
  getAIDialogueRecordsFun(userName).then(value => {
    res.json({
      ...responseFormat,
      ...value
    });
  }, error => {
    res.status(500).json({
      ...responseFormat,
      ...error
    });
  })

});

module.exports = router;