/*
 * find(element)
 * toString()
 * insert(before,isAll,element,...)
 * insertByIndex(number,element,...)
 * append(element)
 * remove(element,isAll)
 * removeByIndex(number)
 * length()
 * contains(element)
 */

function List(){
    var listSize = 0;//列表元素个数
    var pos = 0;//当前位置
    var dataStore = []//初始化一个空数组来保存列表元素
    this.clear = clear;//清空列表
    this.find = find;//查找列表项
    this.toString = toString;//返回列表所有项
    this.insert = insert;//插入
    this.insertByIndex = insertByIndex;//通过索引插入
    this.append = append;//添加
    this.remove = remove;//删除
    this.removeByIndex = removeByIndex;//通过索引删除
    this.front = front;//表头项
    this.end = end;//表尾项
    this.prev = prev;//前一项
    this.next = next;//后一项
    this.length = length;//返回列表元素个数
    this.currPos = current;//返回当前位置
    this.moveTo = moveTo;//移动到指定位置
    this.getElement = getElement;//返回当前元素
    this.contains = contains;//返回是否包含指定元素
    for(var i=0;i<arguments.length;i++){
        //if(arguments[i] instanceof Array){
        //    dataStore = dataStore.concat(arguments[i]);
        //    listSize+=arguments[i].length;
        //    continue;
        //}
        if(typeof(arguments[i])=='string'||typeof(arguments[i])=='number'||typeof(arguments[i])=='object'||typeof(arguments[i])=='function'){
            dataStore[listSize++] = arguments[i];
            continue;
        }
        //else if(typeof(arguments[i])=='function'){
        //    append(arguments[i]());
        //}
        else if(typeof(arguments[i])=='undefined'){
            throw new Error("List(element),element is undefined");
        }
        else{
            throw new Error("未知错误");
        }
        return dataStore;
    }
    function getElement(){
        return dataStore[pos];
    }
    function moveTo(number){
        if(typeof number == 'number'){
            if(number>=dataStore.length||number<-dataStore.length){
                return false;
            }
            else{
                pos = number;
                return true;
            }
        }
    }
    function current(){
        return pos;
    }
    function next(){
        return dataStore[pos+1];
    }
    function prev(){
        return dataStore[pos-1];
    }
    function end(){
        return dataStore[-1];
    }
    function front(){
        return dataStore[0];
    }
    function append(){
        for(var i=0;i<arguments.length;i++){
            //if(arguments[i] instanceof Array){
            //    dataStore = dataStore.concat(arguments[i]);
            //    listSize+=arguments[i].length;
            //    continue;
            //}
            if(typeof(arguments[i])=='string'||typeof(arguments[i])=='number'||typeof(arguments[i])=='object'||typeof(arguments[i])=='function'){
                dataStore[listSize++] = arguments[i];
                continue;
            }
            //else if(typeof(arguments[i])=='function'){
            //    append(arguments[i]());
            //}
            else if(typeof(arguments[i])=='undefined'){
                throw new Error("存在append(undefined)");
            }
            else{
                throw new Error("未知错误");
            }
        }
        return true;
    }
    function find(element,isAll){
        isAll = typeof(isAll)=='undefined'?0:isAll;
        if(!(typeof(isAll)!='boolean'||typeof(isAll)=='undefined'||typeof(isAll)=='number')){
            throw new Error("find(element,isAll),isAll is a Boolean or number");
        }
        //if(typeof(element)=='function'){
        //    return find(element(),isAll);
        //}
        if(!(typeof(element)=='string'||typeof(element)=='number'||typeof(element)=='object'||typeof(element)=='function')){
            throw new Error("find(element,isAll),element must be string,number or object")
        }
        if(typeof(isAll)=='number'){
            if(isAll>=0){
                for(var i=0;i<listSize;i++){
                    if(dataStore[i]==element && isAll--==0){
                        return i;
                    }
                }
            }
            else{
                for(var i=listSize;i>=0;i--){
                    if(dataStore[i]==element && ++isAll==0){
                        return i;
                    }
                }
            }
        }
        else{
            if(isAll){
                var  arr = [],j=0;
                for(var i=0;i<listSize;i++){
                    if(dataStore[i]==element){
                        arr[j++] = i;
                    }
                }
                return arr;
            }
            else{
                for(var i=0;i<listSize;i++){
                    if(dataStore[i]==element){
                        return i;
                    }
                }
            }
        }
        return -1;
    }
    function toString(){
        return dataStore;
    }
    function remove(element,isAll){
        try{
            isAll = find(element,isAll);
        }catch(e){
            if(e.message=="find(element,isAll),isAll is a Boolean or number"){
                throw new Error("remove(element,isAll),isAll is a Boolean or number");
            }
            else if(e.message=="find(element,isAll),element must be string,number or object"){
                throw new Error("remove(element,isAll),element must be string,number or object")
            }
        }
        if(isAll==-1){
            return false;
        }
        else if(isAll instanceof Array){
            for(var i=0;i<isAll.length;i++){
                dataStore.splice(isAll[i]-i,1);
            }
            listSize-=isAll.length;
            return true;
        }
        else{
            dataStore.splice(isAll,1);
            listSize--;
            return true;
        }
    }
    function removeByIndex(index,number){
        number = typeof(number)=='undefined'?1:number;
        if(typeof(index)=='number'&&typeof(number)=='number'){
            if(index>=listSize||index<-listSize){
                throw new Error("removeByIndex(index),index is an illegal number")
            }
            dataStore.splice(index,number);
            return true
        }
    }
    function length(){
        return listSize;
    }
    function insert(before,isAll,element){
        for(var i=2;i<arguments.length;i++) {
            element = arguments[i];
            //if (typeof(element) == 'function') {
            //    return find(element(), isAll);
            //}
            if (!(typeof(element) == 'string' || typeof(element) == 'number' || typeof(element) == 'object'||typeof(element) == 'function')) {
                throw new Error("insert(element,after,isAll),element must be string,number or object")
            }
            try {
                isAll = find(before, isAll);
            } catch (e) {
                if (e.message == "find(element,isAll),isAll is a Boolean or number") {
                    throw new Error("remove(element,isAll),isAll is a Boolean or number");
                }
                else if (e.message == "find(element,isAll),element must be string,number or object") {
                    throw new Error("remove(element,isAll),element must be string,number or object")
                }
            }
            if (isAll == -1) {
                return false;
            }
            else if (isAll instanceof Array) {
                for (var i = 0; i < isAll.length; i++) {
                    dataStore.splice(isAll[i] + i, 0, element);
                }
                listSize += isAll.length;
                return true;
            }
            else {
                dataStore.splice(isAll, 0, element);
                listSize++;
                return true;
            }
        }
    }
    function insertByIndex(number,element){
        for(var i=1;i<arguments.length;i++) {
            element = arguments[i];
            //if (typeof(element) == 'function') {
            //    return find(element(), isAll);
            //}
            if (!(typeof(element) == 'string' || typeof(element) == 'number' || typeof(element) == 'object'||typeof(element) == 'function')) {
                throw new Error("insertByIndex(element,number),element must be string,number or object")
            }
            number = typeof(number) == 'undefined' ? 0 : number;
            if (typeof(number) == 'number') {
                if (number >= listSize || number < -listSize) {
                    throw new Error("removeByIndex(index),index is an illegal number")
                }
                dataStore.splice(number, 0, element);
                listSize++;
                return true
            }
            else{
                throw new Error("insertByIndex(number,element),number is an array index")
            }
        }
    }
    function clear(){
        dataStore = [];
        listSize = pos = 0;
        return true;
    }
    function contains(element){
        //if (typeof(element) == 'function') {
        //    return find(element(), isAll);
        //}
        if (!(typeof(element) == 'string' || typeof(element) == 'number' || typeof(element) == 'object'||typeof(element) == 'function')) {
            throw new Error("contains(element,number),element must be string,number or object")
        }
        for(var i=0;i<listSize;i++){
            if(dataStore[i]==element){
                return true;
            }
            else if(typeof(element)=="object"&&typeof(dataStore[i])=="object"){
                return element.sort().toString()==dataStore[i].sort().toString();
            }
        }
        return false;
    }
}
var list = new List("king",[1,2],3,2);