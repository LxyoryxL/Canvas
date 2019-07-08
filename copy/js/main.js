let canvas = document.getElementById("draw-board");
let ctx = canvas.getContext("2d");
let using = false; //是否使用画布
let lastPoint = {
    x: undefined,
    y: undefined
};
let colorBtn = document.getElementsByClassName('color-item');
let eraser = document.getElementById('eraser');
let brush = document.getElementById('brush');
let allClear = document.getElementById('clear');
let undo = document.getElementById('undo');
let save = document.getElementById('save');
let range = document.getElementById('range');
let historyData = [];
let clear = false;

// 设置画板 canvas 大小为全屏
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let LineWidth = 3;

listenToUser(canvas);
setColor();

// 监听用户事件
function listenToUser(canvas) {

    if (document.body.ontouchstart !== undefined) { // 兼容手机端
        canvas.ontouchstart = function (e) {
            let firstData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            saveData(firstData);
            using = true;
            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            lastPoint = {
                "x": x,
                "y": y
            };
            drawCicle(x, y, 0.5)
        }
        canvas.ontouchmove = function (e) {
            if (using) {
                let x = e.touches[0].clientX;
                let y = e.touches[0].clientY;
                let newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function (e) {
            using = false;
        }
    } else {
        canvas.onmousedown = function (e) { // 鼠标按下事件
            let firstData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            saveData(firstData);
            using = true; //标志开始使用画布
            let x = e.clientX;
            let y = e.clientY;
            lastPoint = {
                "x": x,
                "y": y
            };
            ctx.save()
            drawCicle(x, y, 0.5)
        }
        canvas.onmousemove = function (e) { // 鼠标移动事件
            if (using) {
                let x = e.clientX;
                let y = e.clientY;
                let newPoint = {
                    "x": x,
                    "y": y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, clear)
                lastPoint = newPoint;
            }
        }
        canvas.onmouseup = function (e) { // 鼠标离开事件
            using = false;
        }
    }

}

// 绘制小圆点
function drawCicle(x, y, radius) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
    if (clear) {
        ctx.clip();
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.restore();
    }
}
// 绘制直线
function drawLine(x1, y1, x2, y2, clear) {
    ctx.lineWidth = LineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (!clear) {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    } else {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.restore();
    }

}

//切换画笔颜色
function setColor() {
    console.log(colorBtn[0])
    for (let i = 0; i < colorBtn.length; i++) {
        colorBtn[i].onclick = function () {
            for (let i = 0; i < colorBtn.length; i++) {
                colorBtn[i].classList.remove('active')
            }
            this.classList.add('active')
            let activeColor = this.style.backgroundColor;
            ctx.fillStyle = activeColor;
            ctx.strokeStyle = activeColor;
        }
    }
}

// 保存历史画布的图像
function saveData(data) {
    if (historyData.length >= 10) {
        historyData.shift()
    }
    historyData.push(data)
    console.log(historyData)
}

// 切换为笔刷
brush.onclick = function () {
    clear = false;
    this.classList.add('active');
    eraser.classList.remove('active')
}

// 切换为橡皮擦
eraser.onclick = function () {
    clear = true;
    this.classList.add('active');
    brush.classList.remove('active')
}

// 清空画布
allClear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// 保存图片
save.onclick = function () {
    let imgurl = canvas.toDataURL("image/png");
    var dlLink = document.createElement('a');
    document.body.appendChild(dlLink);
    dlLink.download = "下载";
    dlLink.href = imgurl;
    dlLink.click();
    document.body.removeChild(dlLink);
}

undo.onclick = function () {
    if (historyData.length < 1) {
        return false
    } else {
        ctx.putImageData(historyData[historyData.length - 1], 0, 0)
        historyData.pop()
    }
}
// 滑动滑条时，调整画笔粗细
range.onchange = function () {
    LineWidth = this.value;
}