/**
 * Created by wangj on 2016/8/9.
 */

function isJSON(obj){
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}
