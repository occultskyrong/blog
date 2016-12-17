/**
 * Created by zrz on 2016/12/16.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created file system 文件系统的操作方法
 */

"use strict";

var fs = require('fs')
    , moment = require('moment')
    , pathModule = require('path')
    , path = function (__) {
    return pathModule.join(__dirname, __);
};

var blog = require('../global')

var Utils = {
    // 文件大小的计算
    size: function (size) {
        if (size > 1024) {
            if (size > 1024 * 1024) {
                return parseFloat(size / 1024 / 1024).toFixed(2) + 'mb';
            } else {
                return parseFloat(size / 1024).toFixed(2) + 'kb';
            }
        } else {
            return size + "b";
        }
    }
};

module.exports = {
    // 深度优先遍历
    getFileList: function (_path) {
        var _ = {}                              // 返回结果集
            , _format = function (t) {          // 时间格式化函数
                return moment(t).format(blog._TIME_FORMAT)
            }
            ;

        // 文件类
        var File = function (p, fn) {
            this.size =Utils.size(p.size);
            this.createAt = _format(p.birthtime);
            this.updateAt = _format(p.ctime);
            this.type = 'File';
            this.name = fn;
        };

        // 文件夹类
        var Dir = function (d) {
            this.createAt = _format(p.birthtime);
            this.updateAt = _format(p.ctime);
            this.type='Folder';
            this.name=fn;
        };

        // 过滤ignore文件
        var isIgnore = function (fName) {
            return fName !== '.DS_Store';// 过滤mac库文件
        };
        // 递归 - 读取 - 文件夹列表
        var rds = function (__path) {        // 读取文件夹路径
            // 读取根文件夹中列表
            var fl = fs.readdirSync(path(__path))
                , _fs = []       // 返回结果集
                ;
            for (var f = 0, l = fl.length; f < l; f++) {
                var fn = fl[f]; // 文件、文件夹名称
                if (isIgnore(fn)) {
                    var __ = __path + '/' + fn
                        , _stat = fs.lstatSync(path(__))
                        ;
                    // 如果是文件夹,则继续深入
                    if (_stat.isDirectory()) {
                        rds(__);
                    } else if (_stat.isFile()) {// 文件,则返回文件类
                        console.info(__)
                        _fs.push(new File(_stat, fn));
                    }
                }
            }
            return _fs;
        };
        // 深度优先读取文件列表
        rds(_path);
        //TODO 判断文件夹或文件
        //TODO 组织结构
        //TODO
        return _;
    }
};