
// 这是我们的玩家要躲避的敌人
var Enemy = function(row) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 定义敌人的XY值、移动速度
    // 敌人在三行石路的初始y值分别是62, 145, 228
    rowY = [62, 145, 228];
    this.x = 0;
    this.y = rowY[row];
    this.speed = Math.random() * 200 + 100;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙

Enemy.prototype.update = function(dt){
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;

    //当敌人的X、Y值与玩家相差小于一定数值时触发碰撞，玩家回到起点。
    if (Math.abs(this.x - player.x) <= 100 && Math.abs(this.y - player.y) <= 70){
      player.initPosition();
    }

    // 敌人移动到本行右边会进入下一行左边，移到第三行右边会返回第一行左边
    if (this.x > 505){
      this.x = 0;
      this.y = this.y + 83;
    }
    if (this.y > 228){
      this.x = 0;
      this.y = 62;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {
//player移动时x +- 101,Y +- 83
  this.x = 203;
  this.y = 403;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

};

Player.prototype.initPosition = function (){
    this.x = 203;
    this.y = 403;
}

// 此为游戏必须的函数，用来在屏幕上画出玩家，
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//这是控制玩家移动的函数，玩家无法移到屏幕外
//当玩家移到河里游戏胜利，回到起点并触发胜利字幕
Player.prototype.handleInput = function(key) {
  if (key === 'left' && this.x > 1){
    this.x -= 101;
  }
  else if (key === 'up' && this.y > -12){
    this.y -= 83;
    if (this.y === -12){
      player.initPosition();
      slide.active = true;
    }
  }
  else if (key === 'right' && this.x < 405){
    this.x += 101;
  }
  else if (key === 'down' && this.y < 403){
    this.y += 83;
  }
};

//这是控制胜利字幕的函数，游戏胜利时字幕从左到右卷动一次
var Slide = function() {
  this.x = -200;
  this.y = 40;
  this.active = false;
};

Slide.prototype.render = function() {
    ctx.clearRect(0, 0, 505, 45);
    ctx.font = "36pt Impact";
    ctx.fillStyle = "yellow";
    ctx.fillText("YOU WIN !", this.x, this.y);
    ctx.strokeStyle = "black";
    ctx.strokeText("YOU WIN !", this.x, this.y);
    ctx.lineWidth = 3;
};

Slide.prototype.update = function(){
    if (this.active === true){
      this.x += 5;
    }
    if (this.x >= 510){
      this.active = false;
      this.x = -200;
    }
};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
for (var i = 0; i < 3; i++){
  var enemy = new Enemy(i);
  allEnemies.push(enemy);
}
var player = new Player();
var slide = new Slide();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
