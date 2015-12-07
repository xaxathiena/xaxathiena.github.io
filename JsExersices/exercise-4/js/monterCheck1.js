var main_canvas = document.getElementById("main");
var ctx = main_canvas.getContext("2d");

var situation_canvas = document.getElementById("situation-place");
var situation_ctx = situation_canvas.getContext("2d");



var clockRadius = 100;
var monter_positionX = main_canvas.width / 2;//width center of canvas
var monter_positionY = main_canvas.height / 2;//height center of canvas
var armLength = 250;//radius of monter appearance circle
// Make sure TAU is defined (it's not by default)
Math.TAU = 2 * Math.PI;//
var monters = [];
var monters_numb = 20;
var monters_appeared_mub;
var auto_run_monter;
var auto_run_level;

//paramaters
var speed = 1000;
var speed_monter = 1.0;
var score = 0;
var level = 1;
var lives = 5;
var boom_numb = 3;
var stop_numb = 3;
var pause_numb = 3;
var isPause = false;
var isReset = false;
var livesBonus = 0;
//status of game
var canClick = true;

//set position of situation element
var distanceY_left_info = 30;
var distanceX_right_option = 50;
var boomX = 400;
var stopX = boomX + distanceX_right_option;
var pauseX = stopX + distanceX_right_option;
var resetX = pauseX + distanceX_right_option;
var scoreY = 40;
var livesY = scoreY + distanceY_left_info;
var speedY = livesY + distanceY_left_info;

var img = new Image();
img.src='img/prettymonter.png';
var img_heart = new Image();
img_heart.src='img/misc_game_life-128.png';


//handing event mouse click
function mouseMoveHandler(e) {
if (canClick) {
  var isHit = false;
  var relativeX = e.clientX - main_canvas.offsetLeft;
  var relativeY = e.clientY - main_canvas.offsetTop;
  console.log(relativeX + " " + relativeY);
  for (var i = 0; i < monters_appeared_mub; i++) {
    console.log( monters[i].x + " " + monters[i].y);
    if (monters[i].status == 1 && //handing status of monter
      (relativeX > monters[i].x - 50) && (relativeX < monters[i].x + 50) && //if mouse point > leftSide and < rightSide of monter
      (relativeY > monters[i].y - 50) && (relativeY < monters[i].y + 50)) {//if mouse point > topSide and < bottomSide of mnter
        monters[i].status = 0;
        score ++;
        livesBonus++;
        if (livesBonus == 5) {
          lives++;
          livesBonus = 0;
        }
        isHit = true;
        console.log(score);
      }
    }
    if (!isHit) {
      lives--;
    }
  }
}

document.addEventListener("mousedown", mouseMoveHandler, false);


