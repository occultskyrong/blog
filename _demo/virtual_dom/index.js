/**
 * Created by zrz on 2016/11/29.
 * @version 1.0.0 created
 */

"use strict";

/* globals svd */

// 模拟商品数据
var GOODS = {
    229: {
        gid: 229
        , name: "统一阿萨姆奶茶 500ml*15瓶/箱"
        , price: 45
        , dadou: 0
        , left: 10
        , quantity: 1
        , activity: {
            aid: 1
            , baseLine: 100
            , off: 10
        }
    },
    133470: {
        gid: 133470
        , name: "洽洽山核桃味瓜子108g/袋"
        , price: 22
        , dadou: 0
        , left: 4
        , quantity: 1
        , activity: {
            aid: 2
            , baseLine: 55
            , off: 20
        }
    },
    157704: {
        gid: 157704
        , name: "山果印象蓝莓味1L*6瓶/箱"
        , price: 70
        , dadou: 0
        , left: 3
        , quantity: 2
        , activity: {
            aid: 1
            , baseLine: 100
            , off: 10
        }
    },
    146513: {
        gid: 146513
        , name: "【买10赠1】加多宝凉茶250ml*18盒/箱"
        , price: 275
        , dadou: 50
        , left: 20
        , quantity: 1
        , activity: null
    }
};

var el = svd.el;                // 创建虚拟元素
// var diff = svd.diff;            // 比对区别
// var patch = svd.patch;          // 更新不同，打补丁

var Root, Tree;// Dom树和虚拟树


// 价格计算
var Calc = (function () {
    // 合计价格数据
    var _;

    // 总计价格的重置
    var reset = function () {
        _ = {
            sum: 0,       // 商品总价
            activity: 0,    // 活动减价
            dd: 0        // 商品达豆总价
        };
    };
    // 金额条显示
    var render = function () {
        return el('div', {
            class: 'col-sm-12',
            style: 'text-align:right;'
        }, ['合计金额 ¥' + _.price + ' 元']);
    };
    // 获取商品价格
    var getPrice = function (g) {
        return g.price;
    };
    return {
        getPrice: getPrice
        , render: render
        , reset: reset
        , _: _
    };
}());

// 商品类
var Good = function (g) {
    var _ = Calc._;
    this.price = Calc.getPrice(g);
    this.sum = g.quantity * this.price;
    this.dd = 'dadou' in g && g.dadou || 0;
    // 合计价格、达豆
    _.sum = parseFloat(_.sum) + this.sum;
    _.dd = parseInt(_.dd) + this.dd;
};

// Dom操作
var Dom = (function () {

    // 活动列表
    var _activityList = {};

    // 拼装商品
    var setGood = function (good) {
        var _opt = {class: 'col-sm-12 form-group good-group', 'data-gid': good.gid}
            , _g = new Good(good);
        if (good.quantity <= 0) {
            _opt['style'] = 'display:none;';
        }
        return el('div', _opt, [
            el('div', {class: 'col-sm-5'}, [good.name])
            , el('div', {class: 'col-sm-2'}, ['¥' + _g.price] + (_g.dd ? ' ( ' + _g.dd + '达豆 ) ' : ''))
            , el('div', {class: 'col-sm-3 input-group'}, [
                el('div', {class: 'input-group-addon good-sub', 'data-gid': good.gid}, ['-'])
                , el('input', {
                    class: 'form-control good-quantity',
                    type: 'text',
                    value: good.quantity,
                    style: 'width:3em;'
                })
                , el('div', {class: 'input-group-addon good-add'}, ['+'])
            ])
            , el('div', {class: 'col-sm-2'}, ['¥' + _g.price])
        ]);
    };
    // 拼装活动信息
    var setActivity = function (act) {

    };
    // 拼装商品列表
    var setList = function () {
        var _gld = [];//商品列表dom数组
        for (var g in GOODS) {
            if (GOODS.hasOwnProperty(g)) {
                var good = GOODS[g];
                // if (good.quantity > 0) {
                _gld.push(setGood(good));
                // }
            }
        }
        _gld.push(Calc.render());
        return el('div', {
            class: 'col-sm-12 form-inline',
            style: 'margin:10px;border:1px #f00 dashed;padding:10px;'
        }, _gld);
    };
    return {
        set: setList
    };
}());

// 侦听
var Listener = (function () {

    // 内容拼接
    var container = function () {
        if (Tree) {                                 // 虚拟树存在则更新补丁
            var newTree = Dom.set()                     // 生成新的虚拟树
                , patches = svd.diff(Tree, newTree);    // 与已有虚拟树对比
            svd.patch(Root, patches);                   // 打补丁到原有Dom树中
            Tree = newTree;                             // 更新虚拟树
        } else {                                    // 无dom时构造
            Tree = Dom.set();                           // 构造虚拟树
            Root = Tree.render();                       // 将虚拟树构造为Dom树
            $('#cart_content').html(Root);              // 将Dom树写入html
        }
    };

    // 事件侦听
    var setListener = function () {
        var changeQuantity = function (e, qua) {
            var gid = $(e).parents('.good-group').data('gid')
                , good = GOODS[gid];
            good.quantity = parseInt(good.quantity) + qua;
            Calc.reset();
            container();
        };
        $('#cart_content')
            .on('click', '.good-add', function () {// 增加数量
                changeQuantity($(this), 1);
            })
            .on('click', '.good-sub', function () {// 减少数量
                changeQuantity($(this), -1);
            });
    };
    // 初始化
    var init = function () {
        Calc.reset();
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
