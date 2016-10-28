/*字典*/
var dictionary = {
	dataStore:[],
	add:function (key,value){
		this.dataStore[key] = value;
	},
	find:function (key){
		if(this.dataStore[key]){
			return this.dataStore[key];
		}
		return false;
	},
	remove:function (key){
		if(this.dataStore[key]){
			return (delete this.dataStore[key]);
		}
		return false;
	},
	showAll:function (){
		for(var k in this.dataStore){
			console.log(k+'->'+this.dataStore[k]);
		}
	},
	count:function(){
		var n = 0;
		for(var k in this.dataStore){
			n++;
		}
		return n;
	},
	clear:function(){
		this.dataStore = [];
	},
	orderByKey:function(){
		var arr = Object.keys(this.dataStore).sort();
		for(var key in arr){
			console.log(arr[key]+'->'+this.dataStore[arr[key]]);
		}
	},
	orderByValue:function(){
		var dataStore = this.dataStore;
		var arr = Object.keys(this.dataStore).sort(function(a,b){
			return dataStore[a]>dataStore[b];
		});
		for(var key in arr){
			console.log(arr[key]+'->'+this.dataStore[arr[key]]);
		}
	}
}

