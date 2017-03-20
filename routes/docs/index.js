/**
 * Created by zrz on 2016/9/30.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

// docs - 首页
router.use('/home', require('./home'));

router.use('/Bootstrap', require('./Bootstrap'));

router.use('/elastic_stack', require('./elastic_stack'));

router.get('/jekyll/Installation', function (req, res) {
    markdown.render(res, null, 'jekyll-installation', './public/docs/jekyll/Installation.md');
});

router.get('/zbox/*', function (req, res) {
    markdown.code(res, 'zbox', './public/docs/zbox/readme.md');
});

// 所有没配置的md文档
router.get('/*', function (req, res) {
    markdown.render(res, null, '文档内容', './public' + req.originalUrl + '.md');
});

module.exports = router;