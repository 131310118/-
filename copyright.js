//拷贝加版权
function setClipboardText(event){
    event.preventDefault();
    var node = document.createElement('div');
    //对documentfragment不熟，不知道怎么获取里面的内容，用了一个比较笨的方式
    node.appendChild(window.getSelection().getRangeAt(0).cloneContents());
    var htmlData = '<div>著作权归作者所有。<br />'
        + '商业转载请联系作者获得授权，非商业转载请注明出处。<br />'
        + '作者：tiantian<br />链接：http://segmentfault.com/u/tiantian_<br />'
        + '来源：segmentfault<br /><br />'
        + node.innerHTML
        + '</div>';
    var textData = '著作权归作者所有。\n'
        + '商业转载请联系作者获得授权，非商业转载请注明出处。\n'
        + '作者：tiantian\n链接：http://segmentfault.com/u/tiantian_\n'
        + '来源：segmentfault\n\n'
        + window.getSelection().getRangeAt(0);
    if(event.clipboardData){
        event.clipboardData.setData("text/html", htmlData);
        event.clipboardData.setData("text/plain",textData);
    }
    else if(window.clipboardData){
        return window.clipboardData.setData("text", textData);
    }
}
var answer = document.getElementById("answer");
answer.addEventListener('copy',function(e){
    setClipboardText(e);
});