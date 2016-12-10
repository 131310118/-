/**
 * Created by wangj on 2016/12/10.
 */

/**
 * 字符表示的六种方法
 */
/*
'\z' === 'z'; //true
'\172' === 'z'; //true  ascii码
'\x7A' === 'z'; //true  16进制
'\u007A' === 'z'; //true    码点
'\u{7A}' === 'z' //true     unicode
*/

/**
 * codePointAt(number)
 * 有些字的unicode码点会大于0xFFFF，所以需要四个字节存储
 * charAt和charCodeAt只能获取两个字节的值
 * codePointAt能够正确处理四个字节的字符，对于两个字节的字符同charCodeAt
 * @type {string}
 */
var s = '𠮷'; //UTF-16编码为0xD842 0xDFB7(十进制为55362 57271),这个字不是吉祥的吉哦
s.length; //2
s.charAt(0); //''
s.charAt(1); //''
s.charCodeAt(0); //55362
s.charCodeAt(1); //57271

s.codePointAt(0); //134071
s.codePointAt(1); //57271

/**
 * 技巧1
 * 获取字符串上正确位置序号的字符
 * 前者获取字符串中的‘a’对应的索引是2
 * 后者通过for-of自动遍历字符串，它会自动识别并匹配四字节的字符
 * @type {string}
 */
s = '𠮷a';
s.codePointAt(0).toString(16); //"20bb7"
s.codePointAt(2).toString(16); //"61"

/**
 * 字符串增加遍历器接口，同时支持四字节字符的识别
 */
for (var ch of s) {
    console.log(ch.codePointAt(0).toString(16));
}

/**
 * 技巧二
 * 判断是否为四字节字符
 * @param c
 * @returns {boolean}
 */
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}

/**
 * fromCodePoint
 * 码点转字符
 * fromCharCode仅识别两字节字符
 * fromCodePoint能够识别四字节字符
 * fromCodePoint接收多参数并返回合并后字符串
 */
String.fromCharCode(0x20BB7); //"ஷ"

String.fromCodePoint(0x20BB7); // "𠮷"
String.formCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'; //true

/**
 * includes(str, number)
 * str 需要查找的字符串
 * number number至结尾
 * 是否找到参数字符串
 * @type {string}
 */
s = 'Hello world!';

s.includes('Hello'); //true

/**
 * startsWith(str, number)
 * str 需要查找的字符串
 * number number至结尾
 * 是否位于字符串头部
 */
s.startsWith('Hello'); //true

/**
 * endsWith(str, number)
 * str 需要查找的字符串
 * number 0到number-1
 * 是否位于字符串尾部
 */
s.endsWith('!'); //true

/**
 * repeat(number)
 * 重复字符串
 * number自动去整，0到-1或NAN视为0
 * 0返回空字符串
 * 不接受负值或Infinity，会报错
 */
'x'.repeat(3); //"xxx"
'na'.repeat(2.9); //"nana"

/**
 * 模版字符串
 * 前者是传统字符串拼接
 * 模版字符串可带入参数
 * 参数写在${}内
 * @type {{name: string, password: string}}
 */
var {name, password} = {name: 'wangjun', password: '123456'};
var str = '<div>this is a div</div>' +
        '<p>' + name + '</p>' +
        '<p>' + password + '</p>' +
        '<div>this is another div</div>';

str = `<div>this is a div</div>
       <p>${name}</p>
       <p>${password}</p>
       <div>this is another div</div>
`;

/**
 * raw(str, ...values)
 * 前者返回一个斜杠都被转义的字符串
 * 后者接受一个具有raw属性的对象，raw属性的值应该是一个数组（或类数组），返回遍历raw属性，交叉参数直至raw遍历结束
 */
String.raw`Hi\u000A`;
//"Hi\\u000A"

String.raw({raw: 'test'}, 0, 1, 2, 3, 4);
//"t0e1s2t"