const express = require('express');
const router = express.Router();
const {
  responseFormat
} = require('./responseFormat')
const {
  authenticateCredentials,
  getUserCredentials,
  findUserCredentialsById
} = require('../utils/login/index')

router.get('/', function (req, res, next) {
  res.json({
    message: 'Hello, World!'
  });
});

// 登录接口 - 验证账号密码 - login
router.post('/', function (req, res, next) {
  let cloneResponseFormat = {
    ...responseFormat
  }
  // 登录账号与密码验证
  let authenticateCredentialsData = authenticateCredentials(req, res);
  authenticateCredentialsData.then(
    value => {
      res.status(200).json({
        ...cloneResponseFormat,
        ...value
      });
    }
  );
  authenticateCredentialsData.catch(
    error => {
      if (typeof error === 'object') {
        res.status(200).json({
          ...cloneResponseFormat,
          ...error
        });
      } else {
        res.status(500).json({
          error: '出错了, 找网管!'
        });
      }
    }
  );
});

// 登录成功后获取用户凭证
router.post('/userCredentials', (req, res) => {
  let cloneResponseFormat = {
    ...responseFormat
  }
  let userCredentialsData = getUserCredentials(req, res);
  userCredentialsData.then(
    value => {
      res.status(200).json({
        ...cloneResponseFormat,
        code: 200,
        data: value
      });
    }
  )
  userCredentialsData.catch(error => {
    res.status(500).json({
      error: '出错了, 找网管!'
    });
  })
})

// 验证用户凭证
router.post('/validateUserCredentials', (req, res) => {
  let cloneResponseFormat = {
    ...responseFormat
  }

  let findUserCredentialsByIdData = findUserCredentialsById(req)
  findUserCredentialsByIdData.then(
    v => {
      res.status(200).json({
        ...cloneResponseFormat,
        data: v,
        code: 200,
        message: '用户凭证验证通过'
      });
    }
  ).catch(error => {
    if (error) {
      res.status(500).json({
        ...cloneResponseFormat,
        error: '出错了, 找网管'
      });
    } else {
      res.status(200).json({
        ...cloneResponseFormat,
        code: 200,
        message: 'No User Credentials'
      });
    }

  })
  
})


router.get('/login', function (req, res, next) {
  // res.render(`'index', { title: 'Express' }`);
  req.session.text = 'akh'
  console.log('--- get /login A ---', req.session, req.headers.cookie);
  res.json({
    message: 'Hello, World!'
  });
});
router.get('/login2', function (req, res, next) {
  // res.render(`'index', { title: 'Express' }`);
  console.log('--- get /login C ---', req.session);
  res.json({
    message: 'Hello, World!'
  });
});


module.exports = router;