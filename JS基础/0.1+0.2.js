/**
 * 明确几点
 * ① 首先0.1和0.2转换成二进制都是无限循环小时。  0.1 = 2^-4 * 1.10011(0011)
 * ②由于js采用的浮点数标准（64位）1位标识符号，11位表示指数，剩下的位数拿来表示0.1中的10011(0011)
 * ③那么  循环小数肯定会被裁剪掉一部分   如   0.100000000000000002 === 0.1 // true  同理0.2也是
 * ④所以可以得出结论，0.1+0.2!== 0.3 
 */

/* 
储备知识
  正数  
    原码  反码  补码   相同
  负数  
    原码  ---（除符号位，0、1互换）------反码      
    原码    ------ （取反 + 1 ）--------  补码
    补码   ------ （取反 + 1 ）--------  原码  注意 原码转补码  和  补码转原码  都是 先取反 +  1

    二进制最稳当的加法是 
    ① 转换成补码，得到结果
    ② 把结果转换成原码，输出。
  
    JS中的Number类型  都是双精度浮点型（其他语言的double类型）  用64位来进行存储
    符号位    sign      1bit
    次方位    exponent  11bit
    尾数      mantissa  52bit

    那么js在计算十进制的时候 会先把数目转成二进制 
    那么 
    0.1 = 0.000110011(0011)……
    0.2 = 0.00110011(0011)……    0011会一直无限循环下去   
    那么这两个二进制加起来会得出  
    0.010011....0100   所以结果便是   0.30000000000000004
    （参考文章：https://zhuanlan.zhihu.com/p/57784008 
    https://www.runoob.com/w3cnote/decimal-decimals-are-converted-to-binary-fractions.html

*/