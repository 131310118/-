//深拷贝
function deepcopy(p,c){
    var f = c || {};
    for(var i in p){
        if(typeof p[i] ==='object'){
            f[i] = (p[i].constructor === Array)?[]:{};
            deepcopy(p[i],f[i]);
        }
        else{
            f[i] = p[i];
        }
    }
    return f;
}
//实例
var person = {
    nationality:"America"
}
var doctor = deepcopy(person);