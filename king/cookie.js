/**
 * Created by wangj on 2016/9/27.
 */

/*
* setCookie:exp/毫秒
* */
var cookie = {
    setCookie: function(key, value, exp){
        var str = key + '=' + value;
        if(exp) {
            var d = new Date();
            str += ';expires=' + d.setTime(d.getTime()+exp).toGMTString();
        }
        document.cookie = str;
    },
    getCookie: function(key) {
        reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
        return document.cookie.match(reg)[2];
    },
    removeCookie: function(key) {
        cookie.setCookie(key,cookie.getCookie(),-1);
       /* var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie = key + '=' + cookie.getCookie(key) + ';expires=' + exp.toGMTString();*/
    }
};
