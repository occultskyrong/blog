/**
 * Created by zrz on 2016/12/28.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

"use strict";

/**
 * @param {number} num
 * @return {number[]}
 */
var countBits1 = function (num) {
    let _ = [];
    for (let i = 0; i <= num; i++) {
        _.push(i.toString(2).replace(/0/g, '').length);
    }
    return _;
};

let countBits2 = function (num) {
    let _ = [];
    let g = (n)=> {
        return n?n.toString(2).replace(/0/g, '').length:0;
    };
    let calc = function (n) {
        if (n < num) {
            _.push(g(n++));
            calc(n);
        } else {
            _.push(g(n));
            return false;
        }
    };
    calc(0);
    return _;
};

let countBits = (num)=> {
    console.info(countBits2(num));
};

countBits(5);
