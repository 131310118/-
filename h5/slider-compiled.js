let slider = function (obj) {
    this.slideItems = obj.element;
    this.slideItem = this.slideItems.children[0];
    this.slideNav = document.createElement("nav");
    this.config = {
        slide: {
            touchStart: false,
            x: 0,
            width: this.slideItem.clientWidth,
            length: obj.length || 1,
            pageCount: obj.pageCount || 1,
            changeWidth: obj.changeWidth || 0.25
        }
    };
    this.config.slide.currentPage = this.config.slide.pageCount + 1;
    this.config.slide.translate = -this.config.slide.width * this.config.slide.pageCount;
    this.config.slide.slideWidth = this.config.slide.translate;
    this.config.slide.totalWidth = this.config.slide.width * (this.config.slide.length - 1);
    let df = document.createDocumentFragment();
    for (let i = 0; i < this.config.slide.length; i++) {
        var sp = document.createElement("span");
        sp.setAttribute("data-nav", i + 1);
        sp.setAttribute("class", "slide-nav-item");
        df.appendChild(sp);
    }
    this.slideNav.appendChild(df);
    this.slideNav.setAttribute("id", "slide-nav");
    let that = this;
    this.slideItems.parentNode.appendChild(that.slideNav);
    this.slideItems.addEventListener('touchstart', function (e) {
        if (that.config.slide.touchStart) {
            return;
        }
        that.config.slide.touchStart = true;
        let touch = e.touches[0];
        that.config.slide.x = touch.pageX;
        that.slideItems.setAttribute("class", "");
    });
    this.slideItems.addEventListener('touchmove', function (e) {
        if (!that.config.slide.touchStart) {
            return;
        }
        that.config.slide.slideWidth = that.config.slide.translate - that.config.slide.x + e.touches[0].pageX;
        if (that.config.slide.slideWidth > 0) {
            that.config.slide.slideWidth = 0;
        } else if (that.config.slide.slideWidth < -that.config.slide.totalWidth) {
            that.config.slide.slideWidth = -that.config.slide.totalWidth;
        }
        that.slideItems.style.transform = `translateX(${ that.config.slide.slideWidth }px)`;
    });
    this.slideItems.addEventListener('touchend', function (e) {
        that.config.slide.touchStart = false;
        let itemNumber = Math.trunc(that.config.slide.slideWidth / that.config.slide.width);
        let moveNumber = itemNumber;
        if (that.config.slide.slideWidth == that.config.slide.translate) {
            return;
        } else if (that.config.slide.slideWidth - that.config.slide.translate < 0) {
            if (Math.abs(that.config.slide.slideWidth) % Math.trunc(that.config.slide.width) > that.config.slide.width * that.config.slide.changeWidth) {
                moveNumber = itemNumber - 1;
                that.config.slide.translate = that.config.slide.width * moveNumber;
            } else {
                that.config.slide.translate = that.config.slide.width * moveNumber;
            }
        } else {
            if (Math.abs(that.config.slide.slideWidth) % Math.trunc(that.config.slide.width) < that.config.slide.width * (1 - that.config.slide.changeWidth)) {
                that.config.slide.translate = that.config.slide.width * itemNumber;
            } else {
                moveNumber = itemNumber - 1;
                that.config.slide.translate = that.config.slide.width * moveNumber;
            }
        }
        that.moveSlideItem(moveNumber);
        setTimeout(function () {
            that.setPosition();
        }, 100);
    });
    this.slideNav.addEventListener("touchstart", function (e) {
        if (e.target.nodeName == "SPAN") {
            that.pageTo(e.target.getAttribute("data-nav") - 0);
        }
    });
};
slider.prototype.getRole = function (name) {
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
slider.prototype.jumpSlideCss = slider.prototype.getRole("jumpSlide");
slider.prototype.setPosition = function () {
    this.config.slide.slideWidth = this.config.slide.translate;
    this.slideItems.style.transform = `translateX(${ this.config.slide.translate }px)`;
};
slider.prototype.setNav = function (currentIndex, toIndex) {
    this.slideNav.children[currentIndex - 1].setAttribute("class", "slide-nav-item");
    this.slideNav.children[toIndex - 1].setAttribute("class", "slide-nav-item on");
    this.config.slide.currentPage = toIndex;
};
slider.prototype.slideFindIndex = function (page) {
    return Array.from(this.slideItems.children).findIndex(function (item) {
        return item.getAttribute("data-nav") == page;
    });
};
slider.prototype.moveSlideItem = function (itemNumber) {
    if (itemNumber < -this.config.slide.pageCount) {
        let moveNumber = -this.config.slide.pageCount - itemNumber;
        for (let i = 0; i < moveNumber; i++) {
            this.slideItems.appendChild(this.slideItems.children[0]);
        }
        this.config.slide.slideWidth += this.config.slide.width * moveNumber;
        this.slideItems.style.transform = `translateX(${ this.config.slide.slideWidth }px)`;
        this.config.slide.translate = -this.config.slide.width * this.config.slide.pageCount;
    } else if (itemNumber > -this.config.slide.pageCount) {
        let moveNumber = itemNumber + this.config.slide.pageCount;
        let length = this.slideItems.children.length - 1;
        for (let i = 0; i < moveNumber; i++) {
            this.slideItems.insertBefore(this.slideItems.children[length], this.slideItems.children[0]);
        }
        this.config.slide.slideWidth -= this.config.slide.width * moveNumber;
        this.slideItems.style.transform = `translateX(${ this.config.slide.slideWidth }px)`;
        this.config.slide.translate = -this.config.slide.width * this.config.slide.pageCount;
    }
    this.slideItems.setAttribute("class", "slide");
    let currentIndex = this.config.slide.currentPage;
    this.config.slide.currentPage = this.slideItems.children[this.config.slide.pageCount].getAttribute("data-nav");
    this.setNav(currentIndex, this.config.slide.currentPage);
};
slider.prototype.pageTo = function (page) {
    if (this.config.slide.currentPage == page) {
        return;
    }
    this.slideItems.setAttribute("class", "");
    let currentIndex = slideFindIndex(this.config.slide.currentPage);
    let toIndex = slideFindIndex(page);
    jumpSlideCss.deleteRule("0%");
    jumpSlideCss.deleteRule("100%");
    this.config.slide.translate = -toIndex * this.config.slide.width;
    this.config.slide.slideWidth = this.config.slide.translate;
    setTimeout(function () {
        that.setPosition();
    }, 100);
    jumpSlideCss.appendRule(`0% {transform: translateX(${ -currentIndex * this.config.slide.width }px)}`);
    jumpSlideCss.appendRule(`100% {transform: translateX(${ this.config.slide.translate }px)}`);
    this.setNav(this.config.slide.currentPage, page);
    setTimeout(function () {
        this.slideItems.setAttribute("class", "jumpSlide");
    }, 50);
};

var sd = new slider({
    element: document.getElementById('slide-items'),
    length: 6,
    pageCount: 2,
    changeWidth: 0.25
});

//# sourceMappingURL=slider-compiled.js.map