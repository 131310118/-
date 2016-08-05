/*  callFile.js
    Create person : wangjun
    调用文件
 */

function callFile(files){
    var frame = document.createDocumentFragment();
    var f = function (file){
        if(/\.js$/.test(file)){
            var script = document.createElement('script');
            script.setAttribute('src',file);
            script.setAttribute('type','text/javascript');
            frame.appendChild(script);
        }else if(/\.css/.test(file)) {
            var link = document.createElement('link');
            link.setAttribute('href', file);
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('media', 'all');
            frame.appendChild(link);
        }
    }
    if(files.length){
        for(var i=0;i<files.length;i++){
            f(files[i]);
        }
    }else{
        f(files);
    }
    document.head.appendChild(frame);
}