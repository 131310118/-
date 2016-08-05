/*  breakEvent.js
    this is a common fram
    Create person : wangjun
 */

var king = {
    queryString: function (id) {
        var e = {};
        try {
            var qs = document.URL.split('?')[1].split('&');
        } catch (ex) {
            return null;
        }
        if (!isNaN(id)) {
            return qs[id].split('=')[1];
        }
        for (var i = 0; i < qs.length; i++) {
            var array = qs[i].split('=');
            e[array[0].toLowerCase()] = array[1];
        }
        if (id) {
            return e[id.toLowerCase()];
        }
        return e;
    },
    breakEvent: function (e) {
        if (e && e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }
    },
    tag: function (tagName, props) {
        var tag = document.createElement(tagName);
        if (typeof props == 'string') {
            tag.className = props;
        }
        else {
            if (props != undefined) {
                this.updateObject(props, tag);
            }
        }
        tag.append = function (tagName, props) {
            return tag.appendChild(this.tag(tagName, props));
        }
        return tag;
    },
    updateObject: function (inputValue, outputValue) {
        for (var key in inputValue) {
            if (inputValue[key] && inputValue[key].constructor == Object) {
                outputValue[key] = this.updateObject(inputValue[key], outputValue[key]);
            }
            else if (inputValue[key] != undefined) {
                outputValue[key] = inputValue[key];
            }
        }
        return outputValue;
    },
    valid: function (type, text, options) {
        options = options || {};
        var min, max;
        var types = {
            nickname: function () {
                min = options.min || 4, max = options.max || 30;
                return "^[\\w\\u4e00-\\u9fa5]{" + min + "," + max + "}$";
            },
            email: function () {
                return "^([-_.\\w])+@([-.\\w])*$";
            },
            phone: function () {
                return "^\\d{2}-?\\d{9}|\\d{3}-?\\d{8}";
            },
            password: function () {
                min = option.min || 6, max = option.max || 32;
                return "^[\\w\\W]{" + min + "," + max + "}$";
            },
            input: function () {
                min = option.min || 2, max = option.max || 50;
                return "^[\\w\\W]{" + min + "," + max + "}$";
            },
            text: function () {
                min = option.min || 1, max = option.max || 3000;
                return "^[\\w\\W]{" + min + "," + max + "}$";
            },
            website: function () {
                return "^([A-Za-z]+://)?[-A-Za-z0-9_]+\\.[-A-Za-z0-9_%&?\\/.=]+$";
            }
        }
        var reg = new RegExp(options.reg || types[type]());
        return reg.test(text.replace(/^ *| *$/g, ""));
    },
    valueLength: function (value) {
        var ZH = value.replace(/[\x00-\xff]/g, "").length;
        return {zh: ZH, en: value.length - ZH};
    },
    applyAttr: function (element) {
        var f = function (me){
            for (var j = 0; j < me.attributes.length; j++) {
                me[me.attributes[j].name.replace(/-([A-Za-z])/g, '$1'.toUpperCase())] = me.attributes[j].value;
            }
        }
        if(element.length){
            for(var i=0;i<element.length;i++){
                f(element[i]);
            }
        }else{
            f(element);
        }
        return element;
    },
    browser: {
        IE: (navigator.userAgent.indexOf('MSIE') > -1) && (navigator.userAgent.indexOf('Opera') < 0),
        Firefox: (navigator.userAgent.indexOf('Firefox') > -1),
        Chrome: (navigator.userAgent.indexOf('Chrome') > -1),
        Opera: (navigator.userAgent.indexOf('Opera') > -1),
        IE6: (navigator.userAgent.indexOf('MSIE 6') > -1) && (navigator.userAgent.indexOf('Opera') < 0),
        IE10: (navigator.userAgent.indexOf('MSIE 10') > -1) && (navigator.userAgent.indexOf('Opera') < 0),
        weChat: (navigator.userAgent.indexOf('MicroMessenger') > -1),
        iphone: (navigator.userAgent.indexOf('iPhone') > -1) || (navigator.userAgent.indexOf('Mac') > -1),
        android: (navigator.userAgent.indexOf('Android') > -1) || (navigator.userAgent.indexOf('Linux') > -1),
        getBrowser: function () {
            for (var key in browser) {
                if (key == 'getBrowser') {
                    return;
                } else {
                    if (browser[key]) {
                        return key;
                    }
                }
            }
        }
    },
    callFile: function (files){
        var frame = document.createDocumentFragment();
        var f = function (file){
            if(/\.js$/.test(file)){
                var script = document.createElement('script');
                script.setAttribute('src',file);
                script.setAttribute('type','text/javascript');
                frame.appendChild(script);
            }else if(/\.css/.test(file)) {
                var link = document.createElement('link');
                link.setAttribute('href', file);
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('type', 'text/css');
                link.setAttribute('media', 'all');
                frame.appendChild(link);
            }
        }
        if(files.length){
            for(var i=0;i<files.length;i++){
                f(files[i]);
            }
        }else{
            f(files);
        }
        document.head.appendChild(frame);
    }
}