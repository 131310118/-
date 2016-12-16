//知乎动画
var animate = (function(){
    var canvas = document.getElementsByClassName('animate')[0];
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight;
    var content = canvas.getContext('2d');
    var img = new Image();
    img.src = './img/qie@1x.png';
    //img.src = "./canvas/beijixiong@1x.png";
    /*var bg_position = [
     {x:0,y:0},{x:650,y:0},{x:1300,y:0},{x:1950,y:0},{x:2600,y:0},{x:3250,y:0},{x:3900,y:0},{x:4550,y:0},{x:5200,y:0},{x:5850,y:0},
     {x:0,y:507},{x:650,y:507},{x:1300,y:507},{x:1950,y:507},{x:2600,y:507},{x:3250,y:507},{x:3900,y:507},{x:4550,y:507},{x:5200,y:507},{x:5850,y:507},
     {x:0,y:1014},{x:650,y:1014},{x:1300,y:1014},{x:1950,y:1014},{x:2600,y:1014},{x:3250,y:1014},{x:3900,y:1014},{x:4550,y:1014},{x:5200,y:1014},{x:5850,y:1014},
     {x:0,y:1521},{x:650,y:1521},{x:1300,y:1521},{x:1950,y:1521},{x:2600,y:1521},{x:3250,y:1521},{x:3900,y:1521},{x:4550,y:1521},{x:5200,y:1521},{x:5850,y:1521},
     {x:0,y:2028},{x:650,y:2028},{x:1300,y:2028},{x:1950,y:2028},{x:2600,y:2028},{x:3250,y:2028},{x:3900,y:2028},{x:4550,y:2028},{x:5200,y:2028},{x:5850,y:2028},
     {x:0,y:2535},{x:650,y:2535},{x:1300,y:2535},{x:1950,y:2535}
     ]*/
    var bg_position = {x:525,y:435};
    var bg_number = {x:10,z:55};
    content.scale(canvas.width / bg_position.x, canvas.height / bg_position.y);
    var x = 0,y = 0,z = 0;
    var p;//播放
    //var z=0;length=54;
    var t = {};
    t.init = function(){
        //clearInterval(p);
        clearTimeout(p);
        z = 0;
        x = 0;
        y = 0;
        imgLoad(img,function(img){
            content.clearRect(0,0,bg_position.x,bg_position.y);
            content.drawImage(img,0,0,bg_position.x,bg_position.y,0,0,bg_position.x,bg_position.y);
        });
    };
    t.playing = function(){
        var play = function() {
            content.clearRect(0,0,bg_position.x,bg_position.y);
            content.drawImage(img,bg_position.x*x,bg_position.y*y,bg_position.x,bg_position.y,0,0,bg_position.x,bg_position.y);
            x += 1;
            z += 1;
            if(x == bg_number.x){
                x = 0;
                y += 1;
            }
            if(z == bg_number.z){
                x = 0;
                y = 0;
                z = 0;
                clearInterval(p);
                return;
            }
            p = setTimeout(play,75);
        };
        imgLoad(img,play);
        //p = setInterval(play,75);
    };
    t.end = function(){
        //clearInterval(p);
        clearTimeout(p);
        z = 0;
        x = 0;
        y = 0;
        imgLoad(img,function(img) {
            content.clearRect(0,0,bg_position.x,bg_position.y);
            content.drawImage(img,0,0,bg_position.x,bg_position.y,0,0,bg_position.x,bg_position.y);
        })
    };
    function imgLoad(img,callback){
        var timer = setInterval(function(){
            if(img.complete){
                clearInterval(timer);
                callback(img);
            }
        },50)
    }
    return t;
})();
animate.init();
/*document.getElementsByClassName('animate')[0].onmouseover = function(){
    event.preventDefault();
    animate.init();
    animate.playing();
};
document.getElementsByClassName('animate')[0].onmouseout = function(){
    event.preventDefault();
    animate.init();
    animate.end();
};*/
document.getElementsByClassName('animate')[0].ontouchstart = function(){
 animate.init();
 animate.playing();
 };

