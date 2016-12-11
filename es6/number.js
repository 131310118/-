/**
 * Created by wangj on 2016/12/11.
 */

/**
 * 二进制与八进制表示
 * ob前缀表示二进制
 * 0o前缀表示八进制
 */
0b101 === 5; //true
0o101 === 65; //true

/**
 * isFinite
 * 判断是否是有限数字
 */
Number.isFinite(15); //true
Number.isFinite(NaN); //false
Number.isFinite(Infinity); //false
Number.isFinite(-Infinity); //false
Number.isFinite('str'); //false
Number.isFinite('15'); //false
Number.isFinite(true); //false

/**
 * isNaN
 * 判断一个值是否是NaN
 */
Number.isNaN(NaN); //true
Number.isNaN(15); //false

/**
 * parseInt(str, num)
 * str解析的字符串
 * num将字符串视为num进制
 */
Number.parseInt('12.34', 10); //12
Number.parseInt('11.11', 2); //3

/**
 * parseFloat(str)
 * 解析小数
 */
Number.parseFloat('123.45'); //123.45

/**
 * isInteger(num)
 * 判断是否是整形
 * 因为整数和浮点数是同样的存储方式，所以25和25.0视为同一个值
 */
Number.isInteger(25); //true
Number.isInteger(25.0); //true
Number.isInteger("25"); //false

/**
 * Number.EPSILON
 * 新增极小常量
 * 浮点数计算会有一个误差范围，引入这个常量表示可以接受的误差范围
 */
Number.EPSILON.toFixed(20); //"0.00000000000000022204"

/**
 * 技巧一
 * 浮点数计算的判断
 */
0.1 + 0.2 == 0.3; //false
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; //true

/**
 * isSafeInteger(num)
 * javascript能够精准表示的整数范围在-2^53到2^53之间，不包含两个端点
 * isSafeInteger用来判断一个整数是否在这个范围内
 * 引入两个常量
 * MIN_SAFE_INTEGER 最小安全数
 * MAX_SAFE_INTEGER 最大安全数
 */
Math.pow(2, 53) === Math.pow(2, 53) + 1; //true
Number.Max_SAFE_INTEGER === Math.pow(2, 53) - 1; //true
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER; //true
Number.isSafeInteger(Math.pow(2, 53)); //false
