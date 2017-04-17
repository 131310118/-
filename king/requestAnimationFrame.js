/**
 * Created by wangj on 2017/3/24.
 */

!function() {
    var lastTime = 0;
    var vendors = ["webkit", "moz"];
    if(!window.requestAnimationFrame) {
        for(let vendor of vendors) {
            if(window.requestAnimationFrame) {
                return;
            }
            window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
            window.cancleAnimationFrame = window[vendor + 'CancleAnimationFrame'] || window[vendor + 'CancleRequestAnimationFrame'];
        }
    }
    if(!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currentTime = new Date().getTime();
            var passedTime = Math.max(0, 16.7 - currentTime + lastTime);
            id = setTimeout(callback, passedTime);
            lastTime = currentTime + passedTime;
            return id;
        };
    }
    if(!window.requestAnimationFrame) {
        window.cancleAnimationFrame = function(id) {
            clearTimeout(id);
        }
    }
}();
