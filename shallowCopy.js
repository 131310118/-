//浅拷贝
function shallowCopy(p){
    var f = {};
    for(var i in p){
        f[i] = p[i]
    }
    return f;
}
//实例
var person = {
    nationality:"chinese"
};
var doctor = shallowCopy(person);
console.log(doctor.nationakity);
