//数组二分排序
function quicksort(arr){
    if(arr.length<=1){
        return arr;
    }
    var mid = arr.splice(mid,1)[0];
    var left = [];
    var right = [];
    for(var i=0;i<arr.length;i++){
        if(arr[i]<mid){
            left.push(arr[i])
        }
        else{
            right.push(arr[i]);
        }
    }
    return quicksort(left).concat([mid],quicksort(right));
}
//对象二分排序
function isEmptyObject( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}
var obj = {a:{t:120,x:120},b:{t:22,x:48},c:{t:45,x:87}};
function quicksort1(obj,fun){
            if(isEmptyObject(obj)){
                return obj;
            }
            var flag = true;
            var mid = {};
            var mm;
            var left = {};
            var right = {};
            var arr = [];
            for(var i in obj){
                if(flag){
            flag = false;
            mid[i] = obj[i];
            mm = i;
        }
        else{
            if(fun(obj[i],mid[mm])){
                left[i] = obj[i];
            }
            else{
                right[i] = obj[i];
            }
        }
    }
    if(!isEmptyObject(left)){
        var l = quicksort1(left,fun);
        for(i=0;i< l.length;i++){
            arr.push(l[i]);
        }
    }
    arr.push(mid);
    if(!isEmptyObject(right)){
        var r = quicksort1(right,fun);
        for(i=0;i< r.length;i++){
            arr.push(r[i]);
        }
    }
    return arr;
}
obj = quicksort1(obj,function(a,b){
    return a.t< b.t;
});