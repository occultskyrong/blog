/**
 * Created by zrz on 2016/12/6.
 * @version 1.0.0 created
 */

"use strict";

// 增加dom
(function () {
    // 添加dom
    var _rsd = document.createElement('ul')
    // 添加css
        , _css = ['border:1px #f00 dashed', 'padding:2px', 'margin:2px'
        , 'min-height:1em', 'min-width:10em'
        , 'position:fixed', 'top:50px', 'left:50px'];
    _rsd.setAttribute('id', 'assert_results');
    _rsd.setAttribute('style', _css.join(';'));
    document.body.appendChild(_rsd);

    /**
     * 页面打印 - 断言
     * @param con 条件
     * @param msg      断言内容
     */
    console.p = function (con, msg) {
        var li = document.createElement('li');
        msg =msg?typeof msg === 'string' ? msg : JSON.stringify(msg):'--';
        li.style = 'color:' + (con ? 'green' : 'red') + ';';
        li.appendChild(document.createTextNode(msg));
        document.getElementById('assert_results').appendChild(li);
    };
}());
