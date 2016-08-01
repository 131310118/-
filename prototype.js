/*prototype继承
  利用空对象做中介实现继承*/
function extend(child,parent){
    var f = function(){};
    f.prototype = parent.prototype;
    child.prototype = new f();
    child.prototype.constructor = child;
}
//实例
//子对象
function a(){
    this.name="a";
}
//添加子对象原型方法
a.prototype.getname = function(){
    return this.name;
}
//父对象
function b(name){
    this.name = name;
}
//继承
extend(b,a);
var bb = new b("b");
bb.getname();