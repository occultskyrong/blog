/**
 * Created by zrz on 2016/9/30.
 * @version 1.0.0 created
 */

"use strict";

/* globals blog */
const router = require('express').Router()
    , log4js = require('../service/log4j').log4js;

// 拦截所有路由请求，主要是进行login验证
router.use(function (req, res, next) {
    blog.http(req);// 记录所有路由请求
    next();
});

// 响应日志
router.use(log4js.connectLogger(log4js.getLogger('http'), {
    level: 'INFO'
    , format: ':remote-addr  :method  :url  :status  :response-time' + 'ms'
}));

// 错误页面的路由
router.get('/error', function (req, res) {
    const t = 't' in req.query && req.query['t'] || 404
        , errConfig = require('../config/error')
        , error = {text: errConfig[t] || '错误标记'};
    return res.render('./error', {
        title: error['text']
        , error: {
            status: t
            , stack: error['text']
        }
    });
});

// 拦截登录请求
router.use('/login', require('./login'));

router.use('/api', require('./api'));       // api请求
router.use('/docs', require('./docs'));     // docs文档请求
router.use('/demo', require('./demo'));     // demo请求
router.use('/', require('./web'));          // web页面请求

// router.use('/m', require('./management'));  // 管理页面
// router.use('/u', require('./user'));        // 用户页面

// 拦截所有错误请求
//* 一般是路由里面发生错误的解析，可能导致系统崩溃
router.use(function (err, req, res, next) {
    if (err) {//错误请求
        if (blog.ENV === 'development') {//开发环境抛出错误栈
            require('errorHandler')()(err, req, res, next);
        } else {
            blog.error(err, req, -100);
            if ('method' in req && req['method'] === 'get') {
                res.render('./error', {
                    title: err['message']
                    , error: {
                        status: err.status || err.statusCode
                        , stack: err['text']
                    }
                });
            } else {
                res.json({
                    status: -1
                    , error: err || 404
                    , message: 'message' in err && err['message'] || ''
                });
            }
        }
    } else {
        next();
    }
});

// 404错误处理
router.use(function (req, res) {
    const err = new Error('Not Found');
    res.render('./error.ejs', {
        title: '页面未找到'
        , error: blog.error(err, req, 404)
    });
});

module.exports = router;