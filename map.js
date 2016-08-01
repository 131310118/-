function Graph(){
	function line(s,weight,point){
		this.start = s;
		this.weight = weight;
		this.lineTo = point;
	}
	function point(){
		this.lines = [];
	}
	this.points = [];
	this.addLine = function(start,end,weight){
		if(!this.points[start]){
			this.points[start] = new point();
		}
		if(!this.points[end]){
			this.points[end] = new point();
		}
		this.points[start].lines.push(new line(start,weight,end));
	}
	this.showMap = function(){
		var str = '';
		for(var p in this.points){
			if(this.points[p].lines.length==0){
				str+=p+'->\n';
			}
			for(var i=0;i<this.points[p].lines.length;i++){
				str+=p+'->';
				str+=this.points[p].lines[i].lineTo+' '+this.points[p].lines[i].weight+'\n';
			}
		}
		console.log(str);
	}
	//深度优先搜索
	this.dfs = function(point){
		var mark = [];
		var that = this;
		var dfs = function(point){
			if(!mark[point]){
				mark[point] = true;
				console.log('visit '+point);
				for(var i=0;i<that.points[point].lines.length;i++){
					dfs(that.points[point].lines[i].lineTo);
				}
			}else{
				return;
			}
		}
		dfs(point);
	}
	//广度优先
	this.bfs = function(point){
		var mark = [];
		var que = [point];
		while(que.length){
			var p = que.shift();
			if(!mark[p]){
				mark[p] = true;
				console.log('visit '+p);
				for(var i=0;i<this.points[p].lines.length;i++){
					que.push(this.points[p].lines[i].lineTo);
				}
			}
		}
	}
	//Dijkstra
	//var s = new Graph();s.addLine('a','b',7);s.addLine('a','c',9);s.addLine('a','d',14);s.addLine('b','c',10);
//s.addLine('b','e',15);s.addLine('c','d',2);s.addLine('d','f',9);s.addLine('e','f',6);
	this.dijkstra = function(start,end){
		var min = [];
		var lines = [];
		var path = [];
		var reversePsth = [];
		var mark = [];
		var that = this;
		var str = '';
		mark[start] = true;
		for(var i=0;i<this.points[start].lines.length;i++){
			min[this.points[start].lines[i].lineTo] = this.points[start].lines[i].weight;
			lines.push(this.points[start].lines[i]);
		}
		function loop(){
			lines = lines.sort(function(a,b){return a.weight>b.weight});
			var linee = lines.shift();
			path[linee.lineTo] = linee.start;
			if(linee.lineTo==end){
				return;
			}
			mark[linee.lineTo] = true;
			for(var i=0;i<that.points[linee.lineTo].lines.length;i++){
				if(!mark[that.points[linee.lineTo].lines[i].lineTo]){
					if(min[that.points[linee.lineTo].lines[i].lineTo]){
						if(min[that.points[linee.lineTo].lines[i].lineTo]>that.points[linee.lineTo].lines[i].weight-(-min[linee.lineTo])){
							min[that.points[linee.lineTo].lines[i].lineTo] = that.points[linee.lineTo].lines[i].weight-(-min[linee.lineTo]);
						}
					}else{
						min[that.points[linee.lineTo].lines[i].lineTo] = that.points[linee.lineTo].lines[i].weight-(-min[linee.lineTo]);
					}
					lines.push(that.points[linee.lineTo].lines[i]);
				}
			}
			loop();
		}
		loop();
		reversePsth.push(end);
		while(path[end]){
			reversePsth.push(path[end]);
			end = path[end];
		}
		for(var i=reversePsth.length-1;i>=0;i--){
			str+=reversePsth[i]+'->';
		}
		str+='='+min[reversePsth[0]];
		return str;
	}
	//拓扑
	this.topSort = function(){
		var indegree = [];
		var start = [];
		var that = this;
		var mark = [];
		var top = [];
		for(var p in this.points){
			for(var l in this.points[p].lines){
				if(!indegree[this.points[p].lines[l].lineTo]){
					indegree[this.points[p].lines[l].lineTo] = 1;
				}else{
					indegree[this.points[p].lines[l].lineTo]++;
				}
			}
		}
		for(var p in this.points){
			if(!indegree[p]){
				start.push(p);
			}
		}
		for(var i=0;i<start.length;i++){
			deepfs(start[i]);
		}
		function deepfs(point){
			if(!mark[point]){
				mark[point] = true;
				//console.log('visit '+point);
				for(var i=0;i<that.points[point].lines.length;i++){
					deepfs(that.points[point].lines[i].lineTo);
				}
				top.push(point);
			}else{
				return;
			}
		}
		return top.reverse();
	}
}