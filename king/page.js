/**
 * Created by wangj on 2016/8/10.
 */

function page(element,option){
    var config = updateObject(option,{
        first:true,
        last:true,
        jump:true,
        page:true,
        prev:true,
        next:true,
        pages:1,
        onPage:1,
        node:6,
        href:"javascript:void(0);"
    });
    config.hrefIsFun = (typeof config.href == "function");
    var cl = tag('ul','cl');
    if(config.page){
        var p = cl.append('li');
        if(config.pages<=node){
            for(var i=1;i<=node;i++){
                if(config.onPage==i){
                    p.append('a',{
                        href:config.hrefIsFun?config.href(i):config.href,
                        innerHTML:i,
                        class:'on'
                    })
                }else{
                    p.append('a',{
                        href:config.hrefIsFun?config.href(i):config.href,
                        innerHTML:i
                    })
                }
            }
        }else{
            var half = Math.floor(config.node/2);
            if(config.onPage>half){
                for(var i=config.onPage-half;i<=config.onPage;i++){
                    p.append('a',{
                        href:config.hrefIsFun?config.href(i):config.href,
                        innerHTML:i
                    })
                }
            }
        }
    }
    if(config.jump){
        cl.append('li','form_page').append('input',{
            class:'page_input',
            type:'text'
        })
    }
    if(config.next){
        cl.append('li','next').append('a',{

        })
    }
    return {
        next:next,
        prev:prev,
    }
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
function tag(tagName,props){
    var Tag = document.createElement(tagName);
    if(typeof props == 'string'){
        Tag.className = props;
    }
    else{
        if(props != undefined){
            /*if(props.style){
             updateObject(props.style,tag.style);
             delete props.style;
             }*/
            updateObject(props,Tag);
        }
    }
    Tag.append = function (tagName, props) {
        return Tag.appendChild(tag(tagName, props));
    }
    return Tag;
}
function updateObject(inputValue,outputValue){
    for(var key in inputValue) {
        if (inputValue[key] && inputValue[key].constructor == Object) {
            outputValue[key] = this.updateObject(inputValue[key], outputValue[key]);
        }
        else if (inputValue[key] != undefined) {
            outputValue[key] = inputValue[key];
        }
    }
    return outputValue;
}