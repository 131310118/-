/**
 * substring(start, end)
 * 字符串截取，从start位置一直截取到end-1，若end省略，截取到最后
 * 负值默认为0
 * Created by wangj on 2016/12/9.
 */
let str = 'www.womenzuiqiang.cn';
console.log(str.substring(0, 3)); //www
console.log(str.substring(0)); //www.womenzuiqiang.cn
console.log(str.substring(-2)); //www.womenzuiqiang.cn  传负值默认为0

//# sourceMappingURL=substring-compiled.js.map