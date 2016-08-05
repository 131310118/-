/*  breakEvent.js
    Create person : wangjun
    节点封装
 */

function tag(tagName,props){
    var tag = document.createElement(tagName);
    if(typeof props == 'string'){
        tag.className = props;
    }
    else{
        if(props != undefined){
            /*if(props.style){
                updateObject(props.style,tag.style);
                delete props.style;
            }*/
            updateObject(props,tag);
        }
    }
    tag.append = function (tagName, props) {
        return tag.appendChild(tag(tagName, props));
    }
    return tag;
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