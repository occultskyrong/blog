/**
 * Created by zrz on 2016/12/25.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created 操作redis
 */

"use strict";

let redis = require('redis');
let config = require('../../config').redis;

class Client {
    constructor() {
        let client = redis.createClient(
            config.port
            , config.host
            , {
                db: config.db
                , ttl: config.ttl
            });
        client.on('error', function (err) {
            blog.eLog(err);
        });
        this.client = client;
    }
}

module.exports = Client;
