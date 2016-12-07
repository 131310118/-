/**
 * 导入json格式或者对象形式自动建树
 */


/*
#tree .child_list{
    padding: 10px 20px;
    position: relative;
}
#tree .child_list > ul{
    padding-left: 20px;
}
#tree .child_list.open > ul{
    border-left: 1px dashed black;
}
#tree a{
    text-decoration: none;
    position: relative;
}
#tree a:after{
    content: " ";
    position: absolute;
    width: 20px;
    border-top: 1px dashed black;
    left: -21px;
    top: 6px;
}
#tree a:before{
    padding-right:10px;
}
#tree a .fa-plus,#tree a .fa-minus{
    position: absolute;
    left: -26px;
    z-index: 1;
}
#tree ul{
    list-style: none;
}
#tree .child_li{
    padding-left:43.7px;
    position: relative;
}
#tree .child_li .liner{
    margin: 0;
    border-top: 1px dashed black;
    width: 40px;
    position: absolute;
    left: 0;
    top: 9px;
}
#tree .child_li .liner_left{
    margin: 0;
    border-left: 1px dashed black;
    height: 18px;
    position: absolute;
    left: 0;
    top: -9px;
}
 <div id="tree">
 </div>
 <script src="./jquery-3.0.0.js" type="text/javascript"></script>
 <script src="tree.js" type="text/javascript">
*/
function tree(obj,parent){
    this.data = undefined;//节点数据
    this.length = 0;//子节点数
    this.parent = parent || null;
    this.children = (function(obj,t){//子节点，{}
        var obj = obj || {};
        var root = {};
        for (var i in obj) {
            t.data = i;//保存节点数据
            if (obj[i] instanceof Array) {
                for (var j = 0; j < obj[i].length; j++) {
                    if (typeof obj[i][j] == 'object') {
                        root[j] = new tree(obj[i][j],t);
                    }
                    else {
                        var b = {};
                        b[obj[i][j]] = [];
                        root[j] = new tree(b,t);
                    }
                }
                t.length = j;
            } else if(typeof obj[i] == 'object') {
                var l = 0;
                for(var key in obj[i]) {
                    if(typeof obj[i][key] == 'object') {
                        var b = {};
                        b[key] = obj[i][key];
                        root[l++] = new tree(b, t);
                    } else {
                        var b = {};
                        b[key] = obj[i][key];
                        root[l++] = new tree(b, t);
                    }
                }
                t.length = l;
            } else if(typeof obj[i] == 'string'){
                var b = {};
                b[obj[i]] = {};
                root[0] = new tree(b, t);
                t.length = 1;
            }
        }
        return root;
    })(obj,this);
}
tree.prototype.constructor = tree;
tree.prototype.getData = function(){
    return this.data;
}
tree.prototype.getChildren = function(){
    return this.children;
}
tree.prototype.setData = function(data){
    if(this.parent){
        for(var i in this.parent.children){
            if(this.parent.children[i].data==data){
                return false;
            }
        }
    }
    this.data = data;
    return true;
}
tree.prototype.setNode = function(obj){
    var t = this;
    var p = t.tree;
    //var newTree = new tree(obj);
    t.children = (function(obj,t){//子节点，{}
        var obj = obj || {};
        var root = {};
        for (var i in obj) {
            t.data = i;
            if (obj[i] instanceof Array) {
                for (var j = 0; j < obj[i].length; j++) {
                    if (typeof obj[i][j] == 'object') {
                        root[j] = new tree(obj[i][j],t);
                    }
                    else {
                        var b = {};
                        b[obj[i][j]] = [];
                        root[j] = new tree(b,t);
                    }
                }
                t.length = j;
            }
        }
        return root;
    })(obj,t);
    var x = p.parentNode;
    x.removeChild(p);
    x.appendChild(t.upDateLiner(t.html()));
    return this;
}
tree.prototype.insert = function(node,children){
    var n = this.find(node);
    if(n){
        var l = n.length;
        while(n.children[l]){
            l+=1;
        }
        n.children[l] = new tree(children,n);
        n.length+=1;
        if(n.tree.nodeName=='UL'){
            var c = n.children[l].html();
            //c.className = 'child_list open';
            n.tree.getElementsByClassName('child_list')[0].appendChild(c);
            n.tree = n.upDateLiner(n.tree);
        }
        else{
            var p = n.tree.parentNode;
            var nextSibling = n.tree.nextSibling;
            p.removeChild(n.tree);
            if(nextSibling){
                p.insertBefore(n.html(),nextSibling);
            }
            else{
                p.appendChild(n.html());
            }
            this.parent.upDateLiner(this.parent.tree);
        }
    }
}
tree.prototype.isEmpty = function(){//对象是否为空
    for(var i in this.children){
        return false;
    }
    return true;
}
tree.prototype.upDateLiner = function(ele){//虚线
    var child_list =  ele.getElementsByClassName('child_list');
    for(var i=0;i<child_list.length;i++){
        if(child_list[i].lastChild&&child_list[i].lastChild.nodeName!='LI'){
            child_list[i].lastChild.style.borderLeft = 'none';
            if(child_list[i].lastChild.previousSibling&&child_list[i].lastChild.previousSibling.nodeName=='LI'){
                child_list[i].lastChild.previousSibling.getElementsByClassName('liner_left')[0].style.top = '0';
            }
        }
        else if(child_list[i].lastChild){
            child_list[i].lastChild.getElementsByClassName('liner_left')[0].style.top = '-9px';
        }
        if(child_list[i].lastChild&&child_list[i].lastChild.previousSibling&&child_list[i].lastChild.previousSibling.nodeName=='UL'){
            child_list[i].lastChild.previousSibling.style.borderLeft = '1px dashed black';
        }
    }
    return ele;
}
tree.prototype.html = function(){//生成dom
    var fun_none = function(){console.log(3)};
    var upp = function(){
        if(event.target.className.substring(3)!='fa-minus'){
            return;
        }
        var e = document.createEvent('MouseEvents');
        e.initEvent('click',true,true);
        var opens = this.nextSibling.getElementsByClassName('open');
        //for(var i=0;i<opens.length;i = i-0+1){
        while(opens.length){
            opens[0].previousSibling.getElementsByClassName('fa-minus')[0].dispatchEvent(e);
        }
        $(this.nextSibling).slideUp(0);
        this.removeEventListener('click',upp,false);
        down(this);
        this.nextElementSibling.className = 'child_list';
        this.getElementsByClassName('fa')[0].className = 'fa fa-plus';
    }
    var downn = function(){
        if(event.target.className.substring(3)!='fa-plus'){
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        $(this.nextSibling).slideDown(0);
        this.removeEventListener('click',downn,false);
        up(this);
        this.nextElementSibling.className = 'child_list open';
        this.getElementsByClassName('fa')[0].className = 'fa fa-minus';
    }
    var down = function(ele){
        ele.addEventListener('click',downn,false)
    }
    var up = function(ele){
        ele.addEventListener('click',upp,false)
    }
    var create = (function(node){
        var ul_t = document.createElement('ul');
        //ul_t.className = 'child_list open';
        var a = document.createElement('a');
        var status = document.createElement('span');
        var ul_b = document.createElement('ul');
        var option = function(e){//操作框
            if(e.button == 2&&(e.target.className.substring(3)=='fa-file'|| (e.target.parentNode.className=='child_li'))){
                var op = document.getElementsByClassName('options')[0];
                if(op){
                    op.parentNode.removeChild(op);
                }
                document.onclick = function(e){
                    var op = document.getElementsByClassName('options')[0];
                    op.parentNode.removeChild(op);
                    document.onclick = null;
                }
                e.preventDefault();
                var target = e.target;
                var tips = document.createElement('div');
                tips.className = 'options';
                tips.style.left = e.offsetX+'px';
                tips.style.top = e.offsetY+'px';

                var insert = document.createElement('div');
                insert.className = 'insert';
                insert.appendChild(document.createTextNode('插入'));

                var del = document.createElement('div');
                del.className = 'delete';
                del.appendChild(document.createTextNode('删除'));

                var rename = document.createElement('div');
                rename.className = 'rename';
                rename.appendChild(document.createTextNode('重命名'));

                tips.appendChild(insert);
                tips.appendChild(del);
                tips.appendChild(rename);
                target.appendChild(tips);
                insert.addEventListener('click',function(){
                    event.stopPropagation();
                    event.preventDefault();
                    node.insert(target.firstChild.data,{'新建文件':[]});
                    var t = node.tree.lastChild.lastChild.firstChild;
                    reName(t);
                    document.onclick = null;
                    target.removeChild(tips);
                })
                del.addEventListener('click',function(){
                    event.stopPropagation();
                    event.preventDefault();
                    node.parent.delete(target.firstChild.data);
                    document.onclick = null;
                })
                var reName = function(t){
                    var before = t.firstChild.nodeValue;
                    var input = document.createElement('input');
                    input.className = 'newName';
                    input.value = t.firstChild.nodeValue;
                    t.removeChild(t.firstChild);
                    t.appendChild(input);
                    t.lastChild.focus();
                    t.lastChild.select();
                    var removeInput = function(){
                        if(input.value&&input.value!=before){
                            if(node.setData(input.value)){
                                t.insertBefore(document.createTextNode(input.value),t.firstChild);
                            }
                            else {
                                console.log('同级目录下不允许有相同的文件夹或文件');
                            }
                        }
                        else{
                            t.insertBefore(document.createTextNode(before),t.firstChild);
                        }
                        t.removeChild(input);
                    }
                    input.onblur = function(){
                        removeInput();
                    }
                    input.onkeydown = function(k){
                        if(k.keyCode==13|| k.keyCode==108){
                            input.onblur = null;
                            removeInput();
                        }
                    }
                    document.onclick = null;
                }
                rename.addEventListener('click',function(){
                    event.stopPropagation();
                    event.preventDefault();
                    reName(target);
                    target.removeChild(tips);
                })
            }
        };
        if(!node.isEmpty()){
            status.className = 'fa fa-minus';
            a.appendChild(document.createTextNode(node.data));
            a.appendChild(status);
            a.className = 'fa fa-file';
            a.href = 'javascript:void(0);';
            ul_t.appendChild(a);
            ul_b.className = 'child_list open';
            ul_t.appendChild(ul_b);
            up(a);
            a.onmousedown = option;
        }
        else{
            ul_t = document.createElement('li');
            var span = document.createElement('span');
            var liner = document.createElement('p');
            var liner_left = document.createElement('p');
            liner.className = 'liner';
            liner_left.className = 'liner_left';
            ul_t.className = 'child_li';
            span.appendChild(document.createTextNode(node.data));
            ul_t.appendChild(span);
            ul_t.appendChild(liner);
            ul_t.appendChild(liner_left);
            ul_t.onmousedown = option;
        }
        for(var i in node.children){
            ul_b.appendChild(node.children[i].html());
        }
        return ul_t;
    })(this);
    this.tree = create;
    return create;
}
tree.prototype.inorder = function(){//遍历
    if(!this.isEmpty()){
        for(var i in this.children){
            this.children[i].inorder();
        }
        console.log(this.data);
    }
    else{
        console.log(this.data);
    }
}
tree.prototype.preorder = function(){//遍历
    if(!this.isEmpty()){
        console.log(this.data);
        for(var i in this.children){
            this.children[i].preorder();
        }
    }
    else{
        console.log(this.data);
    }
}
tree.prototype.find = function(node){//查找指定节点
    if(node instanceof Array) {
        if(node.length > 0) {
            if(this.data == node[0]) {
                node.shift();
                if(node.length ==0 ) {
                    return this;
                } else {
                    return this.find(node);
                }
            } else {
                if(!this.isEmpty()){
                    for(var i in this.children){
                        var t = this.children[i].find(node);
                        if(t){
                            return t;
                        }
                    }
                }
                else{
                    return false;
                }
            }
        }
    } else {
        if(this.data==node){
            return this;
        }
        else{
            if(!this.isEmpty()){
                for(i in this.children){
                    t = this.children[i].find(node);
                    if(t){
                        return t;
                    }
                }
            }
            else{
                return false;
            }
        }
    }
}
tree.prototype.delete = function(node){
    //if(!this.isEmpty()){
    for(var i in this.children){
        if(this.children[i].data==node){
            if((this.tree.getElementsByClassName('child_list')[0].removeChild(this.children[i].tree))&&(delete this.children[i])){
                this.length-=1;
                this.upDateLiner(this.tree);
                return true;
            }
            return false;
        }
        if(this.children[i].length){
            if(this.children[i].delete(node)){
                return true;
            }
        }
    }
    //}
    return false;
}
document.oncontextmenu = function(e){//阻止默认右击事件
    e.preventDefault();
};
var documents = {
	'我的电脑':[
		{'我的文档':['index.html']},
		{'我的视频':[
			{'学习视频':[
				{'canvas高级动画':['canvas.js']}
			]},
			{'搞笑视频':[
				{'囧兔兔':['笑死我了.mp4']}
			]},
            {'搞事情': '就是要搞事情'}
		]}
	]
};
var objectData = {
    '我的电脑': {
        '我的文档': 'index.html',
        '我的视频': {
            '学习视频': {
                'canvas高级动画': 'canvas.js'
            },
            '搞笑视频': {
                '囧兔兔': '笑死我了.mp4'
            },
            '搞事情': '就是要搞事情'
        }
    }
};
var t = new tree(documents);
var tw = new tree(objectData);
document.getElementById('tree').appendChild(t.upDateLiner(t.html()));
document.getElementById('tree').appendChild(tw.upDateLiner(tw.html()));
/* t.delete('3');
console.log(t.find('f'));
t.find('w').setNode({5:[{2:[{3:[7]},9]},{w:[{f:[{jsf:['jdh','hfj']},'hi']},'odusj']}]}).upDateLiner(t.tree); */
//t.insert('4',{s:[]});
/*var tree = (function(){
 var data;
 var children = [];
 var getData = function(){
 return data;
 };
 var getChildren = function(){
 return children;
 }
 var setData = function(dd){
 data = dd;
 }
 var insert = function(dd){
 var node = Object.create(tree);
 node.setData(dd);
 children[dd] = [];
 }
 var tree = function(obj){
 var obj = obj || {};
 var node = {};
 var root = [];
 for(var i in obj){
 if(obj[i] instanceof Array){
 for(var j=0;j<obj[i].length;j++){
 if(typeof obj[i][j] == 'object'){
 var node = Object.create(tree);
 root.push(node.tree(obj[i][j]));
 }
 else{
 root.push(obj[i][j]);
 }
 }
 }
 node[i] = root;
 }
 return node;
 }
 return {
 data:data,
 children:children,
 getData:getData,
 getChildren:getChildren,
 setData:setData,
 insert:insert,
 tree:tree
 }
 })();*/
