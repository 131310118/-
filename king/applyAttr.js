/*  applyAttr.js
    Create person : wangjun
    添加节点自定义属性
 */

function applyAttr(element){
    var f = function (me){
        for (var j = 0; j < me.attributes.length; j++) {
            me[me.attributes[j].name.replace(/-([A-Za-z])/g, '$1'.toUpperCase())] = me.attributes[j].value;
        }
    }
    if(element.length){
        for(var i=0;i<element.length;i++){
            f(element[i]);
        }
    }else{
        f(element);
    }
    return element;
}