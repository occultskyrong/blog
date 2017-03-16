/**
 * Created by zrz on 2016/9/30.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

// 登录 - 页面
router.get('/', (req, res)=> {
    return res.render('./login/view.ejs',{
        title:'登录'
    });
});

// 登录 - 发送请求

// 登录 - 退出登录
router.get('/off', (req, res)=> {
    if ('session' in req) {
        req.session.destory();
    } else {
        blog.error();
    }
    return res.redirect('/');
});

module.exports = router;