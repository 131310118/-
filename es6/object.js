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

/**
 * 函数的name属性，返回函数名
 * 取值存值函数会在方法名前加get或者set
 * Function构造函数，返回“anonymous”
 * bind方法构造的函数，返回“bound”加上原函数名
 * @type {{firstName}}
 */
var person = {
    sayName() {
        console.log(this.name);
    },
    get firstName() {
        return "Bob"
    }
};
person.sayName.name;// "sayName"
person.firstName.name; //"get firstName"

(new Function()).name;//anonymous
person.sayName.bind().name;//"bound sayName"

/**
 * Object.is
 * 判断相等，类似于===
 * 不同处如下
 */
+0 === -0; //true
NaN === NaN; //false

Object.is(+0, -0);//false
Object.is(NaN, NaN);//true

/**
 * Object.assign
 * 对象合并，将源对象可枚举属性复制到目标对象，同属性会覆盖
 * 非可枚举对象不会产生效果
 * 只拷贝源对象自身属性，不考虑继承属性
 * 浅拷贝，如果源对象某个属性的值是对象，那么得到这个对象的引用
 * 可以用来处理数组，但是会把数组视为对象，返回数组
 * @type {{a: number, b: number}}
 */
var target = {a: 1, b: 1};
var source1 = {b: 2, c: 2};
var source2 = {c: 3};
Object.assign(target, source1, source2);
target; //{a: 1, b: 2, c: 3}

var v1 = 'abc';
var v2 = true;
var v3 = 10;

var obj = Object.assign({}, v1, v2, v3);
console.log(obj); //{"0": "a", "1": "b", "2": "c"};

Object.assign([1, 2, 3], [4, 5]); //[4, 5, 3]

/**
 * 技巧1
 * 克隆对象（不能克隆继承的值）
 * @param origin
 * @returns {*}
 */
function clone(origin) {
    return Object.assign({}, origin);
}

/**
 * 技巧二
 * 克隆对象，并保持继承链
 * @param origin
 * @returns {*}
 */
function clone(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(originProto, origin);
}

const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
};

/**
 * 技巧三
 * 为属性指定默认值
 * @param options
 */
function processContent(options) {
    options = Object.assign({}, DEFAULTS, options)
}

/**
 * Object.getOwnPropertyDescriptor
 * 获取属性的描述对象
 * @type {{foo: number}}
 */
var obj = {foo: 123};
Object.getOwnPropertyDescriptor(obj, 'foo');
//{
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//}

/**
 * 对象遍历
 * @type {{}}
 */
var obj = {};
for(var key in obj) {}//可枚举，包含继承
Object.keys(obj);//可枚举，不包含继承
Object.getOwnPropertyNames(obj);//包含不可枚举
Object.getOwnPropertySymbols(obj);//所有Symbol属性
Reflect.ownKeys(obj);//所有属性，包含不可枚举和Symbol属性
//遍历次序规则
//首先按照数字排序
//其次按照字符串生成时间
//最后按照Symbol生成时间

/**
 * Object.setPrototypeOf(obj, proto)
 * 设置原型对象
 * @type {{y: number, z: number}}
 */
var proto = {
    y: 20,
    z: 40
};
var obj = {x: 10};
Object.setPrototypeOf(obj, proto);
obj.y;//20

/**
 * Object.getPrototypeOf(obj)
 * 读取对象的prototype对象
 */
Object.getPrototypeOf(obj) === proto; //true

/**
 * keys,values,entries
 */
Object.keys(obj); //["x"]
Object.values(obj); //[10]
Object.entries(); //[["x", 10]]