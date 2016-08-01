function Queue(){
	var dataStore = [];
	return {
		enqueue:function(element){
			dataStore.push(element);
		},
		dequeue:function(){
			dataStore.shift();
		},
		front:function(){
			return dataStore[0];
		},
		back:function(){
			return dataStore[dataStore.length-1];
		},
		toString:function(){
			/* var str = '';
			for(var i=0;i<dataStore.length-1;i++){
				str+=dataStore[i]+',';
			}
			str+=dataStore[length];
			return str; */
			return dataStore.toString();
		},
		empty:function(){
			return dataStore.length==0;
		},
		length:function(){
			return dataStore.length;
		},
		clear:function(){
			dataStore = [];
		}
	}
}

//优先队列
function pQueue(){
	var dataStore = [];
	return {
		enqueue:function(element,code){
			if(!dataStore[code]){
				dataStore[code] = [];
				dataStore[code].push(element);
			}else{
				dataStore[code].push(element);
			}
		},
		dequeue:function(){
			for(var i=0;i<dataStore.length;i++){
				if(dataStore[i]){
					if(dataStore[i].length>0){
						dataStore[i].shift();
						return;
					}
				}
			}
		},
		front:function(){
			for(var i=0;i<dataStore.length;i++){
				if(dataStore[i]){
					if(dataStore[i].length>0){
						dataStore[i].front();
						return;
					}
				}
			}
		},
		back:function(){
			for(var i=dataStore.length-1;i>=0;i--){
				if(dataStore[i]){
					if(dataStore[i].length>0){
						return dataStore[i][dataStore[i].length-1];
					}
				}
			}
		},
		toString:function(){
			/* var str = '';
			for(var i=0;i<dataStore.length-1;i++){
				str+=dataStore[i]+',';
			}
			str+=dataStore[length];
			return str; */
			return dataStore.toString();
		},
		empty:function(){
			return dataStore.length==0;
		},
		length:function(){
			var l = 0;
			for(var i=0;i<dataStore.length;i++){
				if(dataStore[i]){
					if(dataStore[i].length>0){
						l+=dataStore[i].length;
					}
				}
			}
			return l;
		},
		clear:function(){
			dataStore = [];
		}
	}
}

//基数排序
function distribute(arr){
	var arrQueue = [];
	var n = 100;
	!function(){
		for(var i=0;i<arr.length;i++){
			var e = arr[i]%10;
			if(!arrQueue[e]){
				var q = Queue();
				q.enqueue(arr[i]);
				arrQueue[e] = q;
			}else{
				arrQueue[e].enqueue(arr[i]);
			}
		}
	}()
	var sort = function(array,n){
		var end = [];
		for(var i=0;i<10;i++){
			if(array[i]){
				while(array[i].length()){
					var e = Math.floor((array[i].front()%n)/(Math.floor(n/10)));
					if(!end[e]){
						var q = Queue();
						q.enqueue(array[i].front());
						end[e] = q;
					}else{
						end[e].enqueue(array[i].front());
					}
					array[i].dequeue();
				}
			}
		}
		if(end.length!=1){
			end = sort(end,n*10);
		}
		return end;
	}
	end = sort(arrQueue,n);
	return end;
}
var s = distribute([61,95,71,53]);