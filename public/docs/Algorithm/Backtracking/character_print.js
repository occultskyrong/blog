/**
 * Created by zrz on 2016/12/6.
 * @version 1.0.0 created
 */

"use strict";

// var array=['a','b','c','d','e','f','g','h','i','j','k','l'];
var array = ['a', 'b', 'c', 'd', 'e'];

var LEN = 3;

var track = [];

var print = function (t) {
    console.info(t.join(','));
};

/**
 * 先用二叉树表示下思路，实际就是深度优先遍历二叉树
 *
 * 发现有效分支的终止条件为 a d e ? ，此时缺少第4个子节点，即已有分支节点和剩余节点数量小于4
 * 每次循环的条件为 还有子节点可以分配
 */


function run(array, track) {
    if (array.length + track.length < LEN) {
        return false;
    } else {
        while (array.length > 0) {
            track.push(array.shift());// 将第一个字符扔进队列
            if (track.length < LEN) {
                run(array.slice(0), track.slice(0));// 进行下一步
            } else if (track.length == LEN) {
                print(track);
            }
            track.pop();// 回归上一个字母
        }
    }
    return false;
}

run(array, track);