function getCookie(cookieName) {
    var str = document.cookie;
    var i = -1;
    if ((i = str.indexOf(cookieName + "=")) != -1) {
        var start = i + cookieName.length + 1;
        var end = str.indexOf(";", start);
        return str.slice(start, end == -1 ? str.length : end);
    } else {
        return null;
    }
}

function setCookie(cookieName, value) {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    document.cookie = cookieName + "=" + value + ";expires=" + date.toGMTString();
}

var game = {
    data: null,//保存一个二维数组
    RN: 4,//总行数
    CN: 4,//总列数
    score: 0,//游戏得分
    state: 1,//游戏状态：1是运行中，0是结束
    RUNNNING: 1,
    GAMEOVER: 0,
    PLAYING: 2,//动画播放中
    top: 0,
    CSIZE: 100,
    OFFSET: 16,
    //强调：对象自己的方法要使用自己的属性，必须加this
    init: function () {
        var width = this.CN * (this.CSIZE + this.OFFSIZE) + this.OFFSIZE;
        var height = this.RN * (this.CSIZE + this.OFFSIZE) + this.OFFSIZE;
        gridPanel.style.width = width + "px";
        gridPanel.style.height = height + "px";
        for (var r = 0, arr = []; r < this.RN; r++) {
            for (var c = 0; c < this.CN; c++) {
                arr.push("" + c + r);
            }
        }
        gridPanel.innerHTML = '<div id="g' +
            arr.join('" class="grid"></div><div id="g') +
            '" class="grid"></div>';
        gridPanel.innerHTML += '<div id="c' +
            arr.join('" class="cell"></div><div id="c') +
            '" class="cell"></div>';
    },
    start: function () {//启动游戏
        this.init();
        this.top = getCookie("top") || 0;
        this.state = this.RUNNING;
        this.score = 0;
        this.data = [];
        for (var r = 0; r < this.RN; r++) {
            //data[r]=[];
            this.data.push([]);
            for (var c = 0; c < this.CN; c++) {
                this.data[r][c] = 0;
            }
        }
        this.randomNum();
        this.randomNum();
        this.updateView();
        console.log(this.data.join("\n"));
        //为当前页面绑定键盘事件:
        var me = this;
        document.onkeydown = function (e) {//e: 事件对象
            if (me.state == me.RUNNING) {
                switch (e.keyCode) {
                    case 37:
                        me.moveLeft();
                        break;
                    case 38:
                        me.moveUp();
                        break;
                    case 39:
                        me.moveRight();
                        break;
                    case 40:
                        me.moveDown();
                        break;
                }
            }
            /*if(e.keyCode==37){
                this.moveLeft();
            }*/
        }
    },//强调: 每个方法之间必须用逗号分隔

    isGameOver: function () {//判断游戏是否结束
        //遍历data中每个元素
        for (var r = 0; r < this.RN; r++) {
            for (var c = 0; c < this.CN; c++) {
                if (this.data[r][c] == 0) {
                    return false;
                }
                if (c < this.CN - 1 && this.data[r][c] == this.data[r][c + 1]) {
                    return false;
                }
                if (r < this.RN - 1 && this.data[r][c] == this.data[r + 1][c]) {
                    return false;
                }
            }
        }
        return true;
        //如果当前元素等于0
        //返回false
        //如果c<CN-1而且当前元素等于右侧元素
        //返回false
        //如果r<RN-1而且当前元素等于下方元素
        //返回false
        //(遍历结束)返回true
    },
    moveLeft: function () {//左移所有行
        //移动前为数组拍照(String(this.data))保存在变量before
        var before = String(this.data);
        //r从0开始，到<RN结束，r++
        for (var r = 0; r < this.RN; r++) {
            this.moveLeftInRow(r);
        }
        //调用moveLeftInRow(r)左移第r行
        //(遍历结束)
        //移动后为数组拍照(String(this.data))保存在变量after
        var after = String(this.data);
        //如果before不等于after时
        if (before != after) {
            this.state = this.PLAYING;
            animation.startMove(function () {
                this.randomNum();
                if (this.isGameOver() == true) {
                    this.state = this.GAMEOVER;
                    this.score > this.top && setCookie("top", this.score);
                } else {
                    this.state = this.RUNNING;
                }
                this.updateView();
            }.bind(this));
        }
        //调用randomNum随机生成一个数
        //调用updateView更新页面
    },
    moveLeftInRow: function (r) {//左移第r行
        //c从0开始，到<CN-1结束，每次增1
        for (var c = 0; c < this.CN - 1; c++) {
            //查找c位置后，下一个不为0的位置，保存在nextc中
            var nextc = this.getNextInRow(r, c);
            //如果nextc是-1，就退出循环
            if (nextc == -1) {
                break;
            } else {
                if (this.data[r][c] == 0) {
                    this.data[r][c] = this.data[r][nextc];
                    animation.addTask(r, nextc, r, c);
                    this.data[r][nextc] = 0;
                    c--;
                } else if (this.data[r][c] == this.data[r][nextc]) {
                    this.data[r][c] *= 2;
                    animation.addTask(r, nextc, r, c);
                    this.score += this.data[r][c];//累加得分
                    this.data[r][nextc] = 0;
                }
            }
            //否则
            //如果data中r行c位置等于0
            //将data中r行nextc位置的值赋值给data中r行c位置
            //将data中r行nextc位置置为0
            //c--;//下次还在当前位置开始
            //否则 如果data中r行c位置等于data中r行nextc位置
            //将data中r行c位置*2
            //将data中r行nextc位置置为0
        }
    },
    getNextInRow: function (r, c) {//查找r行c列右侧下一个不为0的位置
        //nextc从c+1开始，到<CN结束，nextc每次增1
        for (var nextc = c + 1; nextc < this.CN; nextc++) {
            if (this.data[r][nextc] != 0) {
                return nextc;
            }
        }
        return -1;
        //如果data中r行nextc位置的值!=0
        //返回nextc
        //(遍历结束)就返回-1
    },
    moveRight: function () {//右移所有行
        //移动前为数组拍照(String(this.data))保存在变量before
        var before = String(this.data);
        //r从0开始，到<RN结束，r++
        for (var r = this.RN - 1; r >= 0; r--) {
            this.moveRightInRow(r);
        }
        //调用moveLeftInRow(r)左移第r行
        //(遍历结束)
        //移动后为数组拍照(String(this.data))保存在变量after
        var after = String(this.data);
        //如果before不等于after时
        if (before != after) {
            this.state = this.PLAYING;
            animation.startMove(function () {
                this.randomNum();
                if (this.isGameOver() == true) {
                    this.state = this.GAMEOVER;
                    this.score > this.top && setCookie("top", this.score);
                } else {
                    this.state = this.RUNNING;
                }
                this.updateView();
            }.bind(this));
        }
        //调用randomNum随机生成一个数
        //调用updateView更新页面
    },
    moveRightInRow: function (r) {//右移第r行
        //c从0开始，到<CN-1结束，每次增1
        for (var c = this.CN - 1; c > 0; c--) {
            //查找c位置后，下一个不为0的位置，保存在nextc中
            var prevc = this.getPrevInRow(r, c);
            //如果nextc是-1，就退出循环
            if (prevc == -1) {
                break;
            } else {
                if (this.data[r][c] == 0) {
                    this.data[r][c] = this.data[r][prevc];
                    animation.addTask(r, prevc, r, c);
                    this.data[r][prevc] = 0;
                    c++;
                } else if (this.data[r][c] == this.data[r][prevc]) {
                    this.data[r][c] *= 2;
                    animation.addTask(r, prevc, r, c);
                    this.score += this.data[r][c];//累加得分
                    this.data[r][prevc] = 0;
                }
            }
            //否则
            //如果data中r行c位置等于0
            //将data中r行nextc位置的值赋值给data中r行c位置
            //将data中r行nextc位置置为0
            //c--;//下次还在当前位置开始
            //否则 如果data中r行c位置等于data中r行nextc位置
            //将data中r行c位置*2
            //将data中r行nextc位置置为0
        }
    },
    getPrevInRow: function (r, c) {//查找r行c列右侧下一个不为0的位置
        //nextc从c+1开始，到<CN结束，nextc每次增1
        for (var prevc = c - 1; prevc >= 0; prevc--) {
            if (this.data[r][prevc] != 0) {
                return prevc;
            }
        }
        return -1;
        //如果data中r行nextc位置的值!=0
        //返回nextc
        //(遍历结束)就返回-1
    },
    moveDown: function () {//下移所有行
        //移动前为数组拍照(String(this.data))保存在变量before
        var before = String(this.data);
        //r从0开始，到<RN结束，r++
        for (var c = this.CN - 1; c >= 0; c--) {
            this.moveDownInCol(c);
        }
        //调用moveLeftInRow(r)左移第r行
        //(遍历结束)
        //移动后为数组拍照(String(this.data))保存在变量after
        var after = String(this.data);
        //如果before不等于after时
        if (before != after) {
            this.state = this.PLAYING;
            animation.startMove(function () {
                this.randomNum();
                if (this.isGameOver() == true) {
                    this.state = this.GAMEOVER;
                    this.score > this.top && setCookie("top", this.score);
                } else {
                    this.state = this.RUNNING;
                }
                this.updateView();
            }.bind(this));
        }
        //调用randomNum随机生成一个数
        //调用updateView更新页面
    },
    moveDownInCol: function (c) {//左移第r行
        //c从0开始，到<CN-1结束，每次增1
        for (var r = this.RN - 1; r > 0; r--) {
            //查找c位置后，下一个不为0的位置，保存在nextc中
            var upr = this.getDownInCol(r, c);
            //如果nextc是-1，就退出循环
            if (upr == -1) {
                break;
            } else {
                if (this.data[r][c] == 0) {
                    this.data[r][c] = this.data[upr][c];
                    animation.addTask(upr, c, r, c);
                    this.data[upr][c] = 0;
                    r++;
                } else if (this.data[r][c] == this.data[upr][c]) {
                    this.data[r][c] *= 2;
                    animation.addTask(upr, c, r, c);
                    this.score += this.data[r][c];//累加得分
                    this.data[upr][c] = 0;
                }
            }
            //否则
            //如果data中r行c位置等于0
            //将data中r行nextc位置的值赋值给data中r行c位置
            //将data中r行nextc位置置为0
            //c--;//下次还在当前位置开始
            //否则 如果data中r行c位置等于data中r行nextc位置
            //将data中r行c位置*2
            //将data中r行nextc位置置为0
        }
    },
    getDownInCol: function (r, c) {//查找r行c列右侧下一个不为0的位置
        //nextc从c+1开始，到<CN结束，nextc每次增1
        for (var upr = r - 1; upr >= 0; upr--) {
            if (this.data[upr][c] != 0) {
                return upr;
            }
        }
        return -1;
        //如果data中r行nextc位置的值!=0
        //返回nextc
        //(遍历结束)就返回-1
    },
    moveUp: function () {//上移所有列
        //移动前为数组拍照(String(this.data))保存在变量before
        var before = String(this.data);
        //r从0开始，到<RN结束，r++
        for (var c = this.CN - 1; c >= 0; c--) {
            this.moveUpInCol(c);
        }
        //调用moveLeftInRow(r)左移第r行
        //(遍历结束)
        //移动后为数组拍照(String(this.data))保存在变量after
        var after = String(this.data);
        //如果before不等于after时
        if (before != after) {
            this.state = this.PLAYING;
            animation.startMove(function () {
                this.randomNum();
                if (this.isGameOver() == true) {
                    this.state = this.GAMEOVER;
                    this.score > this.top && setCookie("top", this.score);
                } else {
                    this.state = this.RUNNING;
                }
                this.updateView();
            }.bind(this));
        }
        //调用randomNum随机生成一个数
        //调用updateView更新页面
    },
    moveUpInCol: function (c) {//左移第r行
        //c从0开始，到<CN-1结束，每次增1
        for (var r = 0; r < this.RN - 1; r++) {
            //查找c位置后，下一个不为0的位置，保存在nextc中
            var nextr = this.getUpInCol(r, c);
            //如果nextc是-1，就退出循环
            if (nextr == -1) {
                break;
            } else {
                if (this.data[r][c] == 0) {
                    this.data[r][c] = this.data[nextr][c];
                    animation.addTask(nextr, c, r, c);
                    this.data[nextr][c] = 0;
                    r--;
                } else if (this.data[r][c] == this.data[nextr][c]) {
                    this.data[r][c] *= 2;
                    animation.addTask(nextr, c, r, c);
                    this.score += this.data[r][c];//累加得分
                    this.data[nextr][c] = 0;
                }
            }
            //否则
            //如果data中r行c位置等于0
            //将data中r行nextc位置的值赋值给data中r行c位置
            //将data中r行nextc位置置为0
            //c--;//下次还在当前位置开始
            //否则 如果data中r行c位置等于data中r行nextc位置
            //将data中r行c位置*2
            //将data中r行nextc位置置为0
        }
    },
    getUpInCol: function (r, c) {//查找r行c列右侧下一个不为0的位置
        //nextc从c+1开始，到<CN结束，nextc每次增1
        for (var nextr = r + 1; nextr < this.RN; nextr++) {
            if (this.data[nextr][c] != 0) {
                return nextr;
            }
        }
        return -1;
        //如果data中r行nextc位置的值!=0
        //返回nextc
        //(遍历结束)就返回-1
    },
    updateView: function () {
        topScore.innerHTML = this.top;
        for (var r = 0; r < this.RN; r++) {
            for (var c = 0; c < this.CN; c++) {
                var div = document.getElementById("c" + r + c);
                if (this.data[r][c] == 0) {
                    div.innerHTML = "";
                    div.className = "cell";
                } else {
                    div.innerHTML = this.data[r][c];
                    div.className = "cell n" + this.data[r][c];
                }
            }
        }
        //找到id为score的span，直接设置其内容为score属性值
        score.innerHTML = this.score;
        this.state == this.GAMEOVER && (final.innerHTML = this.score);
        //设置id为gameOver的元素的display属性为:
        //如果state为GAMEOVER，就设置为"block",否则为"none"
        gameOver.style.display = this.state == this.GAMEOVER ? "block" : "none";
        /*if(this.state==this.GAMEOVER){
            gameOver.style.display="block";
        }else{gameOver.style.display="none";}*/
    },
    randomNum: function () {
        while (true) {
            var r = Math.floor(Math.random() * this.RN);
            var c = Math.floor(Math.random() * this.CN);
            if (this.data[r][c] == 0) {
                var num = Math.random();
                this.data[r][c] = num < 0.7 ? 2 : 4;
                break;
            }
        }
    }
}
window.onload = function () {
    game.start();
}