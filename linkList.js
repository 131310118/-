/*链表*/
function linkList(){
	function Node(element,next){
		this.element = element;
		this.next = next;
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
		var newNode = new Node(newElement,node.next);
		node.next = newNode;
		return true;
	}
	function display(){
		var node = this.head;
		while(node!=null){
			console.log(node.element);
			node = node.next;
		}
	}
	function findPrevious(element){
		var node = this.head;
		while(node!=null){
			if(node.next.element==element){
				return node;
			}else{
				node = node.next;
			}
		}
		return undefined;
	}
	function remove(element){
		var node = this.head;
		var pre = this.findPrevious(element);
		if(!pre){
			return false;
		}
		pre.next = pre.next.next;
		return true;
	}
	this.head = new Node('head',null);
	this.find = find;
	this.insert = insert;
	this.remove = remove;
	this.display = display;
	this.findPrevious = findPrevious;
}