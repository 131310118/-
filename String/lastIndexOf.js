/**
 * lastIndexOf(searchValue, fromIndex)
 * 检索指定字符串最后出现的位置
 * 与indexOf类似，检索顺序从后往前
 * Created by wangj on 2016/12/9.
 */

let str = 'www.womenzuiqiang.cn';
console.log(str.lastIndexOf('.')); //17
console.log(str.lastIndexOf('.', 1)); //-1
console.log(str.lastIndexOf('.', 5)); //3
console.log(str.lastIndexOf('.', 17)); //17