/**
 * Created by zrz on 2016/12/8.
 * @version 1.0.0 created
 */

"use strict";

var clockCanvas = require('../_plugin/_clock.canvas');

$(function () {
    setInterval(function () {
        clockCanvas.canvasDraw();
    },1000);
});