/**
 * Created by zrz on 2016/12/15.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

var router = require('express').Router();

// 搜索实现的简单说明
router.get('/search', function (req, res) {
    markdown.render(res, null, '搜索实现的简单说明', './public/docs/Elastic_Stack/search.md');
});

module.exports = router;