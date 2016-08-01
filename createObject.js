//Object.create更方便生成对象

var Cat = {
    name:"大猫",
    makeSound:function(){
        console.log("喵喵喵");
    }
};
//直接用Object.create()生成实例，不需要用到new
var cat1 = Object.create(Cat);
console.log(cat1.name)//大猫
cat1.makeSound();//喵喵喵