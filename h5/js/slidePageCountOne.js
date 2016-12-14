/**
 * Created by wangj on 2016/12/13.
 */

let slideItems = document.getElementById('slide-items');
let slideItem = document.getElementsByClassName('slide-item')[0];
let slideNav = document.getElementById('slide-nav');
const config = {
    slide: {
        touchStart: false,
        x: 0,
        width: slideItem.clientWidth,
        length: 6,
        pageCount: 1,
        changeWidth: 0.25
    }
};
config.slide.currentPage = config.slide.pageCount + 1;
config.slide.translate = -config.slide.width * config.slide.pageCount;
config.slide.slideWidth = config.slide.translate;
config.slide.totalWidth = config.slide.width * (config.slide.length - 1);
let getRole = function(name) {
    var rule;
    var ss = document.styleSheets;
    for (var i = 0; i < ss.length; ++i) {
        for (var x = 0; x < ss[i].cssRules.length; ++x) {
            rule = ss[i].cssRules[x];
            if (rule.name == name) {
                return rule;
            }
        }
    }
};
let jumpSlideCss = getRole("jumpSlide");
let setPosition = function() {
    config.slide.slideWidth = config.slide.translate;
    slideItems.style.transform = `translateX(${config.slide.translate}px)`;
};
let setNav = function(currentIndex, toIndex) {
    slideNav.children[currentIndex - 1].setAttribute("class", "slide-nav-item");
    slideNav.children[toIndex - 1].setAttribute("class", "slide-nav-item on");
    config.slide.currentPage = toIndex;
};
let slideFindIndex = function(page) {
    return Array.from(slideItems.children).findIndex(function(item){
        return item.getAttribute("data-nav") == page;
    })
};
let moveSlideItem = function(itemNumber) {
    if(itemNumber < -config.slide.pageCount) {
        let moveNumber = -config.slide.pageCount - itemNumber;
        for(let i = 0; i < moveNumber; i++) {
            slideItems.appendChild(slideItems.children[0]);
        }
        config.slide.slideWidth += config.slide.width * moveNumber;
        slideItems.style.transform = `translateX(${config.slide.slideWidth}px)`;
        config.slide.translate = -config.slide.width * config.slide.pageCount;
    } else if(itemNumber > -config.slide.pageCount){
        let moveNumber = itemNumber + config.slide.pageCount;
        let length = slideItems.children.length - 1;
        for(let i = 0; i < moveNumber; i++) {
            slideItems.insertBefore(slideItems.children[length], slideItems.children[0]);
        }
        config.slide.slideWidth -= config.slide.width * moveNumber;
        slideItems.style.transform = `translateX(${config.slide.slideWidth}px)`;
        config.slide.translate = -config.slide.width * config.slide.pageCount;
    }
    slideItems.setAttribute("class", "slide");
    let currentIndex = config.slide.currentPage;
    config.slide.currentPage = slideItems.children[config.slide.pageCount].getAttribute("data-nav");
    setNav(currentIndex, config.slide.currentPage);
};
let pageTo = function(page) {
    if(config.slide.currentPage == page) {
        return;
    }
    slideItems.setAttribute("class", "");
    let currentIndex = slideFindIndex(config.slide.currentPage);
    let toIndex = slideFindIndex(page);
    jumpSlideCss.deleteRule("0%");
    jumpSlideCss.deleteRule("100%");
    config.slide.translate = -toIndex * config.slide.width;
    config.slide.slideWidth = config.slide.translate;
    setTimeout(setPosition, 100);
    jumpSlideCss.appendRule(`0% {transform: translateX(${-currentIndex * config.slide.width}px)}`);
    jumpSlideCss.appendRule(`100% {transform: translateX(${config.slide.translate}px)}`);
    setNav(config.slide.currentPage, page);
    setTimeout(function() {slideItems.setAttribute("class", "jumpSlide");}, 50);
};

slideItems.addEventListener('touchstart', function(e) {
    if(config.slide.touchStart) {
        return;
    }
    config.slide.touchStart = true;
    let touch = e.touches[0];
    config.slide.x = touch.pageX;
    slideItems.setAttribute("class", "");
});

slideItems.addEventListener('touchmove', function(e) {
    if(!config.slide.touchStart) {
        return;
    }
    config.slide.slideWidth = config.slide.translate - config.slide.x + e.touches[0].pageX;
    if(config.slide.slideWidth > 0) {
        config.slide.slideWidth = 0;
    } else if(config.slide.slideWidth < -config.slide.totalWidth) {
        config.slide.slideWidth = -config.slide.totalWidth
    }
    slideItems.style.transform = `translateX(${config.slide.slideWidth}px)`;
});

slideItems.addEventListener('touchend', function(e) {
    config.slide.touchStart = false;
    let itemNumber = Math.trunc(config.slide.slideWidth / config.slide.width);
    let moveNumber = itemNumber;
    if(config.slide.slideWidth == config.slide.translate) {
        return;
    } else if(config.slide.slideWidth - config.slide.translate < 0) {
        if(Math.abs(config.slide.slideWidth) % Math.trunc(config.slide.width) > config.slide.width * config.slide.changeWidth) {
            moveNumber = itemNumber - 1;
            config.slide.translate = config.slide.width * moveNumber;
        } else {
            config.slide.translate = config.slide.width * moveNumber;
        }
    } else {
        if(Math.abs(config.slide.slideWidth) % Math.trunc(config.slide.width) < config.slide.width * (1 - config.slide.changeWidth)) {
            config.slide.translate = config.slide.width * itemNumber;
        } else {
            moveNumber = itemNumber - 1;
            config.slide.translate = config.slide.width * moveNumber;
        }
    }
    moveSlideItem(moveNumber);
    setTimeout(setPosition, 100);
});

slideNav.addEventListener("touchstart", function(e) {
    if(e.target.nodeName == "SPAN") {
        pageTo(e.target.getAttribute("data-nav") - 0);
    }
});
