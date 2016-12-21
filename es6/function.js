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
function log(x, y = 'world') {
    console.log(x, y);
}
log('hello');// hello world
log('hello', 'china'); //hello china
log('hello', ''); //hello

/**
 * 函数参数解构赋值，可带默认值
 * @param x
 * @param y
 */
function foo({x, y = 5}) {
    console.log(x, y);
}
foo({}); //undefined, 5
foo({x: 1}); //1, 5
foo({x: 1, y: 2}); //1, 2

/**
 * length不会统计默认参数
 */
(function (a) {}).length; //1
(function (a = 5) {}).length; //0

/**
 * 技巧1
 * 指定一个参数不得省略
 * 如果省略抛出一个错误
 */
function throwIfMissing() {
    throw new Error('Missing parameter');
}
function fop(mustBeProvided = throwIfMissing()) {
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
function add(x, y, ...values) {
    let sum = 0;
    for(let val of values) {
        sum += val;
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
add(...number); //42

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
f(...args);

/**
 * 技巧三
 * 合并数组
 * @type {string[]}
 */
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];
arr1.concat(arr2, arr3); // [ 'a', 'b', 'c', 'd', 'e' ]
[...arr1, ...arr2,...arr3]; // [ 'a', 'b', 'c', 'd', 'e' ]

/**
 * 技巧四
 * 解构赋值
 * @type {number[]}
 */
var list = [1,2,3,4,5];
var a = list[0], rest = list.slice(1);
[a,...rest] = list;

/**
 * 技巧五
 * 获取能够识别四字节字符的字符串长度
 */
'x\uD83D\uDE80y'.length; // 4
[...'x\uD83D\uDE80y'].length; // 3

/**
 * 识别四字节字符的字符串反转
 * @type {string}
 */
let str = 'x\uD83D\uDE80y';
str.split('').reverse().join('');// 'y\uDE80\uD83Dx'
[...str].reverse().join('');// 'y\uD83D\uDE80x'

/**
 * name属性
 * 返回函数名
 * 匿名函数会返回实际的函数名
 * Function构造函数返回函数实例，name属性为“anonymous”
 */
foo.name; // "foo"
var func1 = function () {};
func1.name; //"func1"
(new Function).name; // "anonymous"

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
var fff = v => v;
/*等价于
var fff = function(v) {
    return v
};*/

/**
 * 技巧六
 * 管道机制，前一个函数的输出是后一个函数的输入
 * @param funcs
 */
const pipeline = (...funcs) =>
    val => funcs.reduce((a, b) => b(a), val);
const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);
addThenMult(5);// 12

const waterFall = arr =>
    arr.reduce((a, b) => b(...a), []);
waterFall([function(){console.log(1);return [1]},
    function(b) {console.log(b)}]);
