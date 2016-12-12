/**
 * Created by wangj on 2016/12/12.
 */

/**
 * from(obj, fun， that)
 * obj要转化的对象
 * fun类似于map方法，对每个元素进行处理
 * that用来绑定作用域的this
 * 类似数组对象转数组
 * 可遍历对象转数组
 * 字符串转数组，可识别四字节字符
 * 例如NodeList、arguments、Set
 * @type {{0: string, 1: string, 2: string, length: number}}
 */
var arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};

var arr1 = [].slice.call(arrayLike); //['a','b','c']
var arr2 = Array.from(arrayList); //['a','b','c']

/**
 * of(...)
 * 将参数转数组
 */
Array.of(3, 11, 8); //[3,11,8]

/**
 * copyWithin(target, start, end)
 * target 开始替换的位置
 * start 开始读取数据的位置
 * end 结束读取数据的位置（不包含）
 * 在当前数组内部，将指定位置的成员赋值到其他位置（在原数组上操作）
 */
[1, 2, 3, 4, 5].copyWithin(0, 2, 3);// [3,2,3,4,5]

/**
 * find(callback，that)
 * callback回调函数，直到找到第一个返回为true的成员
 * callback接受三个参数（value, index, arr）
 * value当前值
 * index当前的位置
 * arr原数组
 * that绑定作用域this
 */
[1, 4, -5, 10].find((n) => n < 0); //-5

/**
 * findIndex(callback)
 * 类似于find
 * 不同的是返回成员的位置
 * that绑定作用域this
 */
[1, 4, -5, 10].findIndex((n) => n < 0); //2

/**
 * fill(str, start, end)
 * str 填充内容
 * start 填充开始的位置
 * end 填充结束的位置（不包含）
 * 填充数组
 */
['a', 'b', 'c'].fill(7); //[7,7,7]

/**
 * entries
 * 返回Iterator迭代器
 * 遍历键值对
 * @type {string[]}
 */
var letter = ['a', 'b', 'c'];
var entries = letter.entries();
console.log(entries.next().value); //[0, 'a']
console.log(entries.next().value); //[0, 'b']

/**
 * keys
 * 返回迭代器
 * 遍历键名
 * @type {Iterator.<number>}
 */
var keys = letter.keys();
console.log(keys.next().value); //0
console.log(keys.next().value); //1

/**
 * values
 * 返回迭代器
 * 遍历键值
 * @type {Iterator.<T>}
 */
var values = letter.values();
console.log(values.next().value); //'a'
console.log(values.next().value); //'b'