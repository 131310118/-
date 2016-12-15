/**
 * Created by wangj on 2016/12/15.
 */

let canvasCover = function(obj) {
    var config = {
        cover: {
            r: obj.r || 10,
            x: 0,
            y: 0,
            src: obj.src || "./img/36226f3c95fca277c3686c4dc40a3241.jpg"
        }
    };
    var canvasCoverFront = obj.element || document.getElementById('canvas-cover-front');
    var canvasCoverContent = canvasCoverFront.parentNode || document.getElementById('canvas-cover-content');

    var content = canvasCoverFront.getContext("2d");
    content.fillStyle = "#f3f3f3";
    content.fillRect(0, 0, canvasCoverContent.clientWidth, canvasCoverContent.clientHeight);
    var img = new Image();
    img.onload = function() {
        canvasCoverFront.width = this.width;
        canvasCoverFront.height = this.height;
        content.fillStyle = "#f3f3f3";
        content.fillRect(0, 0, canvasCoverFront.width, canvasCoverFront.height);
        config.cover.offsetX = canvasCoverFront.offsetLeft;
        config.cover.offsetY = canvasCoverFront.offsetTop;
        let pat = content.createPattern(img, "no-repeat");
        content.strokeStyle = pat;
        content.fillStyle = pat;
        content.lineWidth = 2 * config.cover.r;
        function touchstart(e) {
            e = window.event || e;
            e.preventDefault();
            e.stopPropagation();
            config.cover.x = e.touches[0].pageX - config.cover.offsetX;
            config.cover.y = e.touches[0].pageY - config.cover.offsetY;
            content.beginPath();
            content.arc(config.cover.x, config.cover.y, config.cover.r, 0, 2 * Math.PI);
            content.fill();
        }
        function touchmove(e) {
            e = window.event || e;
            e.preventDefault();
            e.stopPropagation();
            let x = e.touches[0].pageX - config.cover.offsetX;
            let y = e.touches[0].pageY - config.cover.offsetY;
            content.arc(x, y, config.cover.r, 0, 2 * Math.PI);
            content.fill();
            content.beginPath();
            content.moveTo(config.cover.x, config.cover.y);
            content.lineTo(x, y);
            content.closePath();
            content.stroke();
            config.cover.x = x;
            config.cover.y = y;
        }
        function remove(r) {
            let x = canvasCoverFront.width / 2;
            let y = canvasCoverFront.height / 2;
            if(r > Math.hypot(x, y)) {
                return;
            }
            content.arc(x, y, r, 0, 2 * Math.PI);
            content.fill();
            setTimeout(function() {
                remove(++r);
            }, 1)
        }
        function removeByAlpha(o) {
            content.strokeStyle = pat;
            content.globalAlpha=o;
            content.fillRect(0, 0, canvasCoverFront.width, canvasCoverFront.height);
            setTimeout(function() {
                removeByAlpha(o + 0.01);
            }, 50)
        }
        function touchend(e) {
            let data = content.getImageData(0, 0, canvasCoverFront.width, canvasCoverFront.height).data;
            let j = 0;
            for (let i = 0, l = data.length;i < l; i += config.cover.r){
                if(data[i] != 243) {
                    j++;
                }
            }
            if(j > data.length * 0.5 / config.cover.r) {
                //remove(10);
                removeByAlpha(0);
                canvasCoverFront.removeEventListener("touchstart", touchstart);
                canvasCoverFront.removeEventListener("touchmove", touchmove);
                canvasCoverFront.removeEventListener("touchend", touchend);
            }
        }
        canvasCoverFront.addEventListener("touchstart", touchstart);
        canvasCoverFront.addEventListener("touchmove", touchmove);
        canvasCoverFront.addEventListener("touchend", touchend);
    };
    img.src = config.cover.src;
};



