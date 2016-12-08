/**
 * Created by zrz on 2016/12/7.
 * @version 1.0.0 created
 */

"use strict";

var HEIGHT = 150, WIDTH = 150;  // 画布元素的宽高，单位:px

// 圆、计算集
var Circle = {
    CCP: {x: WIDTH / 2, y: HEIGHT / 2}              // circleCenterPoint  圆心 - 位置
    , CCR: WIDTH / 100                              // circleCenterRadius 圆心(实心圆) - 半径
    , CCC: '#000'                                   // circleCenterColor  圆心 - 颜色

    , CM: WIDTH / 20                                // cirqueMargin         圆环 - 外边框外补
    , CLL: WIDTH / 40                               // cirqueLineLength     圆环 - 短线长度
    , CNP: WIDTH / 50                               // cirqueNumberPadding  圆环 - 数字距圆环的内补
    , CC: '#000'                                    // cirqueColor          圆环 - 颜色

    , _hour: WIDTH / 4                             // clockWiseHour        指针 - 时
    , _minute: WIDTH / 3                           // clockWiseMinute      指针 - 分
    , _second: WIDTH / 2.5                            // clockWiseSecond      指针 - 秒

    , rads: function (x) {                          // 工具函数，用于将角度转换为弧度
        return Math.PI * x / 180;
    }
};

// 时钟表盘
var canvasDraw = function () {
    var now = new Date()
        , nowT = new Date().getTime();
    var $cv = document.getElementById('clock_canvas')     // canvas的元素
        , c = $cv.getContext('2d')                        // 获取2D绘制上下文
        , _cp = Circle.CCP
        , _cr = WIDTH / 2 - Circle.CM                     // cirqueRadius  圆环 - 半径
        ;

    // 绘制圆心(实心圆)
    var center = function () {
        c.fillStyle = Circle.CCC;               // 路径填充的颜色
        // 以cp为圆心，cr为半径，从0°到360°顺时针旋转画圆
        c.arc(_cp.x, _cp.y, Circle.CCR, 0, Circle.rads(360), false);
        c.fill();                               // 填充曲线内封闭区间
    };
    // 绘制圆环(表盘外框)
    var circle = function () {
        c.moveTo(_cp.x + _cr, _cp.y);           // 移动起始点到圆环上，否则会画出一条半径线
        c.strokeStyle = Circle.CC;              // 圆环边框颜色
        // 顺时针绘制圆环
        c.arc(_cp.x, _cp.y, _cr, 0, Circle.rads(360), false);
    };
    // 绘制数字(表盘时刻点)和短线(时刻线)
    var time = function () {
        // 每隔30°放置一个时刻点数字(1-12)
        var _st = 1
            , _et = 60
            , _cnp = Circle.CNP             // 刻度线的长度
            ;
        c.save();                           // 保存当前状态
        c.translate(_cp.x, _cp.y);          // 旋转中心点在圆心
        // todo 此处需要想下每个时刻点的位置如何用循环实现
        for (var t = _st; t <= _et; t++) {
            c.rotate(Circle.rads(6));       // 旋转6°
            c.moveTo(0, -_cr);              // 移动起始点到圆环的12点位置
            if (t % 5 === 0) {              // 如果是整刻度，则为时刻点，线加长
                c.lineTo(0, _cnp * 2 - _cr);
            } else {
                c.lineTo(0, _cnp - _cr);
            }
        }
        c.restore();                        // 回退到旋转前状态
    };
    // 绘制指针(表针:时分秒)
    var clockwise = function () {
        // 获取当前时刻点，时分秒
        var line = {              // 时刻线当前角度
            _hour: {t: (nowT / 1000 / 60 / 60 % 12 + 8) * 30, w: WIDTH / 40}
            , _minute: {t: nowT / 1000 / 60 % 60 * 6, w: WIDTH / 60}
            , _second: {t: now.getSeconds() * 6, w: WIDTH / 200}
        };
        for (var l in line) {
            if (line.hasOwnProperty(l)) {
                c.save();
                c.translate(_cp.x, _cp.y);              // 旋转中心点在圆心
                c.rotate(Circle.rads(line[l].t));       // 旋转时针
                c.moveTo(0, Circle[l] / 4);             // 移动起始点到圆点
                c.lineWidth = line[l].w;                // 线宽度
                c.lineTo(0, -Circle[l]);                // 依长度画线
                c.stroke();
                c.restore();
            }
        }
    };
    (function () {
        c.clearRect(0, 0, WIDTH, HEIGHT);   // 清空当前canvas区域
        c.beginPath();                      // 开始新路径
        clockwise();
        center();
        circle();
        time();
        c.stroke();
    }());
};

exports.canvasDraw = canvasDraw;