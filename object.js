//非构造函数继承,object实现将子对象的原型指向父对象
function object(o){
    var f = function(){};
    f.prototype = o;
    return new f();
}
//实例
/*var doctor = {
    occupation:"医生"
}*/
//父对象
var person = {
    nationality:"chinese"
}
//创建子对象
var doctor = new object(person);
console.log(doctor.nationality);
