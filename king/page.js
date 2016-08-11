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
        href:"javascript:void(0);",
        click:function(){}
    });
    config.hrefIsFun = (typeof config.href == "function");
    var cl = tag('ul','cl');
    if(config.page){
        var p = cl.append('li');
        if(config.pages<=config.node){
            for(var i=1;i<=config.node;i++){
                if(config.onPage==i){
                    p.append('a',{
                        href:config.hrefIsFun?config.href(i):config.href,
                        innerHTML:i,
                        className:'on'
                    });
                }else{
                    p.append('a',{
                        href:config.hrefIsFun?config.href(i):config.href,
                        innerHTML:i
                    }).addEventListener('click',function(){
                        config.onPage = +this.innerHTML.trim();
                        page(element,config);
                        config.click(config.onPage);
                    });
                }
            }
        }else{
            var half = Math.floor(config.node/2);
            if(config.onPage>half){
                var lessRight = half+config.onPage-config.pages;
                for(var i=config.onPage-half-(lessRight>0?lessRight:0);i<config.onPage;i++){
                    p.append('a',{
                        href:config.hrefIsFun?config.href(i):config.href,
                        innerHTML:(i==config.onPage-half-(lessRight>0?lessRight:0)&&i!=1&&config.first?'1..':i)
                    }).addEventListener('click',function(){
                        config.onPage = +this.innerHTML.trim().match(/(\d)+/)[0];
                        page(element,config);
                        config.click(config.onPage);
                    });
                }
            }else{
                for(var i=1;i<config.onPage;i++){
                    p.append('a',{
                        href:config.hrefIsFun?config.href(i):config.href,
                        innerHTML:i
                    }).addEventListener('click',function(){
                        config.onPage = +this.innerHTML.trim();
                        page(element,config);
                        config.click(config.onPage);
                    });
                }
            };
            p.append('a',{
                href:config.hrefIsFun?config.href(i):config.href,
                innerHTML:config.onPage,
                className:'on'
            });
            if(config.onPage<=(config.pages-half)){
                for(var i=+config.onPage+ 1,j = +config.onPage+half-(config.onPage-half>0?0:config.onPage-half);i<=j;i++){
                    p.append('a',{
                        href:config.hrefIsFun?config.href(i):config.href,
                        innerHTML:(i==j&&i!=config.pages&&config.last?config.pages+'..':i)
                    }).addEventListener('click',function(){
                        config.onPage = +this.innerHTML.trim().match(/(\d)+/)[0];
                        page(element,config);
                        config.click(config.onPage);
                    });
                }
            }else{
                for(var i=+config.onPage+1;i<=config.pages;i++){
                    p.append('a',{
                        href:config.hrefIsFun?config.href(i):config.href,
                        innerHTML:i
                    }).addEventListener('click',function(){
                        config.onPage = +this.innerHTML.trim();
                        page(element,config);
                        config.click(config.onPage);
                    });
                }
            }
        }
    }
    if(config.jump){
        cl.append('li','form_page').append('input',{
            className:'page_input',
            type:'text'
        }).addEventListener('keydown',function(e){
            if (e.keyCode == 13 || e.keyCode == 108) {
                config.onPage = (+this.value.trim())>config.pages?config.pages:(+this.value.trim()<1?1:+this.value.trim());
                page(element,config);
                config.click(config.onPage);
            }
        })
    }
    if(config.next){
        if(config.onPage!=config.pages){
            var next = cl.append('li','next');
            next.append('a',{
                href:config.hrefIsFun?config.href(+config.onPage+1):config.href,
                innerHTML:'<span>下一页</span><i class="fa fa-chevron-right"></i>'
            });
            next.addEventListener('click',function(){
                config.onPage = (+config.onPage+1);
                page(element,config);
                config.click(config.onPage);
            });
        }
    }
    if(config.prev){
        if(config.onPage!=1){
            var pre = cl.append('li','pre');
            pre.append('a',{
                href:config.hrefIsFun?config.href(config.onPage-1):config.href,
                innerHTML:'<i class="fa fa-chevron-left"></i>'
            });
            pre.addEventListener('click',function(){
                config.onPage = (config.onPage-1);
                page(element,config);
                config.click(config.onPage);
            });
        }
    }
    element.innerHTML = '';
    element.appendChild(cl);
    function Next(){
        next&&next.click();
    }
    function Prev(){
        pre&&pre.click();
    }
    function pageTo(page){
        config.onPage = page;
        page(element,config);
    }
    return {
        next:Next,
        prev:Prev,
        pageTo:pageTo
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