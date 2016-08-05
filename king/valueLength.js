/*  valueLength.js
    Create person : wangjun
    统计单字节字符和双字节字符
 */

function valueLength(value){
    var ZH = value.replace(/[\x00-\xff]/g,"").length;
    return {zh:ZH,en:value.length-ZH};
}