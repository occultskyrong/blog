/**
 * Created by zrz on 2016/05/14.
 * @version 1.0.0 created
 */

'use strict';

var webpack = require('webpack')
    , path = require("path")
    , ExtractTextPlugin = require("extract-text-webpack-plugin")
    , BaseUrl = './public/javascript/'
    ;

module.exports = {
    entry: {    //输入文件
        "home": BaseUrl + "home/index"
    },
    output: {//输出文件
        path: path.join(__dirname, "./public/src"),//主目录
        filename: '/[name].blog.min.js'
    },
    resolve: {//自动识别的扩展名
        extensions: ['', '.js', '.css', '.json']
    },
    module: {//引用的组件
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    plugins: [//引用插件
        new webpack.optimize.UglifyJsPlugin({minimize: true})//配置压缩css的插件
        , new ExtractTextPlugin("/css/[name].blog.min.css")
    ]
};