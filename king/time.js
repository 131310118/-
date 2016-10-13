/**
 * Created by wangj on 2016/10/11.
 */

function time(time) {
    var date = new Date();
    date.setTime(time);
    var d = date.getFullYear() + "-" + numFormat(date.getMonth() + 1) + "-" + numFormat(date.getDate());
    var t = numFormat(date.getHours()) + ":" + numFormat(date.getMinutes());
    return ({ date: d, time: t, full: d + " " + t });
}

function numFormat(num) {
    return (Math.abs(num) < 10) ? "0" + parseInt(num) : num;
}