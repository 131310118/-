/**
 * Created by wangj on 2016/12/9.
 */

/**
 * 字符串反转
 * @returns {string}
 */
String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

/**
 * 去除空白行
 * @returns {string}
 */
String.prototype.removeBlackLines = function () {
    return this.replace(/\n[\s\t]*\r*\n/g, '\n');
};

/**
 * 转化为二维数组
 * @param firstSplit 一维分隔符
 * @param secondSplit 二维分隔符
 * @returns {Array}
 */
String.prototype.strTo2dArr = function(firstSplit, secondSplit) {
    let contentStr = this.removeBlackLines();
    let contentStrArr = contentStr.split(firstSplit);
    return contentStrArr.map(element => {
        return element.split(secondSplit);
    });
};