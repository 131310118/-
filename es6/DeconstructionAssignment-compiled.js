"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * 变量的解构赋值
 * Created by wangj on 2016/12/9.
 */

/**
 * 数组的结构赋值
 * @type {number[]}
 */
var a = 1,
    b = 2,
    c = 3;
var foo = 1,
    bar = 2,
    baz = 3;
//foo=1, bar=2, baz=3

var _ref = ["foo", "bar", "baz"],
    third = _ref[2];
//third="baz"

var _ref2 = [1, 2, 3],
    x = _ref2[0],
    y = _ref2[2];
//x=1, y=3

var head = 1,
    tail = [2, 3, 4];
//head=1, tail = [2, 3, 4]

var _ref3 = ['a'],
    d = _ref3[0],
    e = _ref3[1],
    f = _ref3.slice(2);
//d="a", e=undefined, f=[]

var _ref4 = new Set(['a', 'b', 'c']),
    _ref5 = _slicedToArray(_ref4, 3),
    g = _ref5[0],
    h = _ref5[1],
    i = _ref5[2];
//g==a

/**
 * 允许指定默认值
 * @type {boolean}
 */


var _ref6 = [],
    _ref6$ = _ref6[0],
    fo = _ref6$ === undefined ? true : _ref6$;
//fo=true

/**
 * 只有undefined，默认值才生效
 */

//x='a', y='b'

x = 'a';
var _undefined = undefined;
y = _undefined === undefined ? 'b' : _undefined;

//x='a', y=null

/**
 * 对象的解构赋值
 * 对象的属性没有次序，所以变量必须与属性同名
 * @type {{foo: string, bar: string}}
 */
x = 'a';
var _ref7 = null;
y = _ref7 === undefined ? 'b' : _ref7;
var _bax$fon$byb = { bax: 'bbb', fon: 'aaa', byb: 'ccc' },
    fon = _bax$fon$byb.fon,
    bax = _bax$fon$byb.bax,
    bby = _bax$fon$byb.bby;
//fon='aaa', bax='bbb', bby=undefined

/**
 * 如果变量名与属性名不一致需要自定义
 * @type {{first: string, last: string}}
 */

var _first$last = { first: 'hello', last: 'world' },
    ft = _first$last.first,
    l = _first$last.last;

/**
 * 指定默认值，原理同数组
 * @type {number}
 */

var _ref8 = {},
    _ref8$first = _ref8.first,
    next = _ref8$first === undefined ? 3 : _ref8$first;

/**
 * 技巧1
 * 直接将Math的对数、正弦、余弦三个方法赋值，方便
 * @type {Math}
 */

var log = Math.log,
    sin = Math.sin,
    cos = Math.cos;

/**
 * 技巧二
 * 获取数组对应值
 * @type {number[]}
 */

var arr = [1, 2, 3];
var first = arr[0],
    last = arr[arr.length - 1];

/**
 * 字符串的解构赋值
 * @type {string}
 */

var _hello = 'hello',
    _hello2 = _slicedToArray(_hello, 5),
    aa = _hello2[0],
    bb = _hello2[1],
    cc = _hello2[2],
    dd = _hello2[3],
    ee = _hello2[4];
//aa='h', bb='e', cc='l', dd='l', ee='o'

/**
 * 数值和布尔型的解构赋值
 * 先转为对象
 * @type {number}
 */


var _ = 123,
    s = _.toString;

s === Number.prototype.toString; //true

var _true = true,
    s = _true.toString;

s === Boolean.prototype.toStirng; //true

/**
 * 前者表示move参数是一个对象，并对这个对象解构，赋值给x、y，解构失败x,y等于默认值
 * 后者表示move参数是一个对象，并对这个对象解构，赋值给x、y，解构失败x,y等于默认对象的解构
 * @param x
 * @param y
 * @returns {*[]}
 */
function move() {
  var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref9$x = _ref9.x,
      x = _ref9$x === undefined ? 0 : _ref9$x,
      _ref9$y = _ref9.y,
      y = _ref9$y === undefined ? 0 : _ref9$y;

  return [x, y];
}
move({ x: 3, y: 8 }); //[3,8]
move({ x: 3 }); //[3,0]
move(); //[0,0]

function move() {
  var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 },
      x = _ref10.x,
      y = _ref10.y;

  return [x, y];
}
move({ x: 3, y: 8 }); //[3,8]
move({ x: 3 }); //[3, undefined]
move(); //[0,0]

/**
 * 技巧四
 * 交换变量的值
 */
var _ref11 = [y, x];
x = _ref11[0];
y = _ref11[1];
_ref11;

//# sourceMappingURL=DeconstructionAssignment-compiled.js.map