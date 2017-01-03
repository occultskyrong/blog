/**
 * Created by zrz on 2016/12/26.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

/**
 * 汉明距离
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance1 = function (x, y) {
    let _x = x.toString(2)
        , _y = y.toString(2)
        , count = 0, max, min, mii = 0
        ;
    // 获取大小数
    if (_x.length > _y.length) {
        max = _x;
        min = _y;
    } else {
        min = _x;
        max = _y;
    }
    // 重遍历比对区别
    for (let s = 0, len = max.length; s < len; s++) {
        let sma = max.substr(s, 1);
        // 该位置有小数序
        if (len - s <= min.length) {
            if (sma != min.substr(mii++, 1)) {
                count++;
            }
        } else if (sma == 1) {// 该位置大数为1
            count++;
        }
    }
    return count;
};


// 终极解决方案
var hammingDistance2 = function (x, y) {
    return (x ^ y).toString(2).replace(/0/g, '').length;
};

var hammingDistance = (x, y)=> {
    console.info(hammingDistance2(x, y));
};

hammingDistance(1, 3);
hammingDistance(4, 14);
hammingDistance(93, 73);