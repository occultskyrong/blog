/**
 * Created by zrz on 2016/12/20.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

// ES5 类的写法
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return '(' + this.x + ',' + this.y + ')';
};

var point = new Point(1, 2);

console.info(point, point.toString());

// 另一种写法
var Person = function (name, sex) {
    this.name = name;
    this.sex = sex;
    this.toString = function () {
        return 'name:' + this.name + ';sex:' + this.sex;
    };
};

var person = new Person('张三', '男');

console.info(person, person.toString());


// ES6 写法
class Student {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }

    toString() {
        return 'name:' + this.name + ',year:' + this.year;
    }
}

console.info(typeof Student);
console.info(Student === Student.prototype.constructor);

var student = new Student('李四', 12);

console.info(student, student.toString());


