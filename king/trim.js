/**
 * Created by wangj on 2016/8/9.
 * 去除前后空格符
 */

function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g,'');
}