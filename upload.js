//文件上传-ajax
/*
 * <form id="upload-form" action="upload.php" method="post" enctype="multipart/form-data" >
 *      <input type="file" id="upload" name="upload" /> <br />
 *      <input type="submit" value="Upload" />
 *      <progress id='uploadprogress' min='0' max=100' value='0'>0<progress>
 * </form>
 */
var tests = {
    filereader: typeof FileReader != 'undefined',
    dnd: 'draggable' in document.createElement('span'),
    formdata: !!window.FormData,
    progress: "upload" in new XMLHttpRequest
},
    support = {
        filereader: document.getElementById('filereader'),
        formdata: document.getElementById('formdata'),
        progress: document.getElementById('progress')
    },
    acceptedTypes = {
        'image/png': true,
        'image/jpeg': true,
        'image/gif': true
    };
//图片预览
document.getElementById('upload').addEventListener('change',function(){
    if(typeof FileReader != 'undefined'){
        var acceptedTypes = {
            'image/png':true,
            'image/jpeg':true,
            'image/gif':true
        };
        if(acceptedTypes[document.getElementById('upload').files[0].type] === true){
            var reader = new FileReader();
            reader.onload = function(event){
                event = window.event || event;
                var image = new Image();
                image.src = event.target.result;
                image.width = 100;
                image.height = 100;
                document.body.appendChild(image);
            };
            reader.readAsDataURL(document.getElementById('upload').files[0]);
        }
    }
});
document.getElementsByTagName('form')[0].addEventListener('submit',function(){
    var url = 'www.bug-bank.com';
    if(window.FormData){
        var formData = new FormData();
        formData.append('upload',document.getElementById('upload').files[0]);
        var xhr = new XMLHttpRequest();
        xhr.timeout = 3000;//http请求的时限
        xhr.ontimeout = function(event){
            console.log('请求超时');
        };
        xhr.responseText = 'blob';//二进制文件
        xhr.open('post',url);
        xhr.onload = function(){
            if(xhr.status === 200){
                var blob = new Blob([xhr.reponse],{type:'image/png'});//接收二进制文件
                console.log('上传成功');
            }else{
                console.log('上传失败');
            }
        };
        xhr.upload.onprogress = function(event){
            if(event.lengthComputable){
                var complete = (event.loaded/event.total*100|0);
                var progress = document.getElementById('uploadprogress');
                progress.value = progress.innerHTML = complete;
            }
        };
        xhr.send(formData);
    }
});
//图片拖放
if('draggable' in document.createElement('span')){
    var holder = document.getElementById('holder');
    /*holder.addEventListener('dragover',function(e){
        e = e || window.event;
        e.preventDefault();
        this.className = 'hover';
        return false;
    });
    holder.addEventListener('dragend',function(){
        e = e || window.event;
        e.preventDefault();
        this.className = '';
        return false;
    });*/
    holder.ondragover = function () {
        this.className = 'hover';
        return false;
    };
    holder.ondragend = function () {
        this.className = '';
        return false;
    };
    holder.addEventListener('drop',function(e){
        e.preventDefault();
        this.className = '';
        var files = e.dataTransfer.files;
        readfiles(files);
    },true);
    /*holder.ondrop = function (e) {
        this.className = '';
        e.preventDefault();
        readfiles(e.dataTransfer.files);
    }*/
}
function readfiles(files) {
 /*   debugger;
    var formData = tests.formdata ? new FormData() : null;*/
    for (var i = 0; i < files.length; i++) {
        if (tests.formdata)
            //formData.append('file', files[i]);
        previewfile(files[i]);
    }

   /* // now post a new XHR request
    if (tests.formdata) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/devnull.php');
        xhr.onload = function() {
            progress.value = progress.innerHTML = 100;
        };

        if (tests.progress) {
            xhr.upload.onprogress = function (event) {
                if (event.lengthComputable) {
                    var complete = (event.loaded / event.total * 100 | 0);
                    progress.value = progress.innerHTML = complete;
                }
            }
        }

        xhr.send(formData);
    }*/
}
function previewfile(file) {
    if (tests.filereader === true && acceptedTypes[file.type] === true) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var image = new Image();
            image.src = event.target.result;
            image.width = 250; // a fake resize
            holder.appendChild(image);
        };

        reader.readAsDataURL(file);
    }  else {
        holder.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');
        console.log(file);
    }
}