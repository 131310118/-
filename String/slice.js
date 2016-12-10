/**
 * slice(start, end)
 * 与substring类似，截取start开始一直到end-1
 * 不同的是可以接受负数
 * -1指字符串最后一个字符串
 * Created by wangj on 2016/12/9.
 */

let str = 'www.womenzuiqiang.cn';
console.log(str.slice(0, 3)); //www
console.log(str.slice(-3, -1)); //.c
console.log(str.slice(1, -1)); //ww.womenzuiqiang.c
console.log(str.slice(2, 1)); //''  空字符串
console.log(str.slice(-3, 0)); //''  空字符串
