/**
 * Created by zrz on 2016/9/30.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

router.use('/bootstrap', require('./bootstrap'));

router.get('/zbox', function (req, res) {
    markdown.code(res,'zbox','./public/docs/zbox/readme.md');
});

module.exports = router;