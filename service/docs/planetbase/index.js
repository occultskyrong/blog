/**
 * Created by zhangrz on 16/10/1.
 */

"use strict";

var fs = require('fs')
    , xml2js = require('xml2js');

var parser = new xml2js.Parser()    //xml - json
    , builder = new xml2js.Builder();  //json - xml

// 起始数
var _startNumber = new Date().getTime().toString().substr(5,8) //资源起始值
    , _robotNumber = new Date().getTime().toString().substr(5,8);//机器人起始值

// 文档存储位置
var savesPath = '/Users/zhangrz/Documents/Planetbase/Saves';

// 需要新增的资源明细
var newResources = {
    Metal: 1
    , Bioplastic: 1
    , Meal: 1
};

// 需要新增的机器人明细
var newRobot = {
    Carrier: 5 //搬运型
    , Constructor: 5 //建设型
    , Driller: 5 //挖矿型
};

// 机器人 类
var Robot = function (position, type, i) {
    var name = function (type) {
        switch (type) {
            case 'Carrier':
                return 'CR-' + i;
            case 'Constructor':
                return 'CT-' + i;
            case 'Driller':
                return 'DR-' + i;
        }
    };
    return {
        "$": {"type": "Bot"},
        "position": [{"$": position}],
        "orientation": [{"$": {"x": "0", "y": "148.2625", "z": "0"}}], //面朝方向?
        "location": [{"$": {"value": "1"}}],
        "name": [{"$": {"value": name(type)}}],
        "specialization": [{"$": {"value": type}}],
        "status-flags": [{"$": {"value": "0"}}],
        "state": [{"$": {"value": "3"}}],
        "id": [{"$": {"value": _robotNumber++ + ""}}],
        "wander-time": [{"$": {"value": "421.1197"}}],
        "Condition": [{"$": {"value": "1"}}],//机械性能,可修复
        "Integrity": [{"$": {"value": "1"}}],//完整性
        "integrity-decay-rate": [{"$": {"value": "200000"}}] //寿命
    };
};

// 资源类
var Resource = function (position, type) {
    return {
        "$": {"type": type},
        "id": [{"$": {"value": _startNumber++ + ''}}],
        "trader-id": [{"$": {"value": "-1"}}],
        "position": [{"$": position}],
        "orientation": [{"$": {"x": "0", "y": "0", "z": "0"}}],
        "state": [{"$": {"value": "1"}}],
        "location": [{"$": {"value": "0"}}],
        "subtype": [{"$": {"value": "0"}}],
        "condition": [{"$": {"value": "1"}}],
        "durability": [{"$": {"value": "1"}}]
    };
};

// 获取最后一个存档
var getFileIndex = function (list) {
    var max = 0;
    for (var l in list) {
        if (list.hasOwnProperty(l)) {
            var ll = list[l]
                , ls = ll.split('save'); //切分文件名
            if (ls.length > 1) {
                var lia = ls[1].split('.sav');
                if (lia[0] > 0 && !lia[1]) {
                    var li = lia[0];
                    max = li > max ? li : max;
                }
            }
        }
    }
    return max;
};

// copy存档,备份防止修改存档出问题
var copyFileSync = function (filePath) {
    fs.readFile(filePath, 'utf8', function (error, file) {
        if (error) {
            console.error('-----    读取文档失败    -----');
            console.error(error);
        } else {
            fs.writeFile(filePath + '.bak', file, 'utf8', function (error, result) {
                if (error) {
                    console.error('-----    复制存档失败    -----');
                    console.error(error);
                } else {
                    console.info(arguments)
                }
            });
        }
    });
};

// 获取value
var getValue = function (obj, key) {
    var value = '';
    if (key in obj && obj[key]) {
        var arr = obj[key];
        if (arr && arr instanceof Array && arr.length > 0) {
            if ('$' in arr[0] && 'value' in arr[0]['$']) {
                value = arr[0]['$']['value'];
            }
        }
    }
    return value;
};

// 寻找仓库坐标
var getLocation = function (source) {
    var location = [];
    if ('save-game' in source && 'constructions' in source['save-game']) {
        var constructions = source['save-game']['constructions'];
        if (constructions instanceof Array && constructions.length > 0) {
            var construction = constructions[0]['construction'];
            //遍历建筑物
            for (var c in construction) {
                if (construction.hasOwnProperty(c)) {
                    var cons = construction[c];
                    var moduleType = getValue(cons, 'module-type');//获取建筑物类型
                    if (moduleType === 'ModuleTypeStorage') {//判断仓库
                        if ('position' in cons && '$' in cons['position'][0]) {
                            var position = cons['position'][0]['$'];
                            console.info('----- 仓库坐标:', position);
                            console.info('  ----- 仓库中资源:\n');
                            getStorageResources(cons['resource-storage'][0]['slot']);
                            location.push(position);
                        }
                    }
                }
            }
        }
    }
    return location;

    // 获取仓库中商品信息
    function getStorageResources(srs) {
        if (srs instanceof Array && srs.length > 0) {
            for (var s in srs) {
                if (srs.hasOwnProperty(s)) {
                    var sr = srs[s];
                    console.info(s, '\n      ----- 位置:', sr['position']);
                    console.info('      ----- 最高:', sr['max-height']);
                    console.info('      ----- 类型:', sr['resource'][0]['$']['type'], '\n');
                    // console.info('      ----- 内容:',sr['resource']);
                }
            }
        }
    }
};