//时钟
var setWatch = function(){
    var canvas = document.getElementsByClassName('watch')[0];
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight;
    var content = canvas.getContext('2d');
    content.scale(canvas.width / 300, canvas.height / 300);
    if(canvas == null){
        return false;
    }
    var myWatch = function(){
        content.save();
        content.clearRect(0,0,500,500);
        content.translate(150,150);
        //content.scale(0.8,0.8);
        content.lineCap = 'round';
        createWatch(content);
        createTime(content);
        content.restore();
    };
    //myWatch();
    setInterval(myWatch,1000);
};
var createTime = function(content){
    content.save();
    var date = new Date();
    var hours = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    content.rotate(Math.PI/6.0*hours+Math.PI/360.0*minute+Math.PI/21600.0*second);
    content.beginPath();
    content.lineWidth = 6;
    content.moveTo(0,10);
    content.lineTo(0,-70);
    content.stroke();
    content.closePath();
    content.restore();

    content.save();
    content.rotate(Math.PI/30.0*minute+Math.PI/1800.0*second);
    content.beginPath();
    content.lineWidth = 4;
    content.moveTo(0,20);
    content.lineTo(0,-100);
    content.stroke();
    content.closePath();
    content.restore();

    content.rotate(Math.PI/30.0*second);
    content.beginPath();
    content.strokeStyle = '#D40000';
    content.lineWidth = 2;
    content.moveTo(0,30);
    content.lineTo(0,-110);
    content.stroke();
    content.closePath();

    content.beginPath();
    content.arc(0,-115,5,0,Math.PI*2,true);
    content.fillStyle = '#555';
    content.fill();
    content.stroke();
    content.closePath();

    content.beginPath();
    content.strokeStyle = '#D40000';
    content.arc(0,0,5,0,Math.PI*2,true);
    content.fillStyle = '#D40000';
    content.closePath();
    content.fill();
    content.stroke();
};
var createWatch = function(content){
    content.beginPath();
    content.lineWidth = 6;
    for(var i=0;i<12;i++){
        content.moveTo(0,120);
        content.lineTo(0,102);
        content.stroke();
        content.rotate(Math.PI/6);
    }
    content.closePath();
    content.beginPath();
    content.lineWidth = 2;
    for(var i=0;i<60;i++){
        content.moveTo(0,120);
        content.lineTo(0,114);
        content.stroke();
        content.rotate(Math.PI/30);
    }
    content.closePath();
    content.beginPath();
    content.strokeStyle = '#325FA2';
    content.lineWidth = 7;
    content.arc(0,0,130,0,Math.PI*2,true);
    content.closePath();
    content.stroke();
};

//绘制矩形
var setRect = function(content){
    content.fillRect(0,0,100,100);//默认为黑色
     content.strokeRect(120,0,100,100);//默认为黑色
     content.fillStyle = 'rgba(255,0,0,0.2)';
     content.strokeStyle = 'rgba(255,0,0,0.2)';
     content.fillRect(240,0,100,100);
     content.strokeRect(240,120,100,100);
};

//清除矩形
var clearRect = function(content){
    content.clearRect(50,50,240,120);
};

/*圆弧
 x:圆心的x坐标
 y:圆心的y坐标
 straAngle:开始角度
 endAngle:结束角度
 anticlockwise:是否逆时针（true）为逆时针，(false)为顺时针
 */
var setRadius = function(content){
    content.beginPath();
    content.arc(100,75,50,0,Math.PI*2,true);
    content.closePath();
    content.fillStyle = 'rgba(0,255,0,0.25)';
    content.fill();
};

//线段
var liner = function(content){
    content.strokeStyle = 'rgb(250,0,0)';
    content.fillStyle = 'rgb(255,0,0)';
    content.lineTo(100,100);
    content.lineTo(200,200);
    content.moveTo(200,50);
    content.lineTo(100,50);
    content.stroke();//绘制路径
};


setWatch();

