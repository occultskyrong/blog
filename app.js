/**
 * Created by zrz on 2016/9/30.
 * @version 1.0.0 created
 */

"use strict";

// 加载modules
var express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , session = require("express-session")
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , RedisStore = require('connect-redis')(session)
    ;

// 声明全局变量
global.blog = require('./service/global');
global.markdown = require('./service/markdown');

// 配置
var config = require('./config')();

//创建项目实例
var app = express();
app.set('views', path.join(__dirname, 'views'));//定义前端模板的路径
app.set('view engine', 'ejs');//定义前端模板
if (blog.ENV === "development") {//开发环境关闭模板缓存
    app.set('view cache', false);
} else {//生产环境开启模板缓存
    app.set('view cache', true);
}
app.use(favicon(__dirname + '/public/favicon.ico'));//定义icon图标
app.use(bodyParser.json({limit: '50mb'}));//定义数据解析器为json并设置解析器最大值，即Content-Type → application/json
app.use(bodyParser.urlencoded({extended: true}));//定义url编码方式
app.use(cookieParser());//定义cookie解析器
app.use(express.static(path.join(__dirname, 'public')));//定义静态文件目录

// 加载路由控制及拦截
app.use('/', require('./routes'));

//设置session
app.use(session({//连接redis
    store: new RedisStore(config["redis"]),
    resave: false,
    saveUninitialized: true,
    secret: blog.NAME
}));


//启动项目，监听30012端口
app.listen(config['port'] || 3000, config['host'] || 'localhost', function () {
    blog.log('blog - 项目启动 ,  当前环境:' + blog.ENV + ',  监听host:' + config['host'] + ',  监听端口:' + config['port']);
});