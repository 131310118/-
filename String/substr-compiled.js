/**
 * substr(start, length)
 * 字符串截取，从start开始，截取length个字符
 * 若length较大，以实际截取长度为准
 * 可以接受负数，-1表示最后一个字符
 * Created by wangj on 2016/12/9.
 */

let str = 'www.womenzuiqiang.cn';
console.log(str.substr(1, 3)); //ww.
console.log(str.substr(0)); //www.womenzuiqiang.cn
console.log(str.substr(-3, 3)); //.cn
console.log(str.substr(-1, 5)); //n  目标长度较大，以实际截取的长度为准

//# sourceMappingURL=substr-compiled.js.map