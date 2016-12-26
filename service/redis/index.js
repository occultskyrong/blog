/**
 * Created by zrz on 2016/12/25.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created 操作redis
 */

"use strict";

global.blog={ENV : 'test',eLog:function () {
    console.info(arguments[0])
}};

let redis = require('redis');
let config = require('../../config').redis;

/**
 * 通用回调
 * @param err       错误
 * @param reply     返回值
 */
let call=function (err,reply) {
    if(err){
        blog.eLog(err);
    }else{

    }
};
console.info(config)

class Client {
    constructor() {
        let client= redis.createClient(
            config.port
            , config.host
            , {
                db: config.db
                , ttl: config.ttl
            });
        client.on('error',function () {
            console.error(arguments)
        });
        this.client=client;
    }
    get(key,callback){
        this.client.get(key,call);
    }
}

module.exports = Client;

let client = new Client().client;

client.set('a',1,function () {
    console.info(arguments)
});
client.get('a',function () {
    console.info(arguments)
});