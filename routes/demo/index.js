/**
 * Created by zrz on 2016/11/29.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

// 所有的请求均拦截到对应test文件夹中
router.get('/*', function (req, res) {
    var uri = req.url
        , uArr = uri.split('/');
    if (uArr && uArr instanceof Array && uArr.length > 0) {
        try{
            return res.end(require('fs').readFileSync('./_demo' + uri));
        }catch (e){
            
        }
    }
    return res.redirect('/error?t=404');
});

module.exports = router;
