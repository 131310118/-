/**
 * Created by wangj on 2016/9/27.
 */

/*
* setCookie:exp/毫秒
* */
var cookie = {
    setCookie: function(key, value, exp){
        var d = new Date();
        exp = exp || 86400000;
        var str = key + '=' + value + ';expires=' + d.setDate(d.getTime()+exp).toGMTString();
        document.cookie = str;
    },
    getCookie: function(key) {
        reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
        return document.cookie.match(reg)[2];
    },
    removeCookie: function(key) {
        cookie.setCookie(key,cookie.getCookie(),-1);
    }
};
