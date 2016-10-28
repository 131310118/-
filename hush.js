/*哈希表*/
function hushTable(){
	var dataStore = [];
	var H = 31;
	var htsize = 10007;
	var total = 0;
	function hush(str){
		total = 0;
		for(var i=0;i<str.length;i++){
			total = total*H + str.charCodeAt(i);
		}
		return total%htsize;
	}
	function put(str){
		var h = this.hush(str);
		if(!dataStore[h]){
			dataStore[h] = new linkList();
			dataStore[h].insert(str,'head');
		}else{
			dataStore[h].insert(str,'head');
		}
	}
	function get(str){
		var h = this.hush(str);
		if(!dataStore[h]){
			return false;
		}else{
			var node = dataStore[h].find(str);
			if(node){
				return node.element;
			}
			return false;
		}
	}
	function del(str){
		var h = this.hush(str);
		if(!dataStore[h]){
			return false;
		}else{
			return dataStore[h].remove(str);
		}
	}
	return {
		'hush':hush,
		'put':put,
		'get':get,
		'del':del
	}
}