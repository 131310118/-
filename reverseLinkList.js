function Node(element,next){
	this.element = element;
	this.next = next;
	this.pre = null;
}
function reverseLinkList(){
	this.head = new Node('head',null);
	this.head.pre = null;
	this.find = find;
	this.insert = insert;
	this.remove = remove;
	this.display = display;
	this.findLast = findLast;
	this.dispReverse = dispReverse;
}
function find(element){
	var node = this.head;
	while(node!=null){
		if(node.element==element){
			return node;
		}else{
			node = node.next;
		}
	}
	return false;
}
function insert(newElement,item){
	var node = this.find(item);
	if(node){
		var newNode = new Node(newElement,node.next);
		newNode.pre = node;
		if(node.next){
			node.next.pre = newNode;
		}
		node.next = newNode;
		return true;
	}else{
		return false;
	}
}
function remove(element){
	var node = this.find(element);
	node.pre.next = node.next;
	node.next.pre = node.pre;
	node.next = null;
	node.pre = null;
}
function display(){
	var node = this.head;
	while(node!=null){
		console.log(node.element);
		node = node.next;
	}
}
function findLast(){
	var node = this.head;
	while(node.next!=null){
		node = node.next;
	}
	return node;
}
function dispReverse(){
	var node = this.findLast();
	while(node!=null){
		console.log(node.element);
		node = node.pre;
	}
}