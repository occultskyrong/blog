/**
 * Created by zrz on 2016/9/30.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('./home/view', {
        title: '首页'
    });
});

router.get('/history', function (req, res) {
    res.render('./history/view', {
        title: '更新日志'
        , history: JSON.parse(require('fs').readFileSync('./public/static/history.json', 'utf8'))
    });
});

module.exports = router;