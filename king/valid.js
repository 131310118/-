/*  valid.js
    Create peron : wangjun
    验证是否匹配
 */

function valid(type,text,options){
    options = options || {};
    var min,max;
    var types = {
        nickname:function(){
            min = options.min ||　4,max = options.max || 30;
            return "^[\\w\\u4e00-\\u9fa5]{"+min+","+max+"}$";
        },
        email:function(){
            return "^([-_.\\w])+@([-.\\w])*$";
        },
        phone:function(){
            return "^\\d{2}-?\\d{9}|\\d{3}-?\\d{8}";
        },
        password:function(){
            min = option.min || 6,max = option.max || 32;
            return "^[\\w\\W]{"+min+","+max+"}$";
        },
        input:function(){
            min = option.min || 2,max = option.max || 50;
            return "^[\\w\\W]{"+min+","+max+"}$";
        },
        text:function(){
            min = option.min || 1,max = option.max || 3000;
            return "^[\\w\\W]{"+min+","+max+"}$";
        },
        website:function(){
            return "^([A-Za-z]+://)?[-A-Za-z0-9_]+\\.[-A-Za-z0-9_%&?\\/.=]+$";
        }
    }
    var reg = new RegExp(options.reg || types[type]());
    return reg.test(text.replace(/^ *| *$/g,""));
}