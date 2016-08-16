/**
 * Created by wangj on 2016/8/13.
 */

var KEStatus = {
    selection:undefined,
    range:undefined,
    list:[],
    redoList:[],
    emptyList:[],
    status:{},
    isKEMCDown:false,
    setFocus:function(){
        kEMain.focus();
        KEStatus.range.setStart(KEStatus.range.startContainer,KEStatus.range.startOffset);
        KEStatus.range.setEnd(KEStatus.range.endContainer,KEStatus.range.endOffset);
        KEStatus.select();
    },
    saveCusorPos:function(){
        KEStatus.selection = window.getSelection?window.getSelection():document.selection;
        KEStatus.range = KEStatus.selection.createRange?KEStatus.selection.createRange():KEStatus.selection.getRangeAt(0);
    },
    select:function(){
        KEStatus.selection.removeAllRanges();
        KEStatus.selection.addRange(KEStatus.range);
    },
    execCommand:function(command){
        if(!KEStatus.range){
            kEMain.focus();
            KEStatus.saveCusorPos();
        }
        if(KEStatus.emptyList.length){
            var obj = KEStatus.emptyList.pop();
            if(obj!=KEStatus.range.commonAncestorContainer){
                if(obj.childNodes&&obj.childNodes.length==1&&obj.childNodes[0].nodeType==3&&obj.childNodes[0].length==1){
                    obj.parentNode&&obj.parentNode.removeChild(obj);
                }else if(obj.nodeType==3&&(obj.data=="​"||obj.data=='')){
                    obj.parentNode&&obj.parentNode.removeChild(obj);
                }else if(obj.childNodes&&obj.childNodes.length&&obj.childNodes[0].nodeType==3&&obj.childNodes[0].length>1){
                    obj.childNodes[0].data = obj.childNodes[0].data.replace("​",'');
                }else if(obj.nodeType==3){
                    obj.data = obj.data.replace("​",'');
                }
            }
        }
        KECommands['save']();
        KECommands[command]();
        KEStatus.initTools();
    },
    mergeChild:function(element,tagName){
        var nodes = element.getElementsByTagName(tagName),child;
        while(nodes.length){
            while(child = nodes[0].firstChild){
                nodes[0].parentNode.insertBefore(child,nodes[0]);
            }
            nodes[0].parentNode.removeChild(nodes[0]);
        }
    },
    mergeParent:function(element){
        var prev = element.previousSibling,next = element.nextSibling,
            i,child = element.firstChild,parent = element.parentNode;
        merge(prev,1);
        merge(next,2);
        function merge(ele,type){
            while(ele&&ele.nodeType==3&&(ele.data==''||ele.data=="​")){
                if(type==1){
                    ele = ele.previousSibling;
                    if(ele){
                        ele.parentNode.removeChild(ele.nextSibling);
                    }
                }else{
                    ele = ele.nextSibling;
                    if(ele){
                        ele.parentNode.removeChild(ele.previousSibling);
                    }
                }
            }
            if(ele&&ele.nodeName==element.nodeName){
                while(ele.childNodes.length){
                    if(type==1){
                        element.insertBefore(ele.childNodes[0],child);
                    }else{
                        element.appendChild(ele.childNodes[0]);
                    }
                }
                parent.removeChild(ele);
            }
        }
    },
    getRangeEndContainer:function(b){
        while(b.lastChild){
            b = b.lastChild;
        }
        return b;
    },
    getRangeStartContainer:function(b){
        while(b.firstChild){
            b = b.firstChild;
        }
        return b;
    },
    mergeEmpty:function(b){
        while(b.previousSibling&& b.previousSibling.nodeType==3&& (b.previousSibling.data=="​"||b.previousSibling.data=='')){
            b.parentNode.removeChild(b.previousSibling)
        };
        while(b.nextSibling&& b.nextSibling.nodeType==3&& (b.nextSibling.data=="​"||b.nextSibling.data=='')){
            b.parentNode.removeChild(b.nextSibling);
        }
    },
    initTools:function(){
        var node = KEStatus.range.startContainer;
        while(node!=kEMainContent){
            node.KEStatus = node.KEStatus||{};
            if(node.KEStatus.isBold){
                break;
            }else if(node.nodeName=='B'){
                node.KEStatus.isBold = true;
                break;
            }
            node = node.parentNode;
        }
        if(node==kEMainContent){
            KEStatus.status.isBold = false;
            kETool_b.className = 'kETool_btn kETool_bg';
        }else{
            kETool_b.className = 'kETool_btn kETool_bg checked';
            KEStatus.status.isBold = true;
        }
    }
};
var KECommands = {
    Bold:function(){
        var node = KEStatus.range.startContainer;
        var obj, b,range,ec;
        while(node!=kEMainContent){
            node.KEStatus = node.KEStatus||{};
            if(node.KEStatus.isBold){
                break;
            }else if(node.nodeName=='B'){
                node.KEStatus.isBold = true;
                break;
            }
            node = node.parentNode;
        }
        if(node==kEMainContent){
            b = document.createElement('b');
            b.KEStatus = {};
            b.KEStatus.isBold = true;
            if(KEStatus.range.collapsed){
                KEStatus.range.insertNode(b);
                b.innerHTML = '&#8203;';
                KEStatus.emptyList.push(b);
                KEStatus.range.setEnd(b, 1);
                KEStatus.range.collapse(false);
                KEStatus.select();
            }else{
                b.appendChild(KEStatus.range.extractContents());
                KEStatus.mergeChild(b,'b');
                KEStatus.range.insertNode(b);
                KEStatus.mergeEmpty(b);
                KEStatus.range.setStart(b, 0);
                obj = KEStatus.getRangeEndContainer(b);
                KEStatus.range.setEnd(obj,obj.length);
                KEStatus.select();
                KEStatus.mergeParent(b);
            }
        }else{
            range = KEStatus.range.cloneRange();
            while(true){
                if(range.startContainer.nodeType==3){
                    if(range.startOffset==0||(range.startOffset==1&&range.startContainer.data[0]=='')){
                        range.setStartBefore(range.startContainer);
                    }else{
                        break;
                    }
                }else{
                    if(range.startOffset==0){
                        range.setStartBefore(range.startContainer);
                    }else{
                        break;
                    }
                }
            }
            range.collapse(true);
            range.setStart(node,0);
            b = document.createElement('b');
            b.appendChild(range.extractContents());
            if((b.childNodes.length&&b.childNodes[0].data=="​") || !b.childNodes.length){
            }else{
                node.parentNode.insertBefore(b,node);
            }
            range = KEStatus.range.cloneRange();
            while(range.startContainer!=node&&range.endContainer!=range.commonAncestorContainer){
                if(range.startContainer.nodeType==3){
                    if(range.startOffset==0||(range.startOffset==1&&range.startContainer.data[0]=='')){
                        range.setStartBefore(range.startContainer);
                    }else{
                        break;
                    }
                }else{
                    if(range.startOffset==0){
                        range.setStartBefore(range.startContainer);
                    }else{
                        break;
                    }
                }
            }
            while(range.endContainer!=node&&range.endContainer!=range.commonAncestorContainer){
                if(range.endContainer.nodeType==3) {
                    if(range.endContainer.length==range.endOffset){
                        range.setEndAfter(range.endContainer);
                    }else{
                        break;
                    }
                }else{
                    if(range.endContainer.childNodes.length==range.endOffset){
                        range.setEndAfter(range.endContainer);
                    }else{
                        break;
                    }
                }
            }
            if(KEStatus.range.collapsed){
                ec = document.createElement('b');
                ec.innerHTML = '&#8203;';
                range.setStart(ec,0);
                range.setEnd(ec,1);
                ec = range.extractContents();
                node.parentNode.insertBefore(ec,node);
                KEStatus.emptyList.push(node.previousSibling);
                KEStatus.range.setEnd(node.previousSibling,1);
                if(node.previousSibling.previousSibling&&node.previousSibling.previousSibling.nodeType==3){
                    KEStatus.range.setStartBefore(node.previousSibling);
                    KEStatus.range.collapse(true);
                    node.parentNode.removeChild(node.previousSibling);
                }
                KEStatus.range.collapse(false);
                KEStatus.select();
            }else{
                //KEStatus.mergeChild(range.commonAncestorContainer,'b');
                ec = range.extractContents();
                b = document.createElement('b');
                b.appendChild(ec);
                KEStatus.mergeChild(b,'b');
                range.setStart(b,0);
                obj = KEStatus.getRangeEndContainer(b);
                range.setEnd(obj,obj.length);
                ec = range.extractContents();
                obj = node.previousSibling;
                node.parentNode.insertBefore(ec,node);
                if(!obj){
                    obj = node.parentNode.firstChild;
                }else{
                    obj = obj.nextSibling;
                }
                KEStatus.range.setStart(KEStatus.getRangeStartContainer(obj),0);
                obj = KEStatus.getRangeEndContainer(node.previousSibling);
                KEStatus.range.setEnd(obj,obj.length);
                KEStatus.select();
            }
            while(node.childNodes.length&&node.firstChild.nodeType==3&&(node.firstChild.data=="​"||node.firstChild.data=='')){
                node.removeChild(node.firstChild);
            }
            if(!node.childNodes.length){
                node.parentNode.removeChild(node);
            }
        }
    },
    save:function(){
        KEStatus.redoList = [];
        KEStatus.list.push({
            content:kEMainContent.innerHTML.trim(),
            range:(function(){
                var start = [],end = [];
                start.push(KEStatus.range.startOffset);
                end.push(KEStatus.range.endOffset);
                rangeMap(start,KEStatus.range.startContainer);
                rangeMap(end,KEStatus.range.endContainer);
                function rangeMap(array,element){
                    var parent = element;
                    while(parent!=kEMainContent){
                        var i=0;
                        var prev = parent.previousSibling;
                        while(prev){
                            i++;
                            prev = prev.previousSibling;
                        }
                        array.push(i);
                        parent = parent.parentNode;
                    }
                }
                return {
                    start:start,
                    end:end
                }
            })()
        });
    },
    undo:function(){
        if(KEStatus.list.length){
            var last = KEStatus.list.pop();
            KEStatus.redoList.push({
                content:kEMainContent.innerHTML.trim(),
                range:(function(){
                    var start = [],end = [];
                    start.push(KEStatus.range.startOffset);
                    end.push(KEStatus.range.endOffset);
                    rangeMap(start,KEStatus.range.startContainer);
                    rangeMap(end,KEStatus.range.endContainer);
                    function rangeMap(array,element){
                        var parent = element;
                        while(parent!=kEMainContent){
                            var i=0;
                            var prev = parent.previousSibling;
                            while(prev){
                                i++;
                                prev = prev.previousSibling;
                            }
                            array.push(i);
                            parent = parent.parentNode;
                        }
                    }
                    return {
                        start:start,
                        end:end
                    }
                })()
            });
            kEMainContent.innerHTML = last.content;
            !function(){
                var s = unrangeMap(last.range.start);
                var e = unrangeMap(last.range.end);
                KEStatus.range.setStart(s.container, s.start);
                KEStatus.range.setEnd(e.container, e.start);
                function unrangeMap(array){
                    var root = kEMainContent,container;
                    for(var i=array.length-1;i>0;i--){
                        container = root.childNodes[array[i]];
                        root = container;
                    }
                    return {
                        start:array[0],
                        container:container
                    }
                }
            }();
            KEStatus.select();
        }
    },
    redo:function(){
        if(KEStatus.redoList.length){
            var last = KEStatus.redoList.pop();
            KEStatus.list.push({
                content:kEMainContent.innerHTML.trim(),
                range:(function(){
                    var start = [],end = [];
                    start.push(KEStatus.range.startOffset);
                    end.push(KEStatus.range.endOffset);
                    rangeMap(start,KEStatus.range.startContainer);
                    rangeMap(end,KEStatus.range.endContainer);
                    function rangeMap(array,element){
                        var parent = element;
                        while(parent!=kEMainContent){
                            var i=0;
                            var prev = parent.previousSibling;
                            while(prev){
                                i++;
                                prev = prev.previousSibling;
                            }
                            array.push(i);
                            parent = parent.parentNode;
                        }
                    }
                    return {
                        start:start,
                        end:end
                    }
                })()
            });
            kEMainContent.innerHTML = last.content;
            !function(){
                var s = unrangeMap(last.range.start);
                var e = unrangeMap(last.range.end);
                KEStatus.range.setStart(s.container, s.start);
                KEStatus.range.setEnd(e.container, e.start);
                function unrangeMap(array){
                    var root = kEMainContent,container;
                    for(var i=array.length-1;i>0;i--){
                        container = root.childNodes[array[i]];
                        root = container;
                    }
                    return {
                        start:array[0],
                        container:container
                    }
                }
            }();
            KEStatus.select();
        }
    }
};

//记录用户选中-start
kEMainContent.onmousedown = function(){
    KEStatus.isKEMCDown = true;
};
kEMainContent.onmouseup = function(){
    if(KEStatus.isKEMCDown){
        KEStatus.saveCusorPos();
        KEStatus.initTools();
    }
};
kEMain.onblur = function(){
    KEStatus.isKEMCDown = false;
    KEStatus.saveCusorPos();
    KEStatus.initTools();
};
//记录用户选中-end
//内容为空无法删除-start
kEMain.addEventListener('keydown',function(e){
    if(e.keyCode==8){
        if(kEMainContent.childNodes[0].innerHTML=='<br>'){
            e.preventDefault();
            e.stopPropagation();
        }
    }else if(e.keyCode==90){
        event.preventDefault();
        KECommands['undo']();
    }else if(e.keyCode==89){
        event.preventDefault();
        KECommands['redo']();
    }
});
//内容为空无法删除-end

kETools.onclick = function(e){
    switch(e.target.id) {
        case 'kETool_b':
            KEStatus.execCommand( 'Bold');
            break;
    }
};