let removeAttribute = function(ele, name, value) {
    if(!ele.getAttribute(name)) {
        return
    }
    var arr = ele.getAttribute(name).split(' ');
    var index = arr.findIndex(function(n) {
        if(value == n) {
            return true;
        }
    });
    if(index != -1) {
        arr.splice(index, 1);
    }
    ele.setAttribute(name, arr.join(' '));
};
let addAttribute = function(ele, name, value) {
    if(!ele.getAttribute(name)) {
        ele.setAttribute(name, value);
        return;
    }
    var arr = ele.getAttribute(name).split(' ');
    var index = arr.findIndex(function(n) {
        if(value == n) {
            return true;
        }
    });
    if(index != -1) {
        return;
    } else {
        arr.splice(0, 0, value);
    }
    ele.setAttribute(name, arr.join(' '));
};
let slider = function(obj) {
    this.slideItems =obj.element;
    this.slideItem = this.slideItems.children[0];
    this.slideNav = document.createElement("nav");
    this.config = {
        slide: {
            touchStart: false,
            x: 0,
            width: this.slideItem.clientWidth,
            length: obj.length || 1,
            pageCount: obj.pageCount || 1,
            changeWidth: obj.changeWidth || 0.25,
            jumpKeyframes: obj.jumpKeyframes,
            touchKeyframes: obj.touchKeyframes
        }
    };
    this.config.slide.currentPage = this.config.slide.pageCount + 1;
    this.config.slide.translate = -this.config.slide.width * this.config.slide.pageCount;
    this.config.slide.slideWidth = this.config.slide.translate;
    this.config.slide.totalWidth = this.config.slide.width * (this.config.slide.length - 1);
    let df = document.createDocumentFragment();
    this.jumpSlideCss = this.getRole(this.config.slide.jumpKeyframes);
    for(let i = 0; i < this.config.slide.length; i++) {
        var sp = document.createElement("span");
        addAttribute(sp, "data-nav", i + 1);
        if(i != this.config.slide.pageCount) {
            sp.setAttribute("class", "slide-nav-item");
        } else {
            sp.setAttribute("class", "slide-nav-item on");
        }
        df.appendChild(sp);
    }
    this.slideNav.appendChild(df);
    this.slideNav.setAttribute("class", "slide-nav");
    let that = this;
    this.slideItems.parentNode.appendChild(that.slideNav);
    this.slideItems.addEventListener('touchstart', function(e) {
        if(that.config.slide.touchStart) {
            return;
        }
        that.config.slide.touchStart = true;
        let touch = e.touches[0];
        that.config.slide.x = touch.pageX;
        removeAttribute(that.slideItems, "class", "slide");
        removeAttribute(that.slideItems, "class", "jumpSlide");
    });
    this.slideItems.addEventListener('touchmove', function(e) {
        if(!that.config.slide.touchStart) {
            return;
        }
        that.config.slide.slideWidth = that.config.slide.translate - that.config.slide.x + e.touches[0].pageX;
        if(that.config.slide.slideWidth > 0) {
            that.config.slide.slideWidth = 0;
        } else if(that.config.slide.slideWidth < -that.config.slide.totalWidth) {
            that.config.slide.slideWidth = -that.config.slide.totalWidth
        }
        that.slideItems.style.transform = `translateX(${that.config.slide.slideWidth}px)`;
    });
    this.slideItems.addEventListener('touchend', function(e) {
        that.config.slide.touchStart = false;
        let itemNumber = Math.trunc(that.config.slide.slideWidth / that.config.slide.width);
        let moveNumber = itemNumber;
        if(that.config.slide.slideWidth == that.config.slide.translate) {
            return;
        } else if(that.config.slide.slideWidth - that.config.slide.translate < 0) {
            if(Math.abs(that.config.slide.slideWidth) % Math.trunc(that.config.slide.width) > that.config.slide.width * that.config.slide.changeWidth) {
                moveNumber = itemNumber - 1;
                that.config.slide.translate = that.config.slide.width * moveNumber;
            } else {
                that.config.slide.translate = that.config.slide.width * moveNumber;
            }
        } else {
            if(Math.abs(that.config.slide.slideWidth) % Math.trunc(that.config.slide.width) < that.config.slide.width * (1 - that.config.slide.changeWidth)) {
                that.config.slide.translate = that.config.slide.width * itemNumber;
            } else {
                moveNumber = itemNumber - 1;
                that.config.slide.translate = that.config.slide.width * moveNumber;
            }
        }
        that.moveSlideItem(moveNumber);
        setTimeout(function() {
            that.setPosition()
        }, 100);
    });
    this.slideNav.addEventListener("touchstart", function(e) {
        if(e.target.nodeName == "SPAN") {
            that.pageTo(e.target.getAttribute("data-nav") - 0);
        }
    });
};
slider.prototype.getRole = function(name) {
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
slider.prototype.setPosition = function() {
    this.config.slide.slideWidth = this.config.slide.translate;
    this.slideItems.style.transform = `translateX(${this.config.slide.translate}px)`;
};
slider.prototype.setNav = function(currentIndex, toIndex) {
    this.slideNav.children[currentIndex - 1].setAttribute("class", "slide-nav-item");
    this.slideNav.children[toIndex - 1].setAttribute("class", "slide-nav-item on");
    this.config.slide.currentPage = toIndex;
};
slider.prototype.slideFindIndex = function(page) {
    return Array.from(this.slideItems.children).findIndex(function(item){
        return item.getAttribute("data-nav") == page;
    })
};
slider.prototype.moveSlideItem = function(itemNumber) {
    if(itemNumber < -this.config.slide.pageCount) {
        let moveNumber = -this.config.slide.pageCount - itemNumber;
        for(let i = 0; i < moveNumber; i++) {
            this.slideItems.appendChild(this.slideItems.children[0]);
        }
        this.config.slide.slideWidth += this.config.slide.width * moveNumber;
        this.slideItems.style.transform = `translateX(${this.config.slide.slideWidth}px)`;
        this.config.slide.translate = -this.config.slide.width * this.config.slide.pageCount;
    } else if(itemNumber > -this.config.slide.pageCount){
        let moveNumber = itemNumber + this.config.slide.pageCount;
        let length = this.slideItems.children.length - 1;
        for(let i = 0; i < moveNumber; i++) {
            this.slideItems.insertBefore(this.slideItems.children[length], this.slideItems.children[0]);
        }
        this.config.slide.slideWidth -= this.config.slide.width * moveNumber;
        this.slideItems.style.transform = `translateX(${this.config.slide.slideWidth}px)`;
        this.config.slide.translate = -this.config.slide.width * this.config.slide.pageCount;
    }
    addAttribute(this.slideItems, "class", "slide");
    let currentIndex = this.config.slide.currentPage;
    this.config.slide.currentPage = this.slideItems.children[this.config.slide.pageCount].getAttribute("data-nav");
    this.setNav(currentIndex, this.config.slide.currentPage);
};
slider.prototype.pageTo = function(page) {
    if(this.config.slide.currentPage == page) {
        return;
    }
    removeAttribute(this.slideItems, "class", "jumpSlide");
    removeAttribute(this.slideItems, "class", "slide");
    let currentIndex = this.slideFindIndex(this.config.slide.currentPage);
    let toIndex = this.slideFindIndex(page);
    let that = this;
    this.jumpSlideCss.deleteRule("0%");
    this.jumpSlideCss.deleteRule("100%");
    this.config.slide.translate = -toIndex * this.config.slide.width;
    this.config.slide.slideWidth = this.config.slide.translate;
    setTimeout(function() {
        that.setPosition()
    }, 100);
    this.jumpSlideCss.appendRule(`0% {transform: translateX(${-currentIndex * this.config.slide.width}px)}`);
    this.jumpSlideCss.appendRule(`100% {transform: translateX(${this.config.slide.translate}px)}`);
    this.setNav(this.config.slide.currentPage, page);
    setTimeout(function() {
        addAttribute(that.slideItems, "class", "jumpSlide");
    }, 50);
};