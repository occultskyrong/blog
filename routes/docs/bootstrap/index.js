/**
 * Created by zrz on 2016/9/30.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

// bootstrap - 概述
router.get('/overview', function (req, res) {
    markdown.render(res, null, 'BootStrap - 概述', './public/docs/Bootstrap/0-overview.md');
});

module.exports = router;