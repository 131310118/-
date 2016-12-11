/**
 * Created by wangj on 2016/12/11.
 */

/**
 * RegExp(str, flag)
 * str是匹配字符串或正则表达式
 * flag是正则表达式的修饰符
 * flag会覆盖str正则表达式的修饰符
 * 正则构造函数
 * @type {RegExp}
 */
var regexp = new RegExp('xyz', 'i');
    regexp = new RegExp(/xyz/i);
    regexp = new RexExp(/xyz/ig, 'i'); // 等价于regexp = /xyz/i

/**
 * String的方法用到正则的地方
 */
String.prototype.match;
String.prototype.replace;
String.prototype.search;
String.prototype.split;

/**
 * u修饰符
 * unicode模式，正确处理四字节字符
 */
var s = '𠮷';
new RegExp(/\uD83D/, 'u').test('\uD83D\uDC2A'); // false
/\uD83D/.test('\uD83D\uDC2A'); //true

/**
 * 点符号
 * 匹配除了换行符以外的任意单个字符串
 * 不匹配四字节字符
 * @type {string}
 */
/^.$/.test(s); //false
new RegExp(/^.$/, 'u').test(s); //true

/**
 * 正则匹配unicode字符时需要加上u修饰符，否则被视为量词
 */
/\u{61}/.test('a'); //false
new RegExp(/\u{61}/, 'u').test('a'); //true

/**
 * \S匹配所有不是空格的字符，不识别四字节字符
 * 加上u修饰符才能识别四字节字符
 */
/^\S$/.test(s); // false
new RegExp(s, 'u').test(s); //true

/**
 * 技巧一
 * 字符串长度，匹配四字节字符
 * @param text
 * @returns {*}
 */
function codePointLength(text) {
    let result = text.match(new RegExp(/\s\S/, 'u'));
    return result ? result.length : 0;
}
s = '𠮷𠮷';
s.length; // 4
codePointLength(s); //2

/**
 * y修饰符
 * 与g修饰符类似，全局匹配，不同的是后一次匹配都是上一次匹配成功的下一个位置
 * @type {string}
 */
s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = new RegExp(/a+/, 'y');

r1.exec(s); //"aaa"
r2.exec(s); //"aaa"

r1.exec(s); //"aa"
r2.exec(s); //null

/**
 * lastIndex属性
 * 下一次匹配的字符位置
 * @type {number}
 */
r2.lastIndex = 0;
r2.exec(s); //"aaa"

/**
 * stiky属性
 * 是否设置了y修饰符
 */
r2.sticky; //true

/**
 * source属性
 * 正则表达式的正文
 */
r2.source; //"a+"

/**
 * flags属性
 * 正则表达式的修饰符
 */
r2.flags; //y

function escapeRegExp(text) {
    return text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}


