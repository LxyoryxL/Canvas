// JavaScript Document
var music = document.getElementById("mymusic"); //audio对象
var prograss = document.getElementById("prograss"); //进度条
var curtxt = document.getElementById("currenttime");
var duration = document.getElementById("duration");
var music_pic = document.getElementById("music_pic");
var deg = 0; //旋转角度
var disctimer, prograsstimer; //碟片计时器,进度条计时器
var musicindex = 0; //音乐索引
var musics = new Array("http://stor.cloudmusics.cn/mp3/2019/08/80d2527c49c6969252654472b3bde30b.mp3", "http://stor.cloudmusics.cn/mp3/2019/08/ef610fa5259ce155be39f81b78fd73d5.mp3"); //音乐数组
var music_pics = new Array("default", "000001");


//旋转碟片
var disc = document.getElementsByClassName('disc');

//音乐时间显示
function curtime(txt, music) {
    if (music.currentTime < 10) {
        txt.innerHTML = "0:0" + Math.floor(music.currentTime);
    } else
    if (music.currentTime < 60) {
        txt.innerHTML = "0:" + Math.floor(music.currentTime);
    } else {
        var minet = parseInt(music.currentTime / 60);
        var sec = music.currentTime - minet * 60;
        if (sec < 10) {
            txt.innerHTML = "0" + minet + ":" + "0" + parseInt(sec);
        } else {
            txt.innerHTML = "0" + minet + ":" + parseInt(sec);
        }
    }
}

//播放暂停
function playPause() {
    var btn = document.getElementById("playbtn");
    if (music.paused) {
        music.play();
        clearInterval(disctimer); //清除碟片的定时器
        btn.style.background = "url(img/music/pictures/pause.png) no-repeat 10px"; //改变播放暂停键的图标
        disctimer = setInterval(function () {
            disc[0].style.transform = "rotate(" + deg + "deg)";
            deg += 5;

            //每秒设置进度条长度
        }, 100);
        prograsstimer = setInterval(function () {
            prograss.style.width = (music.currentTime) * 100 / (music.duration) + "%";
            curtime(curtxt, music);
            if (music.currentTime >= music.duration - 1) //片尾跳转下一曲
            {
                musicindex++; //音乐索引加一
                if (musicindex >= musics.length) //如果音乐索引超过长度，将音乐索引清零
                {
                    musicindex = 0;
                }
                getMusic();
                music.play(); //重载音乐后进行播放
            }
        }, 1000);
    } else {
        music.pause(); //停止音乐
        btn.style.background = "url(img/music/pictures/play.png) no-repeat 10px";
        clearInterval(disctimer); //清除碟片滚动的定时器
        clearInterval(prograsstimer); //清除进度条的定时器
    }
}

//下一曲
function nextMusic() {
    musicindex++; //音乐索引加一
    if (musicindex >= musics.length) //如果音乐索引超过长度，将音乐索引清零
    {
        musicindex = 0;
    }
    getMusic();
    music.play();
}

//上一曲
function backMusic() {
    musicindex--;
    if (musicindex < 0) //如果索引小于0，将索引变为最大值
    {
        musicindex = musics.length - 1;
    }
    getMusic();
    music.play();
}

//读取音乐
function getMusic() {
    music.src = musics[musicindex]; //改变音乐的SRC
    music_pic.src = "img/music/pictures/" + music_pics[musicindex] + ".jpg";
    if (music.readyState = "complete") {
        setTimeout(function () {
            duration.innerHTML = parseInt(music.duration / 60) + ":" + parseInt(music.duration % 60);
        }, 1000); //一秒后读取音乐的总时长
    }
}


window.onload = function () {
    getMusic();
}