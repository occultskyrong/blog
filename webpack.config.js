/**
 * Created by zrz on 2016/05/14.
 * @version 1.0.0 created
 */

'use strict';

var {resolve} = require("path")
    , BASE_URI = './public/javascript/'
    ;

module.exports = {
    entry: {    //输入文件
        "home": BASE_URI + "home/index"
    },
    output: {//输出文件
        path: resolve(__dirname, "./public/src"),//主目录
        filename: '/[name].blog.min.js'
    },
    resolve: {//自动识别的扩展名
        extensions: ['.js']
    },
    module: {//引用的组件
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    },
    plugins: []
};