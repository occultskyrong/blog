/**
 * Created by zrz on 2016/9/29.
 * @version 1.0.0 created
 */

"use strict";

var _ = {
    development: {
        port: 3000
        , host: 'localhost'
        , redis: {
            "host": "192.168.1.101",
            "port": 6379,
            "db": 6,
            "ttl": 86000
        }
    }
    , production: {
        port: 80
        , host: '45.124.67.111'
        , redis: {
            "host": "localhost",
            "port": 6379,
            "db": 6,
            "ttl": 86000
        }
    }
};

// 根据环境获取配置
module.exports = function () {
    return _[blog.ENV];
};