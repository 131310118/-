/**
 * Created by wangj on 2016/8/8.
 * ajax({
 *     url:"",
 *     type:"",
 *     dataType:"",
 *     success:function(){},
 *     error:function(){},
 *     complete:function(){}
 * })
 */

var $ = {
    cookie:function(key,value,options){
        //write
        if(value !== undefined && typeof value != 'function'){
            var options = options||{};
            var config = {
                domain:options.domain||"",
                path:options.path||"",
                expires:new Date()*1+options.expires||"24*60*60*1000",
                secure:options.secure||""
            }
            if(isJSON(value)){
                value = JSON.stringify(value);
            }
            return (document.cookie = [encodeURIComponent(key),'=',encodeURIComponent(value),
                '; expires='+config.expires,
                config.domain?'; domain='+config.domain:'',
                config.path?'; path='+config.path:'',
                config.secure?': secure':''
            ].join(""));
        }
        //read
        else{
            var result = {};
            var cookies = document.cookie?document.cookie.split(';'):[];
            for(var i=0;i<cookies.length;i++){
                var parts = cookies[i].split('=');
                var name = /[\S]+/.exec(decodeURIComponent(parts[0]))[0];
                var v = decodeURIComponent(parts[1]);
                if(name==key){
                    return v;
                }
                result[name] = v;
            }
            if(!key){
                return result;
            }
            return undefined;
        }
    }
}
function isJSON(obj){
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}
function setHeader(){
    var header = {},auth = $.cookie("AUTH");
    header["x-client-id"] = "user-web";
    if(auth){
        header["authorization"] = "Bearer "+auth;
    }
    return header;
}
function formatParam(data){
    var arr = [];
    for(var name in data){
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    return arr.join('&');
}
function ajax(option){
    var xhr = new XMLHttpRequest();
    if(option.type.toLowerCase()=='get'){
        if(option.data){
            xhr.open('get',option.url+'?'+formatParam(option.data),true);
        }else{
            xhr.open('get',option.url,true);
        }
        addHeader(option.header);
        xhr.send(null);
    }else if(option.type.toLowerCase()=='post'){
        xhr.open('post',option.url,true);
        addHeader(option.header);
        addHeader({"Content-Type":"application/x-www-form-urlencoded"});
        xhr.send(formatParam(option.data));
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                if(option.dataType.toLowerCase() == 'json'){
                    option.success && option.success(JSON.parse(xhr.response));
                }
            }else{
                option.error && option.error(xhr);
            }
        }
        option.complete && option.complete(xhr);
    }

    function addHeader(obj){
        if(obj){
            for(var name in obj){
                xhr.setRequestHeader(name,obj[name]);
            }
        }
    }
}
