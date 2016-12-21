/**
 * Created by wangj on 2016/12/16.
 */

/**
 * 简洁表达法
 * 支持直接写入变量和函数
 * @type {string}
 */
var foo = 'bar';
var baz = {foo}; //{foo: "bar"}

function f(x, y) {
    return {x, y};
}
//等价于
function f(x, y) {
    return {x: x, y: y};
}

var o = {
    method() {
        return "hello";
    }
};
//等价于
var o = {
    method: function() {
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
var obj = {
    [propkey]: true,
    ['a' + 'bc']: 123,
    ['h' + 'ello']() {
        return 'hi';
    }
};

