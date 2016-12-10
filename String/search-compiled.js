/**
 * search(substr)
 * search(regexp)
 * 检索字符串中指定的子字符串，或检索与正则表达式相配的子字符串
 * 返回第一个匹配的子字符串的起始位置
 * 没有匹配则返回-1
 * Created by wangj on 2016/12/9.
 */

let str = 'www.womenzuiqiang.cn';
console.log(str.search('w')); //0
console.log(str.search(/o/g)); //5

//# sourceMappingURL=search-compiled.js.map