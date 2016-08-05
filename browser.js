/*  browser.js
    Create person : wangjun
    判断浏览器类型
 */

var browser = {
    IE: (navigator.userAgent.indexOf('MSIE')>-1) && (navigator.userAgent.indexOf('Opera')<0),
    Firefox: (navigator.userAgent.indexOf('Firefox')>-1),
    Chrome: (navigator.userAgent.indexOf('Chrome')>-1),
    Opera: (navigator.userAgent.indexOf('Opera')>-1),
    IE6: (navigator.userAgent.indexOf('MSIE 6')>-1) && (navigator.userAgent.indexOf('Opera')<0),
    IE10: (navigator.userAgent.indexOf('MSIE 10')>-1) && (navigator.userAgent.indexOf('Opera')<0),
    weChat: (navigator.userAgent.indexOf('MicroMessenger')>-1),
    iphone: (navigator.userAgent.indexOf('iPhone')>-1) || (navigator.userAgent.indexOf('Mac')>-1),
    android: (navigator.userAgent.indexOf('Android')>-1) || (navigator.userAgent.indexOf('Linux')>-1),
    getBrowser:function(){
        for(var key in browser){
            if(key=='getBrowser'){
                return;
            }else{
                if(browser[key]){
                    return key;
                }
            }
        }
    }
}