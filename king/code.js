/*  code.js
    Create person : wangjun
    验证码
    使用方法
    1、option = {
        url:url,            获取验证码API
        errorImgPath:url    加载失败默认图片（可选）
    }
    2、option = url         获取验证码API
 */

function code(option){
    function refresh(){
        img.src = option.url || option;
    };
    var c = tag('div','verificationCode');
    var picture = c.append('span','fl');
    var img = tag('img',{
        title:'刷新验证码',
        alt:'验证码'
    });
    picture.appendChild(img);
    refresh();
    //img.setAttribute('onerror','this.src=\''+option.errorImgPath+'\'')
    if(img.errorImgPath){
        img.addEventListener('error',function(){
            this.src = option.errorImgPath;
        })
    }
    img.addEventListener('load',function(){
        clear
    })
}

function tag(tagName,props){
    var tag = document.createElement(tagName);
    if(typeof props == 'string'){
        tag.className = props;
    }
    else{
        if(props != undefined){
            updateObject(props,tag);
        }
    }
    tag.append = function (tagName, props) {
        return tag.appendChild(tag(tagName, props));
    }
    return tag;
}
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
