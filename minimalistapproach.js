//比Object.create()更好的方法生成对象，极简主义法

//封装，不使用this和prototype，代码部署起来简单。首先，它是一个对象模拟类，在类中定义了一个构造函数
var Cat = {
    create:function(){
        //定义一个实例对象，并把这个实例对象作为返回值
        var cat = {};
        cat.name = '大猫';
        cat.makeSound = function(){console.log("喵喵喵");};
        return cat;
    }
}

//创建实例对象
var cat1 = Cat.create();
cat1.makeSound();

//继承,让一个类继承另一个类，只要在前者的create()方法中，调用后者的create()方法即可。
var Animal = {
    create:function(){
        var animal = {};
        animal.sleep = function(){
            console.log("睡懒觉");
        }
        return animal;
    }
}
var Cat = {
    create:function() {
        var cat = Animal.create();
        cat.name = "大猫";
        cat.makeSound = function(){console.log("喵喵喵")};
        return cat;
    }
}
//创建实例
var cat1 = Cat.create();
cat1.sleep();

//私有属性和私有方法，在crteate方法中，只要不是定义在cat对象上的方法和属性，都是私有的
var Cat = {
    create:function(){
        var cat = {};
        var sound = "喵喵喵";//私有变量 只有通过cat的公有方法makeSound()来获取
        cat.makeSound = function(){console.log(sound);};
        return cat;
    }
}

//数据共享，只要把共享数据封装在类对象的里面，create()房外的外面即可
var Cat = {
    sound:"喵喵喵",
    create:function(){
        var cat = {};
        cat.makeSound = function(){console.log(Cat.sound)};
        cat.changeSound = function(x){Cat.sound = x;};
        return cat;
    }
}
var cat1 = Cat.create();
var cat2 = Cat.create();
cat1.makeSound();
cat2.changeSound("汪汪汪");
cat1.makeSound();


