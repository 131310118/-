/**
 * Created by wangj on 2016/12/14.
 */

var sdMul = new slider({
    element: document.getElementById('slide-items-mul'),
    length: 6,
    pageCount: 2,
    changeWidth: 0.25,
    jumpKeyframes: "jumpSlide",
    touchKeyFrames: "slide"
});

var sdOne = new slider({
    element: document.getElementById('slide-items-one'),
    length: 6,
    pageCount: 1,
    changeWidth: 0.25,
    jumpKeyframes: "jumpSlideOne",
    touchKeyFrames: "slideOne"
});

var cover = new canvasCover({
    element: document.getElementById('canvas-cover-front'),
    r: 10,
    src: "./img/36226f3c95fca277c3686c4dc40a3241.jpg"
});