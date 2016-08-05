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
