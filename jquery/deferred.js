//deferred对象是jQuery的回调函数解决方案
var dtd = $.Deferred();
var wait = function(dtd){
    var task = function(){
        console.log("执行完毕");
        dtd.resolve()//改变deferred对象的状态为已完成
    }
    setTimeout(task,5000);
    return dtd;
}
$.when(wait(dtd)).done(function(){console.log("回调成功")}).fail(function(){console.log("失败")});

//上述代码暴露的问题是deferred对象是全局变量，可以随时改变，为避免外部改变，所以对代码进行优化

var dtd = $.Deferred();
var wait = function(dtd){
    var task = function(){
        console.log("执行完毕");
        dtd.resolve();
    }
    setTimeout(task,5000);
    return dtd.promise(); //返回promise对象,只开放与改变状态无关的方法，屏蔽与改变执行状态有关的方法
}
var d = wait(dtd);//新建一个d对象，改为对这个对象进行操作
$.when(d).done(function(){console.log("回调成功")}).fail(function(){console.log("失败")});

//更优方法

var wait = function(dtd){
    var  dtd = $.Deferred();//私有变量
    var task = function(){
        console.log("执行完成")
        dtd.resolve();
    }
    setTimeout(task,5000);
    return dtd.promise();
}
$.when(wait()).done(function(){console.log("回调成功")}).fail(function(){console.log("失败")});

//利用deferred对象的构造函数$.Deferred()

var wait = function(dtd){
    var task = function(){
        console.log("执行完毕");
        dtd.resolve();
    }
    setTimeout(task,5000);
    return dtd.promise();
}
$.Deferred(wait).done(function(){console.log("回调成功")}).fail(function(){console.log("失败")});

//直接在对象上部署deferred接口

var dtd = $.Deferred();
var wait = function(dtd){
    var task = function(){
        console.log("执行完成");
        dtd.resolve();
    }
    setTimeout(task,5000);
}
dtd.promise(wait);//在wait对象上部署Deferred接口
wait.done(function(){console.log("回调成功")}).fail(function(){console.log("失败")});
wait(dtd);