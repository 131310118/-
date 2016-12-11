/**
 * Created by wangj on 2016/12/11.
 */

/**
 * trunc(num)
 * 去除小数点部分，返回整数部分
 */
Math.trunc(4.1); //4
Math.trunc(-4.1); //-4

/**
 * sign(num)
 * 判断是正数、负数还是0
 */
Math.sign(-5); //-1
Math.sign(5); //+1
Math.sign(0); //+0
Math.sign(-0); //-0

/**
 * cbrt(num)
 * 求立方根
 */
Math.cbrt(-1); //-1
Math.cbrt(0); //0
Math.cbrt(1); //1
Math.cbrt(8); //2

/**
 * clz32(num)
 * 返回num的32位无符号整形形式有多少个前导0
 */
Math.clz32(0); //32
Math.clz32(1); //31
Math.clz32(0b01000000000000000000000000000000); //1

/**
 * imul(a, b)
 * 以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。
 * 一般用来处理数字超出32位的情况
 */
(0x7fffffff * 0x7fffffff)|0; // 0
Math.imul(0x7fffffff, 0x7fffffff); // 1

/**
 * fround(num)
 * 返回一个数的单精度浮点数形式
 * 整数不变化
 * 对于无法用64个二进制位精确表示的小数会返回最接近这个小数的单精度浮点数
 */
Math.fround(0); //0
Math.fround(1); //1
Math.fround(1.5); //1.5
Math.fround(1.337); //1.3370000123977661

/**
 * hypot(...)
 * 计算所有参数的平方和的平方根
 */
Math.hypot(3, 4); //5

/**
 * expm1(x)
 * 返回e^x - 1
 */
Math.expm1(1); //1.718281828459045
Math.expm1(1) === Math.exp(1) - 1; //true

/**
 * log1p(x)
 * 返回1+x的对数
 */
Math.log1p(0); //0
Math.log1p(0) === Math.log(1); //true

/**
 * log10(x)
 * 返回以10为底的x的对数
 */
Math.log10(100000); //5

/**
 * log2(x)
 * 返回以2为底的x的对数
 */
Math.log2(2); //1

var x = 1;
Math.sinh(x);// 返回x的双曲正弦（hyperbolic sine）
Math.cosh(x);// 返回x的双曲余弦（hyperbolic cosine）
Math.tanh(x);// 返回x的双曲正切（hyperbolic tangent）
Math.asinh(x);// 返回x的反双曲正弦（inverse hyperbolic sine）
Math.acosh(x);// 返回x的反双曲余弦（inverse hyperbolic cosine）
Math.atanh(x);// 返回x的反双曲正切（inverse hyperbolic tangent）

/**
 * **
 * 指数运算符
 */
/*
2 ** 2 === 4;// true
2 ** 3 === 8; //true*/
