/*  breakEvent.js
    Create person : wangjun
    阻止默认事件，冒泡事件
 */

function breakEvent(e){
    if(e&&e.preventDefault){
        e.preventDefault();
        e.stopPropagation();
    }else{
        window.event.returnValue = false;
        window.event.cancelBubble = true;
    }
}