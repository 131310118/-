/**
 * Created by wangj on 2016/9/27.
 */

/*
*
* */
var cookie = {
    setCookie: function(key, value, options){
        if(!options) {
            options = {};
        }
        var d = new Date();
        options.exp = options.exp || 86400000;
        var str = key + '=' + value + ';expires=' + d.setDate(d.getTime() + options.exp);
        if(options.path) {
            str += '; path=' + options.path;
        }
        if(options.domain) {
            str += ';domain=' + options.domain;
        }
        if(options.secure) {
            str += 'secure';
        }
        document.cookie = str;
    },
    getCookie: function(key) {
        var reg = new RegExp("(^| )"+key+"=([^;]*)(;|$)");
        var name = document.cookie.match(reg);
        if(name != null) {
            return name[2];
        } else {
            return false;
        }
    },
    removeCookie: function(key) {
        cookie.setCookie(key,cookie.getCookie(),-1);
    }
};