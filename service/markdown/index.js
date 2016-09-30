/**
 * Created by zrz on 2016/9/30.
 * @version 1.0.0 created
 */

"use strict";

var markdown = require('markdown').markdown
    , fs = require('fs');

module.exports = {
    // 获取静态资源地址
    source:function (file) {
        return file.split('./public')[1];
    }
    // markdown转html
    ,render: function (res, ejs, title, file) {
        ejs = ejs ? ejs : './docs/_base/_template';
        return res.render(ejs, {
            title: title
            , markdown: markdown.toHTML(fs.readFileSync(file, 'utf8'))
            , source: this.source(file)
        });
    }
    // markdown转pre，纯代码文档
    , code: function (res, title, file) {
        return res.render('./docs/_base/_code', {
            title: title
            , code: fs.readFileSync(file, 'utf8')
            , source: this.source(file)
        });
    }
};