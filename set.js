function set(){
	var dataStore = [];
	function add(data){
		if(dataStore.indexOf(data)<0){
			dataStore.push(data);
			return true;
		}else{
			return false;
		}
	};
	function remove(data){
		var index = dataStore.indexOf(data);
		if(index>=0){
			dataStore.splice(index,1);
			return true;
		}
		return false;
	};
	function size(){
		return dataStore.length;
	};
	function union(newSet){
		var unionSet = new set();
		var i = 0;
		var arr = newSet.show();
		var l = arr.length;
		for(i=0;i<dataStore.length;i++){
			unionSet.add(dataStore[i]);
		}
		for(i=0;i<l;i++){
			unionSet.add(arr[i]);
		}
		return unionSet;
	};
	function intersect(newSet){
		var intersectSet = new set();
		var interSet = new set();
		var i = 0;
		var arr = newSet.show();
		var l = arr.length;
		for(i=0;i<dataStore.length;i++){
			intersectSet.add(dataStore[i]);
		}
		for(i=0;i<l;i++){
			if(!intersectSet.add(arr[i])){
				interSet.add(arr[i]);
			}
		}
		return interSet;
	};
	function subset(newSet){
		var arr = newSet.show();
		var l = arr.length;
		if(l<dataStore.length){
			return false;
		}
		for(var i=0;i<dataStore.length;i++){
			if(newSet.add(dataStore[i])){
				newSet.remove(dataStore[i]);
				return false;
			}
		}
		return true;
	};
	function difference(newSet){
		var unionSet = this.union(newSet);
		var interSet = this.intersect(newSet);
		var differenceSet = new set();
		var iArr = interSet.show();
		for(var i=0;i<iArr.length;i++){
			unionSet.remove(iArr[i]);
		}
		return unionSet;
	};
	function show(){
		return dataStore;
	};
	return {
		'add':add,
		'remove':remove,
		'size':size,
		'union':union,
		'intersect':intersect,
		'subset':subset,
		'difference':difference,
		'show':show
	}
}