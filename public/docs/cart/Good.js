/**
 * Created by zrz on 2017/4/21.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

"use strict";

const Mall = {
    VIP_GRADE: 3        // 用户会员等级
};

// 商品 - 对象
class Good {
    constructor(good_id) {
        this.good_id = good_id;
    }

    // 初始化 - 赋值
    init(good) {
        this.dadou = parseInt(good.dadou);                  // 赠豆
        this.onSale = parseInt(good.onSale);                // 售卖状态
        // 计算商品价格
        this.setPrice(good);
        this.price = this.getPrice();
    }

    // 写入价格相关数据
    setPrice(good) {
        this.belongsVip = parseInt(good.belongsVip);        // 会员商品
        this.price = parseFloat(good.price);                // 价格
        this.yjPrice = parseFloat(good.yjPrice);            // 原价
        this.vipPrice = parseFloat(good.vipPrice);          // 会员价格
    }

    // 获取 - 商品销售价格
    getPrice() {
        let _price = 0;
        if (this.onSale === 1) { // 正常销售
            if (this.belongsVip === 0) { // 促销
                _price = this.price;
            } else if (this.belongsVip > 0) { // 会员
                if (Mall.VIP_GRADE >= this.belongsVip) { // 会员等级大于商品需要的会员等级
                    _price = this.vipPrice;
                } else {
                    _price = this.yjPrice;
                }
            }
        } else {
            _price = this.price;
        }
        return _price;
    }

    // 调整商品数量

    // 刷新Dom
    toDom() {

    }
}

module.exports = Good;
