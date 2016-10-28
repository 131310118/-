/*
 *   闭包模式与prototype模式
 *   闭包模式访问速度比prototype模式快
 *   这和访问变量的作用域有关，prototype模式中的getName方法需要访问上一层作用域的name
 *   closure模式访问变量在当前作用域，速度较快
 */

//prototype模式
var x = function(name){
    this.name = name;
};
x.prototype.getName = function(){
    return this.name;
};

//闭包模式
var y = function(name){
    var y = {name:name};
    return {'getName':function(){return y.name}};
};


