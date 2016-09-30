/**
 * Created by zrz on 2016/9/29.
 * @version 1.0.0 created
 */

"use strict";

var moment = require('moment');

var packageConfig = require('../../package.json');

module.exports = {
    ENV: process.env.NODE_ENV || "development"      //全局变量
    , NAME: packageConfig['name']                   //项目名称
    , FORMAT: 'YYYY-MM-DD HH:mm:ss SSS'             //标准时间格式化参数
    /**
     * 组装记录器的头部时间标记
     * @param t     tag,日志类型标记
     * @param d     date,日志时间
     * @returns {string}
     */
    , mom: function (t, d) {
        return '[' + (d ? d : moment().format(this.FORMAT) + '] [') + (t ? t : 'LOG') + ']  -   ';
    }
    /**
     * 日志记录器，代替log4js
     * @param m     日志信息
     * @param t     日志标记，默认为LOG
     */
    , log: function (m, t) {
        var _ = this.mom(t) + m;
        console.info(_)
    }
    , info: function () {
        console.info(arguments[0])
    }
    /**
     * 错误日志记录器
     * @param m             错误信息
     * @param s             错误状态
     * @returns {Error}     返回一个Error类
     */
    , error: function (m, s) {
        var _ = new Error(m);
        s = s || -1;//-1为未知错误
        _.status = s;
        _.timestamp = new Date().getTime();//错误时间戳
        var __ = this.mom('ERROR') + 'status:' + s + '    message:' + m;
        console.error(__);
        return _;
    }
};