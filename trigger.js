//自定义事件
function Observer(){
    this.eventList = {};//保留事件
}
Observer.prototype = {
    on:function(name,fn,scope){
        this.eventList[name] = this.eventList[name]||[];
        this.eventList[name].push({fn:fn||null,scope:scope});
    },
    trigger:function(){
        var args = Array.prototype.slice.call(arguments); //arguments转数组
        var name = args.shift();
        var list = this.eventList[name];
        for(var i=0;i<list.length;i++){
            list[i].fn.apply(list[i].scope||null,args);
        }
    }
}

var EventObject = new Observer();

EventObject.on('GO_TO_BED', function(name, hour) {
    console.group('Test Event');
    console.log(name + '要在' + hour + '点之前去睡觉');
});