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
	mergeSort:function(tree, fun) {
		var step = 1;
		var left = 0;
		var right = 1;
		var i = 0;
		var compare = function (a, b) {return a > b;};
		if(fun) {
			compare = fun;
		}
		while(step < tree.length) {
			while(right + step <= tree.length) {
				var leftA = [];
				var rightA = [];
				var j = 0;
				for(i = 0; i < step; i++) {
					leftA.push(tree[left + i]);
				}
				for(i = 0; i < step; i++) {
					rightA.push(tree[right + i]);
				}
				while(leftA.length || rightA.length) {
					if(leftA.length && rightA.length) {
						if(compare(leftA[0], rightA[0])) {
							tree[left + j] = leftA.shift();
						} else {
							tree[left + j] = rightA.shift();
						}
						j++;
					} else if(leftA.length) {
						while(leftA.length) {
							tree[left + j] = leftA.shift();
							j++;
						}
					} else {
						while(rightA.length) {
							tree[left + j] = rightA.shift();
							j++;
						}
					}
				}
				left = right + step;
				right = left + step;
			}
			if(right < tree.length) {
				leftA = [];
				rightA = [];
				j = 0;
				for(i = 0; i < step; i++) {
					leftA.push(tree[left + i]);
				}
				for(i = 0; i < tree.length-right; i++) {
					rightA.push(tree[right + i]);
				}
				while(leftA.length || rightA.length) {
					if(leftA.length && rightA.length) {
						if(compare(leftA[0], rightA[0])) {
							tree[left + j] = leftA.shift();
						} else {
							tree[left + j] = rightA.shift();
						}
						j++;
					} else if(leftA.length) {
						while(leftA.length) {
							tree[left + j] = leftA.shift();
							j++;
						}
					} else {
						while(rightA.length) {
							tree[left + j] = rightA.shift();
							j++;
						}
					}
				}
			}
			step *= 2;
			left = 0;
			right = left + step;
		}
		return tree;
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
					index = i;
					if(min > arr[i * 2 + 1]) {
						min = arr[i * 2 + 1];
						index = i * 2 + 1;
					}
					if(min > arr[i * 2 + 2]) {
						min = arr[i * 2 + 2];
						index = i * 2 + 2;
					}
					if(index != i) {
						temp = arr[index];
						arr[index] = arr[i];
						arr[i] = temp;
					}
				}
			}
		};
		while(arr.length) {
			sort(arr);
			result.push(arr[0]);
			arr[0] = arr[arr.length-1];
			arr.length = arr.length - 1;
		}
		return result;
	}
};