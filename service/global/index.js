/**
 * Created by zrz on 2016/9/29.
 * @version 1.0.0 created
 */

"use strict";

var moment = require('moment');

var log4js = require('../log4j')
    , logger = log4js.Logger
    , packageConfig = require('../../package.json');

module.exports = {
    ENV: process.env.NODE_ENV || "development"      //全局变量
    , NAME: packageConfig['name']                   //项目名称
    , VERSION: packageConfig['version']             //项目版本
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
     * 请求记录器，用于拦截路由请求
     */
    , http: function () {
        logger('http').info(arguments[0]);
    }
    /**
     * 日志记录器，用于记录日志
     * @param m     日志信息
     * @param t     日志标记，默认为LOG
     */
    , log: function (m, t) {
        logger(t ? t : 'log').info(typeof m == 'string' ? m : JSON.stringify(m));
    }
    /**
     * 错误日志记录器
     * @param err           错误信息
     * @param req           请求体
     * @param status        错误状态码
     * @returns {Error}     返回一个Error类
     */
    , error: function (err, req, status) {
        var _ = new Error(err.message || '暂无错误说明');
        if (req && 'method' in req && 'originalUrl' in req) {
            _['method'] = req.method;
            _['url'] = req.originalUrl;
        }
        'stack' in err ? _['stack'] = err['stack'] : 0;
        _['status'] = 'status' in err ? err['status'] : status || -1;
        _['msg'] = 'message' in _ && _['message'] || '';
        log4js.log4js.getLogger('ERROR').error(JSON.stringify(_));
        return _;
    }
};