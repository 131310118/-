/*  applyAttr.js
    Create person : wangjun
    添加节点自定义属性
    将自定义属性（例：data-all）添加到节点属性中并命名为dataAll,便于直接访问
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