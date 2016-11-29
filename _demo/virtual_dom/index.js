/**
 * Created by zrz on 2016/11/29.
 * @version 1.0.0 created
 */

"use strict";

/* globals svd */

// 模拟商品数据
var GOODS = {
    229: {
        "gid": 229,
        "name": "统一阿萨姆奶茶 500ml*15瓶/箱",
        "price": 45,
        "dadou": 50,
        "quantity": 1

    },
    146513: {
        "gid": 146513,
        "name": "【买10赠1】加多宝凉茶250ml*18盒/箱",
        "price": 275,
        "dadou": 0,
        "quantity": 1
    }
};

var el = svd.el;                // 创建虚拟元素
// var diff = svd.diff;            // 比对区别
// var patch = svd.patch;          // 更新不同，打补丁

var Root, Tree;// Dom树和虚拟树

// 价格计算
var Calc = (function () {
// 合计价格数据
    var _Sum = {price: 0};
    // 合计金额
    var sum = function (p) {
        _Sum.price = parseFloat(_Sum.price) + p;
    };
    // 总计价格的重置
    var reset = function () {
        _Sum.price = 0;
    };
    // 金额条显示
    var render = function () {
        return el('div', {
            class: 'col-sm-12',
            style: 'text-align:right;'
        }, ['合计金额 ¥' + _Sum.price + ' 元']);
    };
    // 获取商品价格
    var getPrice = function (g) {
        return g.price;
    };
    // 计算商品小计价格
    var getGS = function (g) {
        return g.quantity * getPrice(g);
    };
    return {
        sum: sum
        , getPrice: getPrice
        , render: render
        , reset: reset
        , getGS: getGS
    };
}());

// Dom操作
var Dom = (function () {
    // 拼装商品
    var setGood = function (good) {
        return el('div', {class: 'col-sm-12 form-group good-group', 'data-gid': good.gid}, [
            el('div', {class: 'col-sm-5'}, [good.name])
            , el('div', {class: 'col-sm-2'}, ['¥' + Calc.getPrice(good)])
            , el('div', {class: 'col-sm-3 input-group'}, [
                el('div', {class: 'input-group-addon good-sub'}, ['-'])
                , el('input', {
                    class: 'form-control good-quantity',
                    type: 'text',
                    value: good.quantity,
                    style: 'width:3em;'
                })
                , el('div', {class: 'input-group-addon good-add'}, ['+'])
            ])
            , el('div', {class: 'col-sm-2'}, ['¥' + Calc.getGS(good)])
        ]);
    };
    // 拼装商品列表
    var setGoodsList = function () {
        var _gld = [];//商品列表dom数组
        for (var g in GOODS) {
            if (GOODS.hasOwnProperty(g)) {
                var good = GOODS[g];
                if (good.quantity > 0) {
                    Calc.sum(good.quantity * Calc.getPrice(good));
                    _gld.push(setGood(good));
                }
            }
        }
        _gld.push(Calc.render());
        return el('div', {
            class: 'col-sm-12 form-inline',
            style: 'margin:10px;border:1px #f00 dashed;padding:10px;'
        }, _gld);
    };
    return {
        set: setGoodsList
    };
}());

// 侦听
var Listener = (function () {

    // 内容拼接
    var container = function () {
        if (Tree) {                                     // 虚拟树存在则更新补丁
            var newTree = Dom.set()                     // 生成新的虚拟树
                , patches = svd.diff(Tree, newTree);    // 与已有虚拟树对比
            svd.patch(Root, patches);                   // 打补丁到原有Dom树中
            Tree = newTree;                             // 更新虚拟树
        } else { // 无dom时构造
            Tree = Dom.set();               // 构造虚拟树
            Root = Tree.render();           // 将虚拟树构造为Dom树
            $('#cart_content').html(Root);  // 将Dom树写入html
        }
    };

    // 事件侦听
    var setListener = function () {
        var changeQuantity = function ($e, qua) {
            var good = GOODS[$e.data('gid')];
            good.quantity = parseInt(good.quantity) + qua;
            Calc.reset();
            container();
        };
        $('#cart_content')
            .on('click', '.good-add', function () {// 增加数量
                changeQuantity($(this).parents('.good-group'), 1);
            })
            .on('click', '.good-sub', function () {// 减少数量
                changeQuantity($(this).parents('.good-group'), -1);
            });
    };
    // 初始化
    var init = function () {
        container();
        setListener();
    };

    return {
        init: init
    };
}());

$(function () {
    Listener.init();
});
