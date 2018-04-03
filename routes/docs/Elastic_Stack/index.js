/**
 * Created by zrz on 2016/12/15.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

"use strict";

const router = require('express').Router()
    , DOCS_URI = './public/docs/elastic_stack/elasticsearch/';

// 搜索实现的简单说明
router.get('/search', function (req, res) {
    markdown.render(res, null, '搜索实现的简单说明', './public/docs/elastic_stack/search.md');
});

// ES - 官方文档 - 翻译&优化阅读 - 文档目录
router.get('/menu', (req, res)=>
    markdown.render(res, null, '官方文档 - 翻译&优化阅读', DOCS_URI + 'menu.md')
);

// ES - 相关官方文档
router.get('/official/*', (req, res)=> {
    const URI = req.url;
    let doc_uri = URI.split('/official');                   // 获取url地址
    doc_uri = doc_uri.length > 0 ? doc_uri[1] : 'menu';     // 获取拆分后的url地址
    markdown.render(res, null, 'ElasticSearch - Node Type', DOCS_URI + doc_uri + '.md');
});

module.exports = router;
