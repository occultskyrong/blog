/**
 * Created by zrz on 2016/9/30.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router()
    , cheerio = require('cheerio');

router.get('/', function (req, res) {
    var _md = markdown.marked('./readme.md')
        , _table = '';
    // 将其中的table拆出
    var getTable = function () {
        var _tArr = _md.split('<table>');
        var isArr = function () {
            return _tArr && _tArr instanceof Array && _tArr.length > 1;
        };
        if (isArr()) {
            _tArr = _tArr[1].split('</table>');
            if (isArr()) {
                var $ = cheerio.load('<table class="table table-hover table-bordered table-condensed">'
                    + _tArr[0] + '</table>');
                (function ($trs) {
                    for (var t in $trs) {
                        if ($trs.hasOwnProperty(t) && !!t && parseInt(t) > 0) {
                            var $tr = $trs.eq(t)
                                , pro = parseFloat($tr.find('td').eq(2).text())
                                , _uri = 'https://github.com/occultskyrong/blog/tree/master/'
                                , $tda = $tr.find('td').eq(0).find('a');
                            if (pro === 100) {
                                $tr.addClass('success');
                                $tda.attr('href', $tda.attr('href').replace(/\.\/public/g, ''));
                            } else {
                                $tda.attr('href', $tda.attr('href').replace(/\.\//g, _uri));
                                if (pro === 0) {
                                    $tr.addClass('warning');
                                } else {
                                    $tr.addClass('info');
                                }
                            }
                        }
                    }
                }($('tr')));
                _table = $.html();
            }
        }
        return _table;
    };
    return res.render('./home/view', {
        title: '首页 - blog'
        , table: getTable()
    });
});

router.get('/history', function (req, res) {
    return res.render('./history/view', {
        title: '更新日志'
        , history: JSON.parse(require('fs').readFileSync('./public/static/history.json', 'utf8'))
    });
});

module.exports = router;