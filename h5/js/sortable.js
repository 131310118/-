/**
 * Created by 王军 on 2017/6/20.
 */

(function(factory) {
    "use strict";

    if(typeof define != "undefined" && define.amd) {
        define(factory);
    } else if(typeof module != "undefined" && typeof module.exports != "undefined") {
        module.exports = factory();
    } else {
        window["Sortable"] = factory();
    }
})(function() {
    "use strict";

    if(typeof window == "undefined" || !window.document) {
        return function() {
            throw new Error("Sortable.js requires a window with a document");
        };
    }

    var dragel, //拖动DOM元素节点
        captureMode = false;

    /**
     * @class Sortable
     * @param {HTMLElement} el
     * @param {Object} options
     */
    function Sortable(el, options) {
        if(el && el.nodeType && el.nodeType !== 1) {
            throw new Error('Sortable: `el` must be HTMLElement, and not ' + Object.prototype.toString.call(el));
        }
        this.el = el;
        this.options = options = _extend({}, options);

        var defaults = {
        };

        for(var name in defaults) {
            !(name in options) && (options[name] = defaults[name]);
        }

        _on(el, 'mousedown', this._onTapStart.bind(this))
    }

    Sortable.prototype = {
        constructor: Sortable,
        _onTapStart: function(/*Event*/evt) {
            var touch = evt.touches && evt.touches[0],
                target = (touch || evt).target;
            this._prepareDragStart(evt, touch, target)
        },
        _prepareDragStart: function(evt, touch, target) {

        },
        _onDrop: function(evt) {

        },
        _triggerDragStart: function(evt, touch) {

        }
    };

    function _extend(dst, src) {
        if(dst && src) {
            for(var key in src) {
                if(src.hasOwnProperty(key)) {
                    dst[key] = src[key];
                }
            }
        }
        return dst;
    }

    function _on(el, event, fn) {
        el.addEventListener(event, fn, captureMode);
    }
});
