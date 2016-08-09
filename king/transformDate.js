/**
 * Created by wangj on 2016/8/9.
 */

function transformDate(date,status){
    var d = new Date(date*1000)
    var y = d.getYear();
    var m = d.getMonth();
    var day = d.getDay();
    var h = d.getHours();
    var mi = d.getMinutes();
    var time =  y+'/'+(m<9?'0'+(m+1):m+1)+'/'+(day<10?'0'+day:day);
    if(status){
        time+=' '+(h<10?'0'+h:h)+':'+(mi<10?'0'+mi:mi);
    }
    return time;
}
