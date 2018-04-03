/**
 * Created by zrz on 2016/12/17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

"use strict";

var fs = require('./index');

global.blog=require('../global');

console.info(fs.list2Table(fs.getFileList('../../public/docs')));
