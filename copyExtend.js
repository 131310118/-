//通过拷贝父对象的原型实现继承
function copyExtend(child,parent){
    var c = child.prototype;
    var p = parent.prototype;
    for(var i in p){
        c[i] = p[i];
    }
}
//实例
function a(){
    this.name="a";
}
//添加子对象原型方法
a.prototype.getname = function(){
    return this.name;
};
//父对象
function b(name){
    this.name = name;
}
//继承
copyExtend(b,a);
var bb = new b("b");
bb.getname();