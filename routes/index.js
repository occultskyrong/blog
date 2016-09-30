/**
 * Created by zrz on 2016/9/30.
 * @version 1.0.0 created
 */

"use strict";

var router=require('express').Router();

// 拦截所有路由请求
router.use(function (req,res,next) {
    
});

// 拦截请求，分层拦截路由

// 拦截所有错误请求
router.use(function (err,req,res,next) {
    
});

module.exports=router;