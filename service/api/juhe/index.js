/**
 * Created by zhangrz on 16/10/12.
 */

"use strict";

var request = require('request');

var _Key = require('../../../config/key').api.juhe.key
    , _BaseUri = 'http://web.juhe.cn:8080' // 基础通信URL
    ;

module.exports = {
    get: function (url, callback) {
        var _url = _BaseUri + url + '&key=' + _Key;
        request({
            method: 'GET'
            , header: {'Content-Type': 'application/json; charset=UTF-8'}
            , url: encodeURI(_url)  //使用unicode编码解决中文乱码问题
            , json: true //返回值为json格式
        }, function (error, res, body) {
            callback(error, body);
        });
    }
    , post: function (url, data, callback) {
        var _url = _BaseUri + url;
        data['key'] = _Key;
        request({
            method: 'POST'
            , header: {'Content-Type': 'application/json; charset=UTF-8'}
            , url: encodeURI(_url)  //使用unicode编码解决中文乱码问题
            , form: data
            , json: true
        }, function (error, res, body) {
            callback(error, body);
        });
    }
};
