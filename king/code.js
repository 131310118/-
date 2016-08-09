/*  code.js
    Create person : wangjun
    验证码
    使用方法
    1、option = {
        element:element     需要插入验证码的父节点
        url:url,            获取验证码API
        errorImgPath:url    加载失败默认图片（可选）
    }
    2、option = url         获取验证码API
 */

function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g,'');
}
function code(option){
    var c = tag('div','verificationCode');
    var picture = c.append('span','fl');
    var input = c.append('input',{
        className:'input-control',
        type:'text',
        placeholder:'请输入验证码'
    });
    var img = tag('img',{
        title:'刷新验证码',
        alt:'验证码'
    });
    refresh();
    //img.setAttribute('onerror','this.src=\''+option.errorImgPath+'\'')
    img.addEventListener('load',function(){
        picture.appendChild(img);
    });
    if(img.errorImgPath){
        img.addEventListener('error',function(){
            error();
        })
    }
    img.addEventListener('click',function(){
        refresh();
        clear();
    });
    input.addEventListener()
    element.insertBefore(c,element.lastChild);

    function refresh(){
        img.src = option.url || option;
    };
    function clear(){
        input.value = '';
        input.focus();
    };
    function error(){
        if(img.errorImgPath){
            img.src = option.errorImgPath;
        }
    };
    function test(){
        var val = trim(input.value);
        if(/^[0-9a-zA-Z]{4}$/.test(val)){
            return true;
        }
        wrong((val=='')?'请输入验证码':undefined);
        return false;
    }
    function wrong(str){
        console.log(str||'验证码输入有误，请重新输入');
    }
    return {
        refresh:refresh,
        clear:clear,
        error:error,
        test:test,
        wrong:wrong
    }
}
//创建节点，tag('div','container'),tag('img',{alt:'',title:''}),append属性添加子节点，用法同tag
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
//对象继承
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
