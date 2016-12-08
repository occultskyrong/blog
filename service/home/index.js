/**
 * Created by zrz on 2016/12/7.
 * @version 1.0.0 created
 */

"use strict";

var cheerio = require('cheerio')
    , fs = require('fs');

var CHARACTER_ENCODING = 'utf8'
    , GIT_HUB_URL = 'https://github.com/occultskyrong/blog/tree/master/';

module.exports = {
    // 将其中的开坑列表拆出
    history: function () {
        var _md = markdown.marked('./README.md') // Linux大小写敏感
            , _table = ''
            , _tArr = _md.split('<table>')
            , isArr = function () { // 切分table的html字符串
            return _tArr && _tArr instanceof Array && _tArr.length > 1;
        };
        if (isArr()) {
            _tArr = _tArr[1].split('</table>');
            if (isArr()) {
                var $ = cheerio.load('<table class="table table-hover' +
                    ' table-bordered table-condensed mg-0">' + _tArr[0] + '</table>');
                // 重写tr内容
                (function ($trs) {
                    for (var t in $trs) {
                        if ($trs.hasOwnProperty(t) && !!t && parseInt(t) > 0) {// 从第2行开始
                            var $tr = $trs.eq(t)
                                , pro = parseFloat($tr.find('td').eq(2).text())     // 开坑进度
                                , $tda = $tr.find('td').eq(0).find('a');            // 链接元素
                            if (pro === 100) {
                                $tr.addClass('success');
                                $tda.attr('href', $tda.attr('href').replace(/\.\/public/g, ''));
                            } else if (pro >= 0) {
                                $tda.attr('href', $tda.attr('href').replace(/\.\//g, GIT_HUB_URL));
                                if (pro === 0) {
                                    $tr.addClass('warning');
                                } else {
                                    $tr.addClass('info');
                                }
                            } else {
                                $tda.attr('href', '##');
                                $tr.addClass('danger');
                            }
                            $tda.attr('target', '_blank');
                        }
                    }
                    $trs.eq(0).addClass('bg-primary');// 第1行为thead
                }($('tr')));
                _table = $.html();
            }
        }
        return _table;
    }
    // 返回demo列表
    , demo: function () {
        var str = '<ul>'
            , menu = fs.readdirSync('./_demo', CHARACTER_ENCODING);
        if (menu && menu instanceof Array && menu.length > 0) {
            for (var m = 0, l = menu.length; m < l; m++) {
                var mm = menu[m];
                if (mm !== 'README.md') {// 排除README文件
                    var _fUrl = '../../_demo' + '/' + mm + '/package.json'
                        , con = require(_fUrl);
                    str += '<li><a href="/demo/' + mm + '/index.html">' + con.name + '</a></li>';
                }
            }
        }
        return str + '</ul>';
    }
};
