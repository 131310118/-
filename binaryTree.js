/*二叉树
* fun:比较函数（可选）
* fun(a, b),a和b为节点的data数据
* */
function binaryTree(data, fun){
	function Node(data,left,right){
		this.data = data||null;
		this.left = left||null;
		this.right = right||null;
		this.count = 1;
	}
	this.root = new Node(data);
    this.fun = fun || function(a, b) {
            return a < b;
        };
	this.insert = function(data){
		if(!this.root.data){
			this.root.data = data;
		}else{
			var r = this.root;
			while(true){
				if(fun(r.data, data)){
					var newNode = new Node(data);
					if(r.right==null){
						r.right = newNode;
						return true;
					}else{
						r = r.right;
					}
				}else if(r.data>data){
					newNode = new Node(data);
					if(r.left==null){
						r.left = newNode;
						return true;
					}else{
						r = r.left;
					}
				}else{
					r.count++;
					return true;
				}
			}
		}
	};
	this.inorder = function(){
		var r = this.root;
		var order = function(r){
			if(r.left){
				order(r.left)
			}
			if(r.data){
				console.log(r.data);
			}
			if(r.right){
				order(r.right);
			}
		};
		order(r);
	};
	this.preorder = function(){
		var r = this.root;
		var order = function(r){
			if(r.data){
				console.log(r.data);
			}
			if(r.left){
				order(r.left)
			}
			if(r.right){
				order(r.right);
			}
		};
		order(r);
	};
	this.postorder = function(){
		var r = this.root;
		var order = function(r){
			if(r.left){
				order(r.left)
			}
			if(r.right){
				order(r.right);
			}
			if(r.data){
				console.log(r.data);
			}
		};
		order(r);
	};
	this.getMin = function(n){
		var r = this.root;
		if(n){
			r = n;
		}
		while(r.left!=null){
			r = r.left;
		}
		console.log(r.data);
	};
	this.getMax = function(n){
		var r = this.root;
		if(n){
			r = n;
		}
		while(r.right!=null){
			r = r.right;
		}
		console.log(r.data);
	};
	this.find = function(data,n){
		var r = this.root;
		if(n){
			r = n;
		}
		while(r!=null){
			if(data>r.data){
				r = r.right;
			}else if(data<r.data){
				r = r.left;
			}else{
				return r;
			}
		}
		return false;
	};
	this.remove = function(data,n){
		n = this.find(data,n);
		if(n.left){
			var r = n.left;
			while(r.right!=null){
				r = r.right;
			}
			n.data = r.data;
			this.remove(data,r);
		}else if(n.right){
			r = n.right;
			while(r.left!=null){
				r = r.left;
			}
			n.data = r.data;
			this.remove(data,r);
		}else{
			n.data = null;
		}
	}
}