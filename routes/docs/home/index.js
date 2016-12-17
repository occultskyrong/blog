/**
 * Created by zrz on 2016/12/16.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

var router = require('express').Router()
    ;

var file_system_service = require('../../../service/file_system');

// docs - 首页
router.get('/', function (req, res) {
    res.render('./docs/home/view', {
        title: '文档列表'
        , fileList: file_system_service
            .list2Table(file_system_service
                .getFileList('../../public/docs'))
    });
});

module.exports = router;