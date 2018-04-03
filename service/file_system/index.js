/**
 * Created by zrz on 2016/12/16.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created file system 文件系统的操作方法
 */

"use strict";

/* globals blog */

const fs = require('fs')
    , moment = require('moment')
    , pathModule = require('path')
    , path = (__)=>pathModule.join(__dirname, __);

const Utils = {
    // 文件大小的计算
    size: function (size) {
        if (size > 1024) {
            if (size > 1024 * 1024) {
                return parseFloat(size / 1024 / 1024).toFixed(2) + 'mb';
            } else {
                return parseFloat(size / 1024).toFixed(2) + 'kb';
            }
        } else {
            return size ? size + "b" : 0;
        }
    }
    // 时间格式化函数
    , format: function (t) {
        return moment(t).format(blog._TIME_FORMAT);
    }
    // 根据文件扩展名
    , ext: function (fName) {
        var _ea = fName.split('.');
        if (_ea && _ea.length > 0) {
            var _eName = _ea[_ea.length - 1];
            switch (_eName) {
                case 'js':
                    return 'JavaScript';
                case 'md':
                    return 'Markdown';
                default :
                    return '-_-! 鬼知道是什么文件';
            }
        } else {
            return '未知类型';
        }
    }
};

module.exports = {
    // 深度优先遍历
    getFileList: function (_path) {
        // 文件类
        var File = function (p, fn, __) {
            this.size = Utils.size(p.size);
            this.createAt = Utils.format(p.birthtime);
            this.updateAt = Utils.format(p.ctime);
            this.target = 'File';
            this.type = Utils.ext(fn);
            this.name = fn;
            this.path = __;
        };

        // 文件夹类
        var Dir = function (d, dn, child) {
            this.createAt = Utils.format(d.birthtime);
            this.updateAt = Utils.format(d.ctime);
            this.target = 'Folder';
            this.name = dn;
            this.child = child;
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
                        _fs.push(new Dir(_stat, fn, rds(__)));
                    } else if (_stat.isFile()) {// 文件,则返回文件类
                        _fs.push(new File(_stat, fn, __));
                    }
                }
            }
            return _fs;
        };
        // 深度优先读取文件列表
        return rds(_path);
    }
    // 转换 - 文档列表结构 - 到 - table结构
    , list2Table: function (fileList) {
        /**
         * 生成tr的attribute属性值
         * @param pid           parent_id，父元素的id
         * @param index         索引号
         */
        var trAtt = function (pid, index) {
            return 'data-tt-id="' + (pid ? pid + '-' + index : index) + '"' +
                (pid ? ' data-tt-parent-id="' + pid + '"' : '');
        };

        /**
         * 生成 table/tr
         * @param list          当前深度列表
         * @param parent_id     父元素id
         * @returns {string}
         */
        var setT = function (list, parent_id) {
            parent_id = parent_id || '';
            var str = '';
            for (var l = 0, len = list.length; l < len; l++) {
                var ll = list[l];
                if (ll.target === 'File') { // 当标记为文件时
                    // 获取文件地址；若为md文档，直接查看对应的页面
                    var _aArr = ll.path.split('../../public')[1]
                        , _a = ll.type == 'Markdown' ? _aArr.split('.md')[0] : _aArr;
                    str += '<tr ' + trAtt(parent_id, 1 + l) + '>' +
                        '<td><span class="file">' +
                        '<a href="' + _a + '">' + ll.name + '</a>' +
                        '</span></td>' +
                        '<td>' + ll.createAt + '</td>' +
                        '<td>' + ll.updateAt + '</td>' +
                        '<td>' + ll.type + '</td>' +
                        '<td>' + ll.size + '</td>' +
                        '</tr>';
                } else if (ll.target === 'Folder') {
                    str += '<tr ' + trAtt(parent_id, 1 + l) + '>' +
                        '<td><span class="folder">' + ll.name + '</span></td>' +
                        '<td>' + ll.createAt + '</td>' +
                        '<td>' + ll.updateAt + '</td>' +
                        '<td>' + ll.target + '</td>' +
                        '<td>-</td>' +
                        '</tr>';
                    str += setT(ll.child, parent_id ? parent_id + '-' + (1 + l) : (1 + l));
                }
            }
            return str;
        };
        return setT(fileList);
    }
};