function draw() {
  var canvas = document.getElementById('translate');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    roundedRect(ctx,12,12,150,150,15);
    roundedRect(ctx,19,19,150,150,9);
    roundedRect(ctx,53,53,49,33,10);
    roundedRect(ctx,53,119,49,16,6);
    roundedRect(ctx,135,53,49,33,10);
    roundedRect(ctx,135,119,25,49,10);

    ctx.beginPath();
    ctx.arc(37,37,13,Math.PI/7,-Math.PI/7,false);
    ctx.lineTo(31,37);
    ctx.fill();

    for(var i=0;i<8;i++){
      ctx.fillRect(51+i*16,35,4,4);
    }

    for(i=0;i<6;i++){
      ctx.fillRect(115,51+i*16,4,4);
    }

    for(i=0;i<8;i++){
      ctx.fillRect(51+i*16,99,4,4);
    }

    ctx.beginPath();
    ctx.moveTo(83,116);
    ctx.lineTo(83,102);
    ctx.bezierCurveTo(83,94,89,88,97,88);
    ctx.bezierCurveTo(105,88,111,94,111,102);
    ctx.lineTo(111,116);
    ctx.lineTo(106.333,111.333);
    ctx.lineTo(101.666,116);
    ctx.lineTo(97,111.333);
    ctx.lineTo(92.333,116);
    ctx.lineTo(87.666,111.333);
    ctx.lineTo(83,116);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91,96);
    ctx.bezierCurveTo(88,96,87,99,87,101);
    ctx.bezierCurveTo(87,103,88,106,91,106);
    ctx.bezierCurveTo(94,106,95,103,95,101);
    ctx.bezierCurveTo(95,99,94,96,91,96);
    ctx.moveTo(103,96);
    ctx.bezierCurveTo(100,96,99,99,99,101);
    ctx.bezierCurveTo(99,103,100,106,103,106);
    ctx.bezierCurveTo(106,106,107,103,107,101);
    ctx.bezierCurveTo(107,99,106,96,103,96);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(101,102,2,0,Math.PI*2,true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(89,102,2,0,Math.PI*2,true);
    ctx.fill();
  }
}

// 封装的一个用于绘制圆角矩形的函数.
function roundedRect(ctx,x,y,width,height,radius){
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
  ctx.lineTo(x+width-radius,y+height);
  ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  ctx.lineTo(x+width,y+radius);
  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
  ctx.lineTo(x+radius,y);
  ctx.quadraticCurveTo(x,y,x,y+radius);
  ctx.stroke();
}

