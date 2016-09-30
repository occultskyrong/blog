/**
 * Created by zrz on 2016/6/29.
 * @version 1.0.0 created log4j日志记录器
 */

"use strict";

module.exports = {
    development: {
        appenders: [{
            type: "console"
        }, {
            type: "clustered"
            , appenders: [{
                "type": "dateFile",
                "filename": "./logs/http/http.log",//请求日志
                "pattern": "-yyyy-MM-dd",
                "category": "http"
            }, {
                "type": "file",
                "filename": "./logs/app.log",//运行日志
                "maxLogSize": 10485760,
                "numBackups": 3
            }, {
                "type": "logLevelFilter",
                "level": "ERROR",
                "appender": {
                    "type": "file",
                    "filename": "./logs/errors.log"//错误日志
                }
            }]
        }]
    },production: {
        appenders: [{
            type: "console"
        }, {
            type: "clustered"
            , appenders: [{
                "type": "dateFile",
                "filename": "./logs/http/http.log",//请求日志
                "pattern": "-yyyy-MM-dd",
                "category": "http"
            }, {
                "type": "file",
                "filename": "./logs/app.log",//运行日志
                "maxLogSize": 10485760,
                "numBackups": 3
            }, {
                "type": "logLevelFilter",
                "level": "ERROR",
                "appender": {
                    "type": "file",
                    "filename": "./logs/errors.log"//错误日志
                }
            }]
        }]
    }
};