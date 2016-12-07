/**
 * Created by wangj on 2016/10/11.
 */

var time = {
    toTime: function(tt) {
        var date = new Date();
        date.setTime(tt);
        var d = date.getFullYear() + "-" + time.numFormat(date.getMonth() + 1) + "-" + time.numFormat(date.getDate());
        var t = time.numFormat(date.getHours()) + ":" + time.numFormat(date.getMinutes());
        return ({ date: d, time: t, full: d + " " + t });
    },
    numFormat: function(num) {
        return (Math.abs(num) < 10) ? "0" + parseInt(num) : num;
    }
};