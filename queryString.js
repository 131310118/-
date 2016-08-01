function queryString(key){
    var json = JSON.parse('{' + (window.location.search.replace(/(\?|\&)+/g, '\"\,\"').replace(/\=+/g, '\"\:\"') + '\"').substr(2) + '}');
    return json[key];
}
