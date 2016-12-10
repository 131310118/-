/**
 * 变量的解构赋值
 * Created by wangj on 2016/12/9.
 */

/**
 * 数组的结构赋值
 * @type {number[]}
 */
let [a, b, c] = [1, 2, 3];

let[foo, [[bar], baz]] = [1, [[2], 3]];
//foo=1, bar=2, baz=3

let [,,third] = ["foo", "bar", "baz"];
//third="baz"

let [x, , y] = [1, 2, 3];
//x=1, y=3

let [head, ...tail] = [1, 2, 3, 4];
//head=1, tail = [2, 3, 4]

let [d, e, ...f] = ['a'];
//d="a", e=undefined, f=[]

let [g, h, i] = new Set(['a', 'b', 'c']);
//g==a

/**
 * 允许指定默认值
 * @type {boolean}
 */
let [fo = true] = [];
//fo=true

/**
 * 只有undefined，默认值才生效
 */
[x, y = 'b'] = ['a', undefined];
//x='a', y='b'

[x, y = 'b'] = ['a', null];
//x='a', y=null

/**
 * 对象的解构赋值
 * 对象的属性没有次序，所以变量必须与属性同名
 * @type {{foo: string, bar: string}}
 */
var {fon, bax, bby} = {bax: 'bbb', fon: 'aaa', byb: 'ccc'};
//fon='aaa', bax='bbb', bby=undefined

/**
 * 如果变量名与属性名不一致需要自定义
 * @type {{first: string, last: string}}
 */
var {first: ft, last: l} = {first: 'hello', last: 'world'};

/**
 * 指定默认值，原理同数组
 * @type {number}
 */
var {first: next = 3} = {};

/**
 * 技巧1
 * 直接将Math的对数、正弦、余弦三个方法赋值，方便
 * @type {Math}
 */
let {log, sin, cos} = Math;

/**
 * 技巧二
 * 获取数组对应值
 * @type {number[]}
 */
var arr = [1, 2, 3];
var {0: first, [arr.length - 1]: last} = arr;

/**
 * 字符串的解构赋值
 * @type {string}
 */
var [aa, bb, cc, dd, ee] = 'hello';
//aa='h', bb='e', cc='l', dd='l', ee='o'

/**
 * 数值和布尔型的解构赋值
 * 先转为对象
 * @type {number}
 */
var {toString: s} = 123;
s === Number.prototype.toString; //true

var {toString: s} = true;
s === Boolean.prototype.toStirng; //true

/**
 * 前者表示move参数是一个对象，并对这个对象解构，赋值给x、y，解构失败x,y等于默认值
 * 后者表示move参数是一个对象，并对这个对象解构，赋值给x、y，解构失败x,y等于默认对象的解构
 * @param x
 * @param y
 * @returns {*[]}
 */
function move({x = 0, y = 0} = {}) {
    return [x, y];
}
move({x: 3, y: 8}); //[3,8]
move({x: 3}); //[3,0]
move(); //[0,0]

function move({x, y} = {x: 0, y: 0}) {
    return [x, y];
}
move({x: 3, y: 8}); //[3,8]
move({x: 3}); //[3, undefined]
move(); //[0,0]

/**
 * 技巧四
 * 交换变量的值
 */
[x, y] = [y, x];