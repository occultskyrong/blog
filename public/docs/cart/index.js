/**
 * Created by zrz on 2017/4/20.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
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

    // 获取该商品价格
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
}

// 活动 - 对象
class Activity {
    constructor(activity_id) {
        this.activity_id = activity_id;
    }

    // 写入商品
    setGood(good) {
        if (good in this) {
            this.good.push(good);
        } else {
            this.good = [];
        }
    }

    // 获取商品列表
    getGood() {
        return this.good;
    }
}

// 订单 - 满赠活动 - 对象
class OrderFullGiftActivity extends Activity {
    constructor(activity_id) {
        super(activity_id);
    }
}

// 商品 - 满减活动 - 对象
class FullCutActivity {
    constructor(activity_id) {
        super(activity_id);
    }

    // todo 阶梯满减活动：100-3,200-10
    // todo 等额满减活动：每满
}

// 商品 - 满赠活动 - 对象
class FullGiftActivity {
    constructor(activity_id) {
        super(activity_id);
    }
}

// 商品 - 套装 - 对象
class Suit {
    constructor(good_id) {
        this.good_id = good_id;
    }
}

// 商品 - 尾货 - 对象
class Poop {
    constructor(good_id) {
        this.good_id = good_id;
    }
}

// 商品 - 不可优惠 - 对象
class NoDiscount {
    constructor(good_id) {
        this.good_id = good_id;
    }
}

// 商品 - 普通 - 对象
class NormalGood {
    constructor(good_id) {
        this.good_id = good_id;
    }
}