//draw all parameters of game's situation
function drawSituation() {
  drawScore();
  drawLives();
  drawSpeed();
  drawOptionIcon();
  drawLevel();
}
function drawScore() {
  situation_ctx.font = "20px Comic Sans MS";
  situation_ctx.fillStyle = "blue";
  situation_ctx.fillText("Score: ", 80, scoreY);
  situation_ctx.fillStyle = "blue";
  situation_ctx.fillText(score, 150, scoreY);

}
function drawLives() {
  situation_ctx.font ="20px Comic Sans MS";
  situation_ctx.fillStyle = "red";
  situation_ctx.fillText("Heart: ", 80, livesY);
  for (var i = 0; i < lives; i++) {
    situation_ctx.drawImage(img_heart, 160 + i*30, livesY-distanceY_left_info + 5, 30, 30);
  }
}
function drawSpeed() {
  situation_ctx.font = "20px Comic Sans MS";
  situation_ctx.fillStyle = "#07f8ea";
  situation_ctx.fillText("Speed: ", 80, speedY);
  situation_ctx.fillText(1000 - speed, 150, speedY);
}
function drawLevel() {
  situation_ctx.font = "20px Comic Sans MS";
  situation_ctx.fillStyle = "red";
  situation_ctx.fillText("Level: ", stopX, scoreY - 10);
  situation_ctx.fillStyle = "red";
  situation_ctx.fillText(level, stopX + 70, scoreY - 10);
}
function drawOptionIcon() {

  situation_ctx.font = "20px Comic Sans MS";
  situation_ctx.fillStyle = "red";
  situation_ctx.fillText(boom_numb,boomX + 10,60);
  var boom_icon = new Image();
  boom_icon.src = "img/boom_icon.png";
  boom_icon.onload = function () {
    situation_ctx.drawImage(boom_icon,boomX,60,40,40);
  }
  situation_ctx.font = "20px Comic Sans MS";
  situation_ctx.fillStyle = "red";
  situation_ctx.fillText(stop_numb,stopX + 12,60);
  var stop_icon = new Image();
  stop_icon.src = "img/Stop.png";
  stop_icon.onload = function () {
    situation_ctx.drawImage(stop_icon,stopX,60,40,40);
  }
  situation_ctx.font = "20px Comic Sans MS";
  situation_ctx.fillStyle = "red";
  situation_ctx.fillText(pause_numb,pauseX + 12,60);
  var pause_icon = new Image();
  pause_icon.src = "img/pause_icon.png";
  pause_icon.onload = function () {
    situation_ctx.drawImage(pause_icon,pauseX,60,40,40);
  }
  var reset_icon = new Image();
  reset_icon.src = "img/reset-icon.png";
  reset_icon.onload = function () {
    situation_ctx.drawImage(reset_icon,resetX,60,40,40);
  }
}
drawSituation();
//------------------------------------------------------
function reset(){
  for (var i = 0; i < monters_numb; i++) {
    monters[i] = {x : 0, y : 0, run_stepX : 0, run_stepY : 0, status : 0};
  }
}
function setNewMonter() {
  var monter_radians = (Math.TAU * Math.random()) - (Math.TAU/4);
  monters[monters_appeared_mub].x = monter_positionX + Math.cos(monter_radians) * armLength;
  monters[monters_appeared_mub].y = monter_positionY + Math.sin(monter_radians) * armLength;
  monters[monters_appeared_mub].run_stepX = (monter_positionX - monters[monters_appeared_mub].x + 50)/100;
  monters[monters_appeared_mub].run_stepY = (monter_positionY - monters[monters_appeared_mub].y + 50)/100;
  monters[monters_appeared_mub].status = 1;
  clearInterval(auto_run_monter);
}
//create monters if they' status equal 1
function drawMonters() {
  for (var i = 0; i < monters_appeared_mub; i++) {
    if (monters[i].status == 1) {
      ctx.drawImage(img,monters[i].x  - 50,monters[i].y - 50,100,100);
    }
  }
}
function update () {
  ctx.clearRect(0, 0, main_canvas.width, main_canvas.height);
  situation_ctx.clearRect(0,0,situation_canvas.width,situation_canvas.height);
  for (var i = 0; i < monters_appeared_mub; i++) {
    if (monters[i].status == 1) {
      if ((monters[i].x + 50) < 0 || (monters[i].x + 50) > main_canvas.width||//monters moving out the width screen
      (monters[i].y + 50) < 0 || (monters[i].y + 50) > main_canvas.height)//monters moving out the height screen
      {
        lives--;
        monters[i].status = 0;
      } else {
        monters[i].x += monters[i].run_stepX * speed_monter;
        monters[i].y += monters[i].run_stepY * speed_monter;
      }
    }
  }
}

function run() {
  update();
  drawMonters();
  drawSituation();
}
function main() {
  setNewMonter();
  if (monters_appeared_mub < 20) {
    monters_appeared_mub++;
  }
  auto_run_monter = setInterval(run,10);
}

function resetLevel(argument) {
  reset();
  clearInterval(auto_run_level);
  speed -= 200;
  if (speed <= 0) {
    speed = 200
  }
  speed_monter += 0.1;
  level = parseInt(speed_monter*10 - 10);
  monters_appeared_mub = 0;
  auto_run_level = setInterval(main,speed);
}
resetLevel();
setInterval(resetLevel,20000);
