var canvas = document.getElementById("situation-place");
var ctx = canvas.getContext("2d");
var monter_positionX = canvas.width / 2;//width center of canvas
var monter_positionY = canvas.height / 2;//height center of canvas
var armLength = 250;//radius of monter appearance circle
// Make sure TAU is defined (it's not by default)
Math.TAU = 2 * Math.PI;//
var monters = [];
var monters_numb = 10;
var monters_appeared_mub = 0;
var auto_run_monter;
var auto_run_level;

//situation of monter's game
var speed = 1000;
var score = 0;
var level = 1;
var lives = 5;
var boom_numb = 3;
var stop_numb = 3;
var pause_numb = 3;
var isPause = false;
var isReset = false;

//img of monter's game
var img_heart = new Image();
    img_heart.src='img/misc_game_life-128.png';


//set position of situation element
var distanceY_left_info = 30;
var distanceX_right_option = 50;
var boomX = 400;
var stopX = boomX + distanceX_right_option;
var pauseX = stopX + distanceX_right_option;
var resetX = pauseX + distanceX_right_option;
var scoreY = 30;
var livesY = scoreY + distanceY_left_info;
var speedY = livesY + distanceY_left_info;


function drawSituation() {
      drawScore();
      drawLives();
      drawSpeed();
      drawOptionIcon();
      drawLevel();
}

function drawScore() {
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "blue";
  ctx.fillText("Score: ", 10, scoreY);
  ctx.fillStyle = "blue";
  ctx.fillText(score, 80, scoreY);

}
function drawLives() {
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText("Heart: ", 10, livesY);
    img_heart.onload = function () {
      for (var i = 0; i < lives; i++) {
        ctx.drawImage(img_heart, 90 + i*30, livesY-distanceY_left_info + 5, 30, 30);
    }
  }
}
function drawSpeed() {
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "#07f8ea";
  ctx.fillText("Speed: ", 10, speedY);
  ctx.fillText(speed, 80, speedY);
}
function drawLevel() {
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText("Level: ", stopX, scoreY);
  ctx.fillStyle = "red";
  ctx.fillText(level, stopX + 70, scoreY);
}
function drawOptionIcon() {

  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText(boom_numb,boomX + 10,60);
  var boom_icon = new Image();
  boom_icon.src = "img/boom_icon.png";
  boom_icon.onload = function () {
    ctx.drawImage(boom_icon,boomX,60,40,40);
  }
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText(stop_numb,stopX + 12,60);
  var stop_icon = new Image();
  stop_icon.src = "img/Stop.png";
  stop_icon.onload = function () {
    ctx.drawImage(stop_icon,stopX,60,40,40);
  }
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText(pause_numb,pauseX + 12,60);
  var pause_icon = new Image();
  pause_icon.src = "img/pause_icon.png";
  pause_icon.onload = function () {
    ctx.drawImage(pause_icon,pauseX,60,40,40);
  }
  var reset_icon = new Image();
  reset_icon.src = "img/reset-icon.png";
  reset_icon.onload = function () {
    ctx.drawImage(reset_icon,resetX,60,40,40);
  }
}
drawSituation();
