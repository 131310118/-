/**
 * Created by wangj on 2016/8/9.
 * 对象继承
 */

function updateObject(inputValue,outputValue){
    for(var key in inputValue) {
        if (inputValue[key] && inputValue[key].constructor == Object) {
            outputValue[key] = updateObject(inputValue[key], outputValue[key]);
        }
        else if (inputValue[key] != undefined) {
            outputValue[key] = inputValue[key];
        }
    }
    return outputValue;
}