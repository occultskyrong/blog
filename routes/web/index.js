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

module.exports = router;