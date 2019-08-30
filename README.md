# Canvas

### 主要实现的功能

- 切换画笔颜色
- 调整笔刷粗细
- 清空画布
- 橡皮擦擦除
- 撤销操作
- 保存成图片
- 兼容移动端（支持触摸）
- 音乐播放器

### 流程

#### 1. 准备

准备容器：画板

```html
<canvas id="draw-board"></canvas>
```

初始化 画板

```javascript
let canvas = document.getElementById("draw-board")
let ctx = canvas.getContext("2d")
```

把画板做成全屏的，于是设置下 canvas 的宽高

```javascript
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
```

#### 2. 画线功能

用户在画板上绘画时主要是三个状态：鼠标点击，鼠标移动，鼠标离开
分别对应三个事件：mousedown mousemove mouseup

当用户用鼠标点击时：

```javascript
canvas.onmousedown = function(e) {
  // 鼠标按下事件
  using = true //标志开始使用画布
  let x = e.clientX
  let y = e.clientY
  lastPoint = {
    x: x,
    y: y
  }
  drawCicle(x, y, 0.5)
}
```

当用户鼠标移动时：

```javascript
canvas.onmousemove = function(e) {
  // 鼠标移动事件
  if (using) {
    let x = e.clientX
    let y = e.clientY
    let newPoint = {
      x: x,
      y: y
    }
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, clear)
    lastPoint = newPoint
  }
}
```

当用户鼠标离开时：

```javascript
canvas.onmouseup = function(e) {
  // 鼠标离开事件
  using = false
}
```

其中使用到的 绘制直线函数（drawLine()） 绘制小圆点函数（drawCircle()）具体实现如下：

```javascript
// 绘制小圆点函数:
function drawCicle(x, y, radius) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}
// 绘制直线函数
function drawLine(x1, y1, x2, y2) {
  ctx.lineWidth = 3
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.closePath()
}
```

#### 3. 橡皮擦功能

实现思路：

1. 获取橡皮擦元素
2. 设置橡皮擦初始状态，clear = false。
3. 监听橡皮擦 click 事件，点击橡皮擦，改变橡皮擦状态，clear = true。
4. clear 为 true 时，移动鼠标使用 canvas 剪裁（clip()）擦除画布。

#### 4. 切换画笔颜色

实现思路

获取颜色节点
设置画布的 strokeStyle

#### 5. 调整画笔粗细

实现思路：

创建 input[type=range]
滑动 range 获取其 value 值，并赋给 ctx.lineWidth

#### 6. 清空画布

#### 7. 撤销

实现思路：

准备一个数组记录历史操作
每次使用画笔前将当前绘图表面储存进数组
点击撤销时，恢复到上一步的绘图表面

#### 兼容移动端

实现思路：

判断设备是否支持触摸
true，则使用 touch 事件；false，则使用 mouse 事件
代码：

```
if (document.body.ontouchstart !== undefined) {
    // 使用touch事件
    anvas.ontouchstart = function (e) {
        // 开始触摸
    }
    canvas.ontouchmove = function (e) {
        // 开始滑动
    }
    canvas.ontouchend = function () {
        // 滑动结束
    }
}else{
    // 使用mouse事件
    ...
}
```

这里需要注意的一点是，在 touch 事件里，是通过.touches[0].clientX 和.touches[0].clientY 来获取坐标的，这点要和 mouse 事件区别开。

### 样式设置

- 底部的工具栏采用 flex 布局，当鼠标移到每一个 button 上就阴影变蓝（box-shadow:0 0 8px #00ccff），同样选中了某一个 button 阴影也变蓝，当然可以加个 transition 过渡使变化不会太僵硬。
- 取色区的样式和效果基本上跟工具栏一样
- 当视口宽度小于 780 就改变样式（@media screen and (max-width：780px)）

#### 音乐播放器

**功能**

- 读取音乐
- 播放暂停
- 上一曲
- 下一曲
- 音乐时间显示
- 旋转碟片

1. 读取音乐
   在页面渲染完成后读取音乐，图片等信息。

- 使用了 audio 的属性有：`music.duration` `music.readyState`
- 获取 audio 对象，声明一个数组存音乐链接，声明一个数组存图片
- 写一个 getMusic 函数
- getMusic 函数：改变音乐的 src，改变图片的 src，一秒后读取音乐的总时长

```html
<audio src="" id="mymusic"></audio>
```

```javascript
var music = document.getElementById("mymusic") //audio对象
var musicindex = 0 //音乐索引
var musics = new Array(
  "http://stor.cloudmusics.cn/mp3/2019/08/80d2527c49c6969252654472b3bde30b.mp3",
  "http://stor.cloudmusics.cn/mp3/2019/08/ef610fa5259ce155be39f81b78fd73d5.mp3"
) //音乐数组
var music_pics = new Array("default", "000001")

//读取音乐
function getMusic() {
  music.src = musics[musicindex] //改变音乐的src
  music_pic.src = "img/music/pictures/" + music_pics[musicindex] + ".jpg" //改变图片的src
  if ((music.readyState = "complete")//readyState 属性返回音频的当前就绪状态) {
    setTimeout(function() {
      duration.innerHTML =
        parseInt(music.duration / 60) + ":" + parseInt(music.duration % 60)
    }, 1000) //一秒后读取音乐的总时长
  }
}
```

2. 播放暂停
   在点击播放/暂停按钮后触发 playPause 事件。

- 使用的 HTMLMediaElement 的属性有：media
  .duration
-

```html
<span onClick="playPause()" id="playbtn"></span>
```

```javascript
function playPause() {
  var btn = document.getElementById("playbtn")
  if (music.paused) {
    music.play()
    clearInterval(disctimer) //清除碟片的定时器
    btn.style.background = "url(img/music/pictures/pause.png) no-repeat 10px" //改变播放暂停键的图标
    disctimer = setInterval(function() {
      disc[0].style.transform = "rotate(" + deg + "deg)"
      deg += 5
    }, 100)
    //每秒设置进度条长度
    prograsstimer = setInterval(function() {
      prograss.style.width = (music.currentTime * 100) / music.duration + "%"
      curtime(curtxt, music)
      if (music.currentTime >= music.duration - 1) {
        //片尾跳转下一曲
        musicindex++ //音乐索引加一
        if (musicindex >= musics.length) {
          //如果音乐索引超过长度，将音乐索引清零
          musicindex = 0
        }
        getMusic()
        music.play() //重载音乐后进行播放
      }
    }, 1000)
  } else {
    music.pause() //停止音乐
    btn.style.background = "url(img/music/pictures/play.png) no-repeat 10px"
    clearInterval(disctimer) //清除碟片滚动的定时器
    clearInterval(prograsstimer) //清除进度条的定时器
  }
}
```
