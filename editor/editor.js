/**
 * Created by wangj on 2016/8/13.
 */

var KEStatus = {
    selection:undefined,
    range:undefined,
    list:[],
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
        KECommands['redo']();
        KECommands[command]();
    },
    mergeChild:function(element,tagName){
        var nodes = element.getElementsByTagName(tagName),child;
        while(nodes.length){
            while(child = nodes[0].firstChild){
                element.insertBefore(child,nodes[0]);
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
            while(ele&&ele.nodeType==3&&ele.data==''){
                if(type==1){
                    ele = ele.previousSibling;
                    ele.parentNode.removeChild(ele.nextSibling);
                }else{
                    ele = ele.nextSibling;
                    ele.parentNode.removeChild(ele.previousSibling);
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
    }
};
var KECommands = {
    Bold:function(){
        var node = KEStatus.range.startContainer;
        while(node!=kEMainContent){
            if(node.isBold){
                break;
            }
            node = node.parentNode;
        }
        if(node==kEMainContent){
            var b = document.createElement('b');
            b.isBold = true;
            b.appendChild(KEStatus.range.extractContents());
            KEStatus.mergeChild(b,'b');
            KEStatus.range.insertNode(b);
            KEStatus.range.setStart(b, 0);
            KEStatus.range.setEndAfter(b);
            KEStatus.select();
            KEStatus.mergeParent(b);
        }
    },
    redo:function(){
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
    }
};
kEMain.onblur = function(){
    KEStatus.isKEMCDown = false;
    KEStatus.saveCusorPos();
};
//记录用户选中-end
//内容为空无法删除-start
kEMain.addEventListener('keydown',function(e){
    if(e.keyCode==8){
        if(kEMainContent.childNodes[0].innerHTML=='<br>'){
            e.preventDefault();
            e.stopPropagation();
        }
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