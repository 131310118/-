"use strict";

var _obj;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by wangj on 2016/12/16.
 */

/**
 * 简洁表达法
 * 支持直接写入变量和函数
 * @type {string}
 */
var foo = 'bar';
var baz = { foo: foo }; //{foo: "bar"}

function f(x, y) {
    return { x: x, y: y };
}
//等价于
function f(x, y) {
    return { x: x, y: y };
}

var o = {
    method: function method() {
        return "hello";
    }
};
//等价于
var o = {
    method: function method() {
        return "hello";
    }
};

/**
 * 属性名表达式
 * 字面量定义对象时，属性可以为变量
 * 方法名可用表达式
 * 不可与简洁表达法同时使用
 * @type {string}
 */
var propKey = 'foo';
var obj = (_obj = {}, _defineProperty(_obj, propkey, true), _defineProperty(_obj, 'a' + 'bc', 123), _defineProperty(_obj, 'h' + 'ello', function () {
    return 'hi';
}), _obj);

//# sourceMappingURL=object-compiled.js.map