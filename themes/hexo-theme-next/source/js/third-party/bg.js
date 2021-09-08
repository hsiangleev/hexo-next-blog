;(function() {
    var obj={
        "1": "https://uploadbeta.com/api/pictures/random",                                          // 必应风景人物
        "2": "https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture",        // 必应每日图片
        "3": "http://acg.bakayun.cn/randbg.php",                                                    // 二次元
        "4": "https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302",                   // 风景（有点慢）
        "11": "https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302&device=mobile",    // 手机 
        "21": "https://cdn.jsdelivr.net/gh/hsiangleev/randomImage/img_pc/"+Math.ceil(Math.random()*20)+".jpg",
        "22": "https://cdn.jsdelivr.net/gh/hsiangleev/randomImage/img_phone/"+Math.ceil(Math.random()*20)+".jpg",
    }
    var src=obj["21"];
    if(document.body.clientWidth < 768) src = obj["22"];
    
    document.querySelector('.lee-bg').innerHTML = '<img src="'+src+'" />';

    var $get = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange=function(){
            if (xhr.readyState==4 && xhr.status==200) {
                callback(JSON.parse(xhr.responseText))
            }
        }
        xhr.open("GET",url,true);
        xhr.send();
    }
    $get("https://v1.hitokoto.cn/", function(data) {
        document.querySelector(".site-description").innerHTML = data.hitokoto
    })
})()
