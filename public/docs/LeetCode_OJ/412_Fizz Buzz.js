/**
 * Created by zrz on 2016/12/29.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

"use strict";
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
    let _ = [];
    for (let i = 1; i <= n; i++) {
        let __ = '';
        __ += i % 3 === 0 ? 'Fizz' : '';
        __ += i % 5 === 0 ? 'Buzz' : '';
        if (!__) {
            __ += i;
        }
        _.push(__);
    }
    return _;
};

console.info(fizzBuzz(15));
