/**
 * match(substr)
 * match(regexp)
 * 检查字符串指定值或找到一个或多个正则表达式的匹配
 *
 * 如果传入的是子字符串或是没有进行全局匹配的正则表达式，那么会从开始位置匹配，没有结果返回null，否则返回一个数组，
 * 数组第0个元素存放匹配文本，第一个元素存放匹配文本的字符索引，第二个元素存放源字符串的引用
 *
 *如果传入的是具有全局匹配的正则表达式，那么会进行多次匹配，若没有结果返回null，否则返回所有复合要求的子字符串，没有其他属性
 * Created by wangj on 2016/12/9.
 */

let str = 'www.womenzuiqiang.cn';
console.log(str.match('A')); //null
console.log(str.match('o')); //["o", index: 5, input: "www.womenzuiqiang.cn"]
console.log(str.match(/o/)); //["o", index: 5, input: "www.womenzuiqiang.cn"]
console.log(str.match(/\./g)); //['.', '.']

//# sourceMappingURL=match-compiled.js.map