//clip画星星
function drawStars() {
  var ctx = document.getElementById('translate').getContext('2d');
  ctx.translate(250,0);
  ctx.fillRect(0,0,150,150);
  ctx.translate(75,75);

  // Create a circular clipping path
  ctx.beginPath();
  ctx.arc(0,0,60,0,Math.PI*2,true);
  ctx.clip();

  // draw background
  var lingrad = ctx.createLinearGradient(0,-75,0,75);
  lingrad.addColorStop(0, '#232256');
  lingrad.addColorStop(1, '#143778');
  
  ctx.fillStyle = lingrad;
  ctx.fillRect(-75,-75,150,150);

  // draw stars
  for (var j=1;j<50;j++){
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.translate(75-Math.floor(Math.random()*150),
                  75-Math.floor(Math.random()*150));
    drawStar(ctx,Math.floor(Math.random()*4)+2);
    ctx.restore();
  }
  
}
function drawStar(ctx,r){
  ctx.save();
  ctx.beginPath()
  ctx.moveTo(r,0);
  for (var i=0;i<9;i++){
    ctx.rotate(Math.PI/5);
    if(i%2 == 0) {
      ctx.lineTo((r/0.525731)*0.200811,0);
    } else {
      ctx.lineTo(r,0);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
//loading
function load(){
	var canvas = document.getElementById('loading');
	var ctx = canvas.getContext('2d');
	ctx.lineJoin = 'round';
	ctx.lineCap="round";
	ctx.strokeStyle = '#6daade';
	ctx.lineWidth = 50;
	var rect = function(){
		ctx.clearRect(100,100,500,500);
		var position = {
			tx:100,ty:100,
			txto:500,tyto:100,
			bx:500,by:500,
			bxto:100,byto:500,
			lx:100,ly:500,
			lxto:100,lyto:100,
			rx:500,ry:400,
			rxto:500,ryto:500,
			checkx:400,checky:200,
			checkxto:250,checkyto:400,
		}
		var lineRight = function(){
			ctx.moveTo(position.rx,position.ry);
			position.ry+=10;
			ctx.lineTo(position.rx,position.ry);
			ctx.stroke();
			if(position.ry!=position.ryto){
				setTimeout(lineRight,3);
			}else{
				position.ry=100;
				lineCheck();
				lineBottom();
			}
		}
		var lineBottom = function(){
			ctx.moveTo(position.bx,position.by);
			position.bx-=10;
			ctx.lineTo(position.bx,position.by);
			ctx.stroke();
			if(position.bx!=position.bxto){
				setTimeout(lineBottom,2);
			}else{
				lineLeft();
			}
		}
		var lineLeft = function(){
			ctx.moveTo(position.lx,position.ly);
			position.ly-=10;
			ctx.lineTo(position.lx,position.ly);
			ctx.stroke();
			if(position.ly!=position.lyto){
				setTimeout(lineLeft,1);
			}else{
				lineTop();
			}
		}
		var lineTop = function(){
			ctx.moveTo(position.tx,position.ty);
			position.tx+=20;
			ctx.lineTo(position.tx,position.ty);
			ctx.stroke();
			if(position.tx!=position.txto){
				setTimeout(lineTop,1);
			}else{
				lineRightEnd();
			}
		}
		var lineRightEnd = function(){
			ctx.moveTo(position.rx,position.ry);
			position.ry+=25;
			ctx.lineTo(position.rx,position.ry);
			ctx.stroke();
			if(position.ry!=position.ryto){
				setTimeout(lineRightEnd,1);
			}else{
				setTimeout(clearR,500);
			}
		}
		var lineCheck = function(){
			ctx.beginPath();
			ctx.moveTo(position.checkx,position.checky)
			position.checkx-=3;
			position.checky+=4;
			ctx.lineTo(position.checkx,position.checky);
			ctx.stroke();
			if(position.checky!=position.checkyto){
				setTimeout(lineCheck,3);
			}else{
				position.checkxto=200;
				position.checkyto=300;
				lineCheckTo();
			}
		}
		var lineCheckTo = function(){
			ctx.beginPath();
			ctx.moveTo(position.checkx,position.checky)
			position.checkx-=1;
			position.checky-=2;
			ctx.lineTo(position.checkx,position.checky);
			ctx.stroke();
			if(position.checky!=position.checkyto){
				setTimeout(lineCheckTo,3);
			}
		}
		lineRight();
	}
	var clearR = function(){
		var position = {
			tx:100,ty:100,
			txto:500,tyto:100,
			bx:500,by:500,
			bxto:100,byto:500,
			lx:100,ly:500,
			lxto:100,lyto:100,
			rx:500,ry:400,
			rxto:500,ryto:500,
			rx2:500,ry2:100,
			rxto2:500,ryto2:400,
			checkx:400,checky:200,
			checkxto:250,checkyto:400,
			checkxto2:200,checkyto2:300,
			right:false,bottom:false,left:false,top:false,check:false,
		}
		var lineRight = function(){
			if(position.ry==position.ryto){
				position.right = true;
				return;
			}
			ctx.moveTo(position.rx,position.ry);
			ctx.lineTo(position.rxto,position.ryto);
			position.ry+=10;
		}
		var lineBottom = function(){
			if(position.bx==position.bxto){
				position.bottom = true;
				return;
			}
			ctx.moveTo(position.bx,position.by);
			ctx.lineTo(position.bxto,position.byto);
			if(position.right){
				position.bx-=20;
			}
		}
		var lineLeft = function(){
			if(position.ly==position.lyto){
				position.left = true;
				return;
			}
			ctx.moveTo(position.lx,position.ly);
			ctx.lineTo(position.lxto,position.lyto);
			if(position.bottom){
				position.ly-=25;
			}
		}
		var lineTop = function(){
			if(position.tx==position.txto){
				position.top = true;
				return;
			}
			ctx.moveTo(position.tx,position.ty);
			ctx.lineTo(position.txto,position.tyto);
			if(position.left){
				position.tx+=25;
			}
		}
		var lineRightEnd = function(){
			if(position.ry2==position.ryto2){
				return true;
			}
			ctx.moveTo(position.rx2,position.ry2);
			ctx.lineTo(position.rxto2,position.ryto2);
			if(position.top){
				position.ry2+=25;
			}
			return false;
		}
		var lineCheck = function(){
			if(position.checkx==position.checkxto){
				return true;
			}
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(position.checkx,position.checky)
			ctx.lineTo(position.checkxto,position.checkyto);
			if(position.check){
				position.checkxto+=6;
				position.checkyto-=8;
			}
			return false;
		}
		var lineCheckTo = function(){
			if(position.checkxto==position.checkxto2||position.check){
				position.check = true;
				return;
			}
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(position.checkxto,position.checkyto)
			ctx.lineTo(position.checkxto2,position.checkyto2);
			ctx.stroke();
			position.checkxto2+=2;
			position.checkyto2+=4;
		}
		var clear = function(){
			ctx.clearRect(0,0,600,600);
			ctx.beginPath();
			lineRight();
			lineBottom();
			lineLeft();
			lineTop();
			lineCheckTo();
			lineCheck();
			if(!lineRightEnd()){
				ctx.stroke();
				setTimeout(clear,6);
			}else{
				ctx.stroke();
				setTimeout(rect,500);
				//ctx.clearRect(0,0,600,600);
			}
		}
		clear();
	}
	rect();
}
//load();