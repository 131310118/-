/**
 * Created by wangj on 2016/12/19.
 */

let canvasWave = function(obj) {
    let config = {
        wave: {
            ele: obj.element,
            sourceImg: obj.sourceImg,
            fillStyle: obj.fillStyle || "#4BF6EE",
            clientWidth: obj.clientWidth || 400,
            clientHeight: obj.clientHeight || 400,
            waveHeight: obj.waveHeight || 8,
            waveWidth: obj.waveWidth || 15,
            currentX: 0,
            currentY: obj.currentY || 0,
            waveSpace: obj.waveSpace || 10
        }
    };
    config.wave.ele.width = config.wave.clientWidth;
    config.wave.ele.height = config.wave.clientHeight;
    let context = config.wave.ele.getContext('2d');
    let img = new Image();
    let hd = config.wave.waveWidth / 2;
    let d2 = config.wave.waveWidth * 2;
    let scaleX = 0;
    let scaleY = 0;
    let scale = 1;
    let start = 0;
    let end = 0;
    let sourceX = 0;
    let startTo = 0;

    function tick() {
        let startPointX = sourceX;
        context.clearRect(0, 0, config.wave.clientWidth, config.wave.clientHeight);
        context.beginPath();
        context.moveTo(config.wave.currentX, config.wave.currentY);
        while(config.wave.currentX < startTo) {
            context.quadraticCurveTo(config.wave.currentX + hd, config.wave.currentY + config.wave.waveHeight, config.wave.currentX + config.wave.waveWidth, config.wave.currentY);
            context.quadraticCurveTo(config.wave.currentX + hd + config.wave.waveWidth, config.wave.currentY - config.wave.waveHeight, config.wave.currentX + d2, config.wave.currentY);
            config.wave.currentX = config.wave.currentX + d2;
        }
        context.lineTo(config.wave.currentX, config.wave.clientHeight);
        context.lineTo(startPointX, config.wave.clientHeight);
        context.fill();
        context.scale(scale, scale);
        context.globalCompositeOperation = "destination-atop";
        context.drawImage(img, 0, 0, img.width, img.height, start, end, img.width, img.height);
        context.scale(1 / scale, 1 / scale);
        sourceX -= config.wave.waveSpace;;
        config.wave.currentY--;
        if(config.wave.currentY == 0) {
            config.wave.currentY = obj.currentY || config.wave.ele.height;
        }
        config.wave.currentX = sourceX;
        sourceX = config.wave.currentX + d2 == start * scale ? start * scale: sourceX;
        setTimeout(tick, 100);
    }
    context.fillStyle = config.wave.fillStyle;
    img.onload = function() {
        scaleX = config.wave.clientWidth / img.width;
        scaleY = config.wave.clientHeight / img.height;
        if(scaleX >= 1 && scaleY >= 1) {
            scale = scaleX < scaleY ? scaleX : scaleY;
        } else if(scaleX < 1 && scaleY < 1) {
            scale = scaleX > scaleY ? scaleX : scaleY;
        } else {
            scale = scaleX >= 1 ? scaleX : scaleY;
        }
        start = ((config.wave.clientWidth - img.width * scale) / 2) / scale;
        end = ((config.wave.clientHeight - img.height * scale) / 2) / scale;
        sourceX = start * scale;
        startTo = sourceX + img.width * scale;
        config.wave.currentX = sourceX;
        tick();
    };
    img.src = config.wave.sourceImg;
};
