/**
 * Created by zrz on 2016/9/30.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router()
    , homeService = require('../../service/home');

router.get('/', function (req, res) {
    return res.render('./home/view', {
        title: '首页 - blog'
        , history: homeService.history()
        , demo: homeService.demo()
    });
});

module.exports = router;