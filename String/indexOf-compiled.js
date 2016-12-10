/**
 * indexOf(searchValue, fromIndex)
 * 检索指定的字符串在字符串中首次出现的位置
 * searchValue表示要查找的字符串
 * fromIndex表示查找的开始位置，省略则从开始的位置进行检索
 * Created by wangj on 2016/12/9.
 */

let str = 'www.womenzuiqiang.cn';
console.log(str.indexOf('.')); //3
console.log(str.indexOf('.', 1)); //3
console.log(str.indexOf('.', 5)); //17
console.log(str.indexOf('.', 18)); //-1

/**
 * 常用来判断是否存在指定的字符串
 */
if (-1 !== str.indexOf('womenzuiqiang')) {
  //do something
}

//# sourceMappingURL=indexOf-compiled.js.map