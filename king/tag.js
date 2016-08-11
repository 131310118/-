/*  breakEvent.js
    Create person : wangjun
    节点封装
 */

function tag(tagName,props){
    var Tag = document.createElement(tagName);
    if(typeof props == 'string'){
        Tag.className = props;
    }
    else{
        if(props != undefined){
            /*if(props.style){
             updateObject(props.style,tag.style);
             delete props.style;
             }*/
            updateObject(props,Tag);
        }
    }
    Tag.append = function (tagName, props) {
        return Tag.appendChild(tag(tagName, props));
    }
    return Tag;
}
function updateObject(inputValue,outputValue){
    for(var key in inputValue) {
        if (inputValue[key] && inputValue[key].constructor == Object) {
            outputValue[key] = this.updateObject(inputValue[key], outputValue[key]);
        }
        else if (inputValue[key] != undefined) {
            outputValue[key] = inputValue[key];
        }
    }
    return outputValue;
}