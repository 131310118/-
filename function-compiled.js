'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Created by wangj on 2016/12/16.
 */

/**
 * 函数可以自带默认值
 * 默认值应该在参数末尾定义
 * 阅读代码明确哪些参数可以省略
 * @param x
 * @param y
 */
function log(x) {
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'world';

  console.log(x, y);
}
log('hello'); // hello world
log('hello', 'china'); //hello china
log('hello', ''); //hello

/**
 * 函数参数解构赋值，可带默认值
 * @param x
 * @param y
 */
function foo(_ref) {
  var x = _ref.x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 5 : _ref$y;

  console.log(x, y);
}
foo({}); //undefined, 5
foo({ x: 1 }); //1, 5
foo({ x: 1, y: 2 }); //1, 2

/**
 * length不会统计默认参数
 */
(function (a) {}).length; //1
(function () {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
}).length; //0

/**
 * 技巧1
 * 指定一个参数不得省略
 * 如果省略抛出一个错误
 */
function throwIfMissing() {
  throw new Error('Missing parameter');
}
function fop() {
  var mustBeProvided = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : throwIfMissing();

  return mustBeProvided;
}

/**
 * rest参数（...变量名）
 * 捕获多余的参数
 * 是一个数组
 * 之后不能再有其他参数
 * length属性会忽略rest参数
 * @param x
 * @param y
 * @param values
 * @returns {number}
 */
function add(x, y) {
  var sum = 0;

  for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    values[_key - 2] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var val = _step.value;

      sum += val;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return sum;
}
add(2, 5, 3, 7); // 10

/**
 * 扩展运算符...
 * 将一个数组变为参数序列
 * @param x
 * @param y
 * @returns {*}
 */
function add(x, y) {
  return x + y;
}
var number = [4, 38];
add.apply(undefined, number); //42

/**
 * 技巧二
 * 代替apply
 * @param x
 * @param y
 * @param z
 */
function f(x, y, z) {
  console.log(x, y, z);
}
var args = [0, 1, 2];
f.apply(null, args);
f.apply(undefined, args);

/**
 * 技巧三
 * 合并数组
 * @type {string[]}
 */
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];
arr1.concat(arr2, arr3); // [ 'a', 'b', 'c', 'd', 'e' ]
[].concat(arr1, arr2, arr3); // [ 'a', 'b', 'c', 'd', 'e' ]

/**
 * 技巧四
 * 解构赋值
 * @type {number[]}
 */
var list = [1, 2, 3, 4, 5];
var a = list[0],
    rest = list.slice(1);


/**
 * 技巧五
 * 获取能够识别四字节字符的字符串长度
 */
a = list[0];
rest = list.slice(1);
'x\uD83D\uDE80y'.length; // 4
[].concat(_toConsumableArray('x\uD83D\uDE80y')).length; // 3

/**
 * 识别四字节字符的字符串反转
 * @type {string}
 */
var str = 'x\uD83D\uDE80y';
str.split('').reverse().join(''); // 'y\uDE80\uD83Dx'
[].concat(_toConsumableArray(str)).reverse().join(''); // 'y\uD83D\uDE80x'

/**
 * name属性
 * 返回函数名
 * 匿名函数会返回实际的函数名
 * Function构造函数返回函数实例，name属性为“anonymous”
 */
foo.name; // "foo"
var func1 = function func1() {};
func1.name; //"func1"
new Function().name; // "anonymous"

/**
 * bind返回的函数，name属性值会加上“bound”前缀
 */
foo.bind({}).name; //"bound foo"

/**
 * 箭头函数
 * 函数体内的this指向定义时所在的对象，不是使用时所在的对象
 * 不可以当作构造函数
 * 不能使用arguments
 * 不能使用yield
 * @param v
 */
var fff = function fff(v) {
  return v;
};
/*等价于
var fff = function(v) {
    return v
};*/

/**
 * 技巧六
 * 管道机制，前一个函数的输出是后一个函数的输入
 * @param funcs
 */
var pipeline = function pipeline() {
  for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    funcs[_key2] = arguments[_key2];
  }

  return function (val) {
    return funcs.reduce(function (a, b) {
      return b(a);
    }, val);
  };
};
var plus1 = function plus1(a) {
  return a + 1;
};
var mult2 = function mult2(a) {
  return a * 2;
};
var addThenMult = pipeline(plus1, mult2);
addThenMult(5); // 12

var waterFall = function waterFall(arr) {
  return arr.reduce(function (a, b) {
    return b.apply(undefined, _toConsumableArray(a));
  }, []);
};

//# sourceMappingURL=function-compiled.js.map