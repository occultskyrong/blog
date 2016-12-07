/**
 * Created by zrz on 2016/12/7.
 * @version 1.0.0 created
 */

"use strict";

var HEIGHT = 200, WIDTH = 200;  //画布元素的宽高，单位:px

// 圆、计算集
var Circle = {
    CCP: {x: WIDTH / 2, y: HEIGHT / 2}              // circleCenterPoint  圆心 - 位置
    , CCR: WIDTH / 100                              // circleCenterRadius 圆心(实心圆) - 半径
    , CCC: '#000'                                   // circleCenterColor  圆心 - 颜色\

    , CM: WIDTH / 20                                // cirqueMargin         圆环 - 外边框外补
    , CLL: WIDTH / 40                               // cirqueLineLength     圆环 - 短线长度
    , CNP: WIDTH / 50                               // cirqueNumberPadding  圆环 - 数字距圆环的内补
    , CC: '#000'                                    // cirqueColor          圆环 - 颜色

    , rads: function (x) {                          // 工具函数，用于将角度转换为弧度
        return Math.PI * x / 180;
    }
};

// 时钟表盘
var Clock = (function () {
    var canvasDraw = function () {
        var $cv = document.getElementById('clock_canvas')           // canvas的元素
            , c = $cv.getContext('2d')                        // 获取2D绘制上下文
            , _cp = Circle.CCP
            , _cr = WIDTH / 2 - Circle.CM           // cirqueRadius  圆环 - 半径
            ;

        // 绘制圆心(实心圆)
        var center = function () {
            c.fillStyle = Circle.CCC;       // 路径填充的颜色
            // 以cp为圆心，cr为半径，从0°到360°顺时针旋转画圆
            c.arc(_cp.x, _cp.y, Circle.CCR, 0, Circle.rads(360), false);
            c.fill();                       // 填充曲线内封闭区间
        };
        // 绘制圆环(表盘外框)
        var circle = function () {
            c.moveTo(_cp.x + _cr, _cp.y);           // 移动起始点到圆环上，否则会画出一条半径线
            c.strokeStyle = Circle.CC;              // 圆环边框颜色
            // 顺时针绘制圆环
            c.arc(_cp.x, _cp.y, _cr, 0, Circle.rads(360), false);
            c.stroke();                             // 绘制圆环边框
        };
        // 绘制数字(表盘时刻点)和短线(时刻线)
        var time = function () {
            // 每隔30°放置一个时刻点数字(1-12)
            // var _st = 1, _et = 12;
            c.moveTo(_cp.x, _cp.y - _cr); // 移动起始点到圆环的12点位置
            c.lineTo(_cp.x, _cp.y);
            c.stroke();
            // for (var t = _st; t <= _et; t++) {  // todo 此处需要想下每个时刻点的位置如何用循环实现
            //     console.info(t)
            // 整体画布逆时针旋转30°
            c.translate(_cp.x, _cp.y);
            c.moveTo(0,0);
            c.lineTo(_cr,0);
            c.rotate(Circle.rads(60));
            c.stroke();
            // c.translate(-_cp.x, -_cp.y);
            // c.restore();
            // }
        };
        // 绘制指针(表针:时分秒)
        var clockwise = function () {

        };
        (function () {
            c.beginPath();                  // 开始新路径
            center();
            circle();
            time();
            clockwise();
            c.closePath();                  // 关闭路径
        }());
    };
    return {
        canvas: canvasDraw
    };
}());
