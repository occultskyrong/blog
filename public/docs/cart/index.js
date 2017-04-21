/**
 * Created by zrz on 2017/4/20.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

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
class FullCutActivity extends Activity{
    constructor(activity_id) {
        super(activity_id);
    }

    // todo 阶梯满减活动：100-3,200-10
    // todo 等额满减活动：每满
}

// 商品 - 满赠活动 - 对象
class FullGiftActivity extends Activity{
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