// 修改里程碑
var setMilestones = function () {
    return [{
        "milestone": [
            {"$": {"value": "MilestoneSurvival"}}
            , {"$": {"value": "MilestoneSelfSufficiency"}}
            , {"$": {"value": "MilestoneExpansion"}}
            , {"$": {"value": "MilestoneStanding"}}
            , {"$": {"value": "MilestoneRobotization"}}
            , {"$": {"value": "MilestonePowerMonger"}}
            , {"$": {"value": "MilestoneTechnocracy"}}
            , {"$": {"value": "MilestoneCentury"}}
            , {"$": {"value": "MilestoneMegalomania"}}
            , {"$": {"value": "MilestoneConsolidation"}}
        ]
    }];
};

// 修改已拥有技术
var setTech = function () {
    return [{
        "tech": [
            {'$': {value: 'TechColossalPanel'}}
            , {'$': {value: 'TechGoliathTurbine'}}
            , {'$': {value: 'TechConstructorBot'}}
            , {'$': {value: 'TechGmTomatoes'}}
            , {'$': {value: 'TechGmOnions'}}
            , {'$': {value: 'TechMassiveStorage'}}
            , {'$': {value: 'TechDrillerBot'}}
            , {'$': {value: 'TechFarmDome'}}
            , {'$': {value: 'TechSuperExtractor'}}
            , {'$': {value: 'TechMegaCollector'}}
        ]
    }]
};

// 生成机器人列表
var setRobot = function (position) {
    var _ = [];
    if (newRobot) {
        for (var n in newRobot) {
            if (newRobot.hasOwnProperty(n)) {
                var newRN = newRobot[n];
                if (newRN > 0) {
                    for (var i = 1; i <= newRN; i++) {
                        _.push(new Robot(position, n, i));
                    }
                }
            }
        }
    }
    return _;
};

// 增加机器人
var addRobot = function (save) {
    if ('save-game' in save && 'characters' in save['save-game']) {
        var char = save['save-game']['characters'];
        if (char && char instanceof Array && char.length > 0) {
            if ('character' in char[0]) {
                var act = char[0]['character'];
                if (act && act instanceof Array && act.length > 0) {
                    for (var a in act) {
                        if (act.hasOwnProperty(a)) {
                            var ac = act[a]
                                , type = ac['$']['type']
                                , position = ac['position'][0]['$'];
                            if (type === 'Bot') {//找到第一个机器人的坐标
                                var newBots = setRobot(position);
                                act = act.concat(newBots);
                                char[0]['character'] = act;
                                console.info('  ----- 修改后机器人+人类数量:', act.length);
                                return char;
                            }
                        }
                    }
                } else {//没有机器人时,需要指定一个坐标放置机器人

                }
            }
        }
    }
};

// 生成资源列表
var setResources = function () {

};

// 重写资源参数
var resetResource = function (source, callback) {
    var position = getLocation(source);//获取仓库坐标,以放置物品\
    if ('save-game' in source && 'resources' in source['save-game']) {
        var resources = source['save-game']['resources'];
        //野外资源
        if (resources && resources instanceof Array && resources.length > 0) {
            if ('resource' in resources[0]) {//存在野外资源
                var resource = resources[0]['resource'];
                for (var r in resource) {
                    if (resource.hasOwnProperty(r)) {
                        var res = resource[r]
                            , type = res['$']['type']
                            , position = res['position'];
                        console.info(type, res['id'], position)
                    }
                }
            } else {//不存在则创建
                resources[0]['resource'] = [];
            }
        }
    }
};

// 重写存档
var resetSaveFile = function (callback) {
    // 读取文件列表
    fs.readdir(savesPath, function (error, list) {
        //最后一个文档的路径
        var lastSaveFilePath = savesPath + '/save' + getFileIndex(list) + '.sav';
        // 不再备份存档,直接存储到另一个文档
        // copyFileSync(lastSaveFilePath);
        // 读取最后一个存档
        fs.readFile(lastSaveFilePath, 'utf8', function (error, xml) {
            if (error) {
                callback(error, null);
            } else {
                parser.parseString(xml, function (error, result) {
                    if (error) {
                        callback(error, null);
                    } else {
                        //todo 修改里程碑
                        // fixme 修改的里程碑,不计入总的里程碑数量
                        // result['save-game']['milestones'] = setMilestones();
                        //todo 修改技术
                        // result['save-game']['techs'] = setTech();
                        //todo 增加机器人
                        result['save-game']['characters'] = addRobot(result);
                        // resetResource(result);//重写资源
                        //todo 将重写后资源覆盖到原存档json
                        //todo 将覆盖后存档json转换为xml
                        var j2x = builder.buildObject(result);
                        //todo 将xml覆盖回原存档文件
                        fs.writeFile(lastSaveFilePath + '.change', j2x, 'utf8', function (error, data) {
                            if (error) {
                                callback(error, null);
                            } else {
                                callback(null, data);
                            }
                        });
                    }
                });
            }
        });
    });
};

resetSaveFile(function (error, data) {
    console.error(error);
    console.info(data);
});
