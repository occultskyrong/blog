/**
 * Created by zrz on 2016/9/30.
 * @version 1.0.0 created
 */

"use strict";

var markdown = require('markdown').markdown
    , marked = require('marked') // https://github.com/chjj/marked
    , fs = require('fs');

module.exports = {
    // 获取静态资源地址
    source: function (file) {
        var fArr = file.split('./public');
        return fArr && fArr instanceof Array && fArr.length > 1 && fArr[1] || fArr;
    }
    /**
     * markdown转html，并render到页面
     * @param res       response，返回体
     * @param ejs       ejs地址
     * @param title     标题
     * @param file      file地址
     * @param option    markdown配置
     * @returns {*|String}
     */
    , render: function (res, ejs, title, file, option) {
        if (option) {// 设置配置信息
            marked.setOptions(option);
        }
        var _markdown = marked(fs.readFileSync(file, 'utf-8'));
        ejs = ejs ? ejs : './docs/_base/_template';
        return res.render(ejs, {
            title: title
            , markdown: _markdown
            , source: this.source(file)
        });
    }
    // markdown转pre，纯代码文档
    , code: function (res, title, file) {
        return res.render('./docs/_base/_code', {
            title: title
            , code: fs.readFileSync(file, 'utf-8')
            , source: this.source(file)
        });
    }
    // markdown转html
    , marked: function (file, option) {
        if (option) {// 设置配置信息
            marked.setOptions(option);
        }
        return marked(fs.readFileSync(file, 'utf-8'))
    }
};
