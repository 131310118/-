var sorts = {
	//冒泡算法
	bubbleSort:function(arr){
		for(var i=arr.length-1;i>0;i--){
			for(var j=0;j<i;j++){
				if(arr[j]>arr[j+1]){
					var swap = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = swap;
				}
			}
		}
		return arr;
	},
	//选择排序
	selectionSort:function(arr){
		for(var i=0;i<arr.length-1;i++){
			var min = i;
			for(var j=i+1;j<arr.length;j++){
				if(arr[min]>arr[j]){
					min = j;
				}
			}
			var swap = arr[min];
			arr[min] = arr[i];
			arr[i] = swap;
		}
		return arr;
	},
	//插入排序
	insertSort:function(arr){
		for(var i=1;i<arr.length-1;i++){
			var min = arr[i];
			var minIndex = i;
			//var minData = arr[min];
			while(minIndex>=0&&min<arr[minIndex-1]){
				arr[minIndex] = arr[minIndex-1];
				minIndex--;
			}
			arr[minIndex] = min;
		}
		return arr;
	},
	//希尔排序
	shellSort:function(arr,gaps){
		for(var j=0;j<gaps.length;j++){
			for(var i=gaps[j];i<arr.length-1;i++){
				var min = arr[i];
				var minIndex = i;
				//var minData = arr[min];
				while(minIndex>(gaps[j]-1)&&min<arr[minIndex-gaps[j]]){
					arr[minIndex] = arr[minIndex-gaps[j]];
					minIndex-=gaps[j];
				}
				arr[minIndex] = min;
			}
		}
		return arr;
	},
	//归并排序
	mergeSort:function(arr){
		var step = 1;
		left = 0;
		right = 1;
		while(step<arr.length){
			while(right+step<=arr.length){
				var leftA = [];
				var rightA = [];
				var centerA = [];
				for(var i=0;i<step;i++){
					leftA.push(arr[left+i]);
				}
				for(var i=0;i<step;i++){
					rightA.push(arr[right+i]);
				}
				while(leftA.length||rightA.length){
					if(leftA.length&&rightA.length){
						if(leftA[0]<rightA[0]){
							centerA.push(leftA.shift());
						}else{
							centerA.push(rightA.shift());
						}
					}else if(leftA.length){
						while(leftA.length){
							centerA.push(leftA.shift());
						}
					}else{
						while(rightA.length){
							centerA.push(rightA.shift());
						}
					}
				}
				for(var i=0;i<step;i++){
					arr[left+i] = centerA[i];
				}
				for(var i=0;i<step;i++){
					arr[right+i] = centerA[step+i];
				}
				left = right+step;
				right = left+step;
			}
			if(right<arr.length){
				var leftA = [];
				var rightA = [];
				var centerA = [];
				for(var i=0;i<step;i++){
					leftA.push(arr[left+i]);
				}
				for(var i=0;i<arr.length-right;i++){
					rightA.push(arr[right+i]);
				}
				while(leftA.length||rightA.length){
					if(leftA.length&&rightA.length){
						if(leftA[0]<rightA[0]){
							centerA.push(leftA.shift());
						}else{
							centerA.push(rightA.shift());
						}
					}else if(leftA.length){
						while(leftA.length){
							centerA.push(leftA.shift());
						}
					}else{
						while(rightA.length){
							centerA.push(rightA.shift());
						}
					}
				}
				for(var i=0;i<step;i++){
					arr[left+i] = centerA[i];
				}
				for(var i=0;i<arr.length-right;i++){
					arr[right+i] = centerA[step+i];
				}
			}
			step*=2;
			left = 0;
			right = left+step;
		}
		return arr;
	},
	//堆排序
	//sortby: 1大堆， 0小堆
	heapsort: function(arr, sortby) {
		var result = [];
		var sort = function(arr) {
			for(var i = Math.floor(arr.length/2) - 1; i >= 0; i--) {
				if(sortby) {
					var max = arr[i];
					var index = i;
					if(max < arr[i * 2 + 1]) {
						max = arr[i * 2 + 1];
						index = i * 2 + 1;
					}
					if(max < arr[i * 2 + 2]) {
						max = arr[i * 2 + 2];
						index = i * 2 + 2;
					}
					if(index != i) {
						var temp = arr[index];
						arr[index] = arr[i];
						arr[i] = temp;
					}
				} else {
					var min = arr[i];
					var index = i;
					if(min > arr[i * 2 + 1]) {
						min = arr[i * 2 + 1];
						index = i * 2 + 1;
					}
					if(min > arr[i * 2 + 2]) {
						min = arr[i * 2 + 2];
						index = i * 2 + 2;
					}
					if(index != i) {
						var temp = arr[index];
						arr[index] = arr[i];
						arr[i] = temp;
					}
				}
			}
		}
		while(arr.length) {
			sort(arr);
			result.push(arr[0]);
			arr[0] = arr[arr.length-1];
			arr.length = arr.length - 1;
		}
		return result;
	}
}