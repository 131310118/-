'use strict';

/**
 * let
 * 作用块内有效
 * @type {Array}
 */
var a = [];

var _loop = function _loop(i) {
  a[i] = function () {
    console.log(i);
  };
};

for (var i = 0; i < 10; i++) {
  _loop(i);
}
a[6]();

/**
 * 不存在变量提升
 */
console.log(foo); //undefined
console.log(bar); //报错ReferenceError

var foo = 2;
var bar = 2;

/**
 * 暂时性死区
 * @type {number}
 */
/*var tmp = 123;

if(true) {
    tmp = 'abc';//ReferenceError
    let tmp;
}*/

/**
 * 不允许重复声明
 * 以下全部报错
 */
/*{
    let a = 10;
    var a = 1;
}

{
    let a = 10;
    let a = 1;
}*/

/**
 * 块级作用域
 */
(function () {
  var tmp = '';
})();

{
  var tmp = '';
}

/**
 * 块级作用域可以声明函数
 * 类似于let，块级作用域外不可访问
 */
{
  var f = function f() {};
}

/**
 * 块级作用域允许声明函数只有在使用大括号的情况下成立
 */
// 不报错
if (true) {
  var _f = function _f() {};
}

// 报错
/*
if (true)
    function f() {}*/

/**
 * 提案，未实现
 * 获取块级作用域结果
 */
/*
let x = do {
    let t = 1;
    t * t + 1;
};
*/

/**
 * const只读常量，一旦声明不能改变
 * @type {number}
 */
var PI = 3.1415;

/*PI = 3;
TypeError: Asignment to constant variable.*/

/**
 * const的作用域和let命令相同，只在声明所在的块级作用域内有效
 */
{
  var MAX = 5;
}

/*MAX
Uncaught ReferenceError: MAX is not defined*/

/**
 * 不提升，暂时性死区
 */
/*{
    console.log(MAX);//ReferenceError
    const MAX = 5;
}*/

/**
 * 不可重复声明
 * 下面报错
 * @type {string}
 */
/*var message = 'Hello';
const message = 'Goodbye';*/

/**
 * const常量定义复合类型时指向数据所在的地址
 * 仅仅保证指向的地址不变，并不保证地址的数据不变
 * @type {Array}
 */
var array = [];
array.push('hello');
array.length = 0;
//array = ['Dave'];报错

/**
 * 冻结对象，无法添加新属性，无法获取对象属性
 */
Object.freeze(array);

/**
 * let\const\class声明的全局变量不属于顶层对象属性
 * @type {number}
 */
var b = 1;
window.b; //1

var c = 1;
window.c; //undefined

//# sourceMappingURL=let_const-compiled.js.map