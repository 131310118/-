/**
 * Created by Íõ¾ü on 2017/6/26.
 */

function eventUtil() {
    //this.construct = arguments.callee;
    this.addHandel = function(element, type, handle, useCapture) {
        if(element && element.addEventListener) {
            if(type/* && ("on" + type in element)*/) {
                if(typeof handle === "function") {
                    if(element.addEventListener) {
                        element.addEventListener(type, handle, String.prototype.toLowerCase.call(useCapture || false) === "true");
                    } else if(element.attach) {
                        element.attach("on" + type, handle);
                    } else {
                        element["on" + type] = handle;
                    }
                } else {
                    throw new Error("handle " + handle + "must be a function");
                }
            } else {
                throw new Error("type " + type + " is not defined");
            }
        } else {
            throw new Error("element " + element + " must be an element node");
        }
    };
    this.removeHandle = function(element, type, handle, useCapture) {
        if(element && element.addEventListener) {
            if(type/* && ("on" + type in element)*/) {
                if(typeof handle === "function") {
                    if(element.removeEventListener) {
                        element.removeEventListener(type, handle, String.prototype.toLowerCase.call(useCapture || false) === "true");
                    } else if(element.detach) {
                        element.detach("on" + type, handle);
                    } else {
                        element["on" + type] = handle;
                    }
                } else {
                    throw new Error("handle " + handle + "must be a function");
                }
            } else {
                throw new Error("type " + type + " is not defined");
            }
        } else {
            throw new Error("element " + element + " must be an element node");
        }
    };
}
eventUtil.prototype = {
    getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event ? event.target : (window.event && window.event.srcElement);
    },
    preventDefault: function(event) {
        var event = this.getEvent(event);
        if(event) {
            if(event.preventDefault) {
                event.preventDefault();
                return true;
            } else if(event.returnValue) {
                event.returnVaule = false;
                return true;
            }
        }
        return false;
    },
    stopPropagation: function(event) {
        var event = this.getEvent(event);
        if(event) {
            if(event.stopPropagation) {
                event.stopPropagation();
                return true;
            } else if(event.cancelBubble) {
                event.cancelBubble = true;
                return true;
            }
        }
        return false;
    }
};