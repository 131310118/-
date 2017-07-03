/*  queryString.js
    Create person : wangjun
    截取url参数
 */

function queryString(id){
    var e = {};
    try{
        var qs = document.URL.split('?')[1].split('&');
    }catch (ex){
        return null;
    }
    if(!isNaN(id)){
        return qs[id].split('=')[1];
    }
    for(var i=0;i<qs.length;i++){
        var array = qs[i].split('=');
        e[array[0].toLowerCase()] = array[1];
    }
    if(id){
        return e[id.toLowerCase()];
    }
    return e;
}

function getQueryString() {
    var qs = window.location.search ? window.location.search.subString(1) : "";
    if(qs) {
        var args = {};
        var items = qs.split('&');
        var key, value, keys;
        for(var i = 0, j = items.length; i < j; i++) {
            keys = items[i].split('=');
            key = decodeURIComponent(keys[0]);
            value = keys[1] ? decodeURIComponent(keys[1]) : undefined;
            args[key] = value;
        }
        return args;
    }
    return undefined;
}

function getQuery(name) {
    if(name) {
        var reg = new RegExp("(^|&)"+name+"=([^&]*(&|$))");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
}
