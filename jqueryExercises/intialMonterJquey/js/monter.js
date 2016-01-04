var mainScreen = $("#main");
var mainScreenWidth = $("#main").width();
var mainScreenHeight = $("#main").height();

var situationScreen = $("#situation-place");
var situationScreenWidth = $("#situation-place").width();
var situationScreenHeight = $("#situation-place").height();

//Audio
var background_music = new Audio("res/sound/musicbackground.mp3");
var game_over_music = new Audio("res/sound/gameover.wav");
if (localStorage.highScore == undefined) {
localStorage.highScore = 0;
}
sessionStorage.yourScore = 0;


var armLength = 250;//radius of monster appearance circle
// Make sure TAU is defined (it's not by default)
Math.TAU = 2 * Math.PI;//
var _monsters = [];
var monstersNumb = 20;
var monstersAppearedNumb = 0;
var autoRunMonster;
var autoRunLevel;
var mainRun;
var helpScreen,welcomeScreen, highScoreScreen, storyScreen;
var canClickMenu = true;
//paramaters
var speed = 3000;
var addMonsterTime = 3000;
var startTime;
var realTime;
var remainingTime;
var speedAllMonter = 1.0;
var timeChangeLevel = 20000;
var score = 10;
var level = 1;
var lives = 5;
var livesBonus = 0;
var boomNumb = 3;
var stopNumb = 3;
var pauseNumb = 3;
var startTime;
var isPauseSwapPlay = true;
//check img loaded or not
var isLoadBoom = false;
var isLoadPause = false;
var isLoadReset = false;
var isLoad_stop = false;
var isLoad_heart = false;
var isLoad_play = false;
var isHeart_big = false;
var isLoad_blood = false;

//status of game
var canClickMainScreen = true;
var canUseBoom = true;
var canPause = true;
var canStop = true;
var canReset = true;
var canPlay = false;
var canPlayAgain = false;
var isGameOver = false;
var canCountdownPassLevel = false;
var isNew_highScore = false;
//control option
var canClickPause = true;
var canclickBoom = true;
var canclickStop = true;

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


function drawText(text, left, top, color, context, className) {
context.append("<p class='" + className + "'>" + text + "</p>");
//console.log(context.offset().left + " "+ context.offset().top);
$("." + className + "").css({
  "position": "absolute",
  "left": left,
  "top": top,
  "color": color
});
}
function drawImage(src, left, top, width, height, context, className) {
context.append( "<img class='" + className + "' src='"+ src +"' alt='' />");
$("." + className + "").css({
  "position": "absolute",
  "left": left,
  "top": top,
  "width": width,
  "height": height
});
}

function Monster(name) {
this.x = 0;
this.y = 0;
this.status = 0;
this.clicked = false;
this.sideAppear = 0;
this.isSwapDirection = false;
this.pointSwapX = 0;
this.pointSwapY = 0;
this.isLoadImg = false;
this.name = name;
this.run = function () {
  this.setMonsterProperty();
  this.draw();
}
}
function getRandomIntInclusive(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}
//------------------------------------------------------
Monster.prototype.setMonsterProperty = function() {
this.randomDirection();
this.status = 1;
//  clearInterval(autoRunMonster);
// } else {
//   //checkAllMonsterDied();
// }
}

Monster.prototype.randomDirection = function() {
var sideAppear = getRandomIntInclusive(1,4);
this.sideAppear = sideAppear;
//console.log("side of appear: " + sideAppear);
this.isSwapDirection = getRandomIntInclusive(0,1);
switch (sideAppear) {
  case 1:
  this.x = 0;
  this.y = getRandomIntInclusive(0,mainScreenHeight - 100);
  this.pointSwapX = getRandomIntInclusive(mainScreenWidth/2 - 50, mainScreenWidth/2 + 50);
  this.pointSwapY = getRandomIntInclusive(0,mainScreenHeight - 100);
  break;
  case 2:
  this.x = mainScreenWidth - 100;
  this.y = getRandomIntInclusive(0,mainScreenHeight -100);
  this.pointSwapX = getRandomIntInclusive(mainScreenWidth/2 - 50, mainScreenWidth/2 + 50);
  this.pointSwapY = getRandomIntInclusive(0,mainScreenHeight - 100);
  break;
  case 3:
  this.y = 0;
  this.x = getRandomIntInclusive(0,mainScreenWidth - 100);
  this.pointSwapX = getRandomIntInclusive(0,mainScreenWidth -100);
  this.pointSwapY = getRandomIntInclusive(mainScreenHeight/2 - 50, mainScreenHeight/2 + 50);
  break;
  case 4:
  this.y = mainScreenHeight - 100;
  this.x = getRandomIntInclusive(0,mainScreenWidth - 100);
  this.pointSwapX = getRandomIntInclusive(0,mainScreenWidth -100);
  this.pointSwapY = getRandomIntInclusive(mainScreenHeight/2 - 50, mainScreenHeight/2 + 50);
  break;
}
}
Monster.prototype.update = function() {
if (this.status == 1) {
  if ((this.x) < -100 || (this.x) > mainScreenWidth||//monsters moving out the width screen
  this.y < -100 || this.y > mainScreenHeight)//monsters moving out the height screen
  {
    //lives--;
    //  checkLives();
    this.status = 0;
  } else {
    if (!this.isSwapDirection) {
      switch (this.sideAppear) {
        case 1:
        if (this.x > this.pointSwapX) {
          if (getRandomIntInclusive(0,1)) {this.pointSwapX = -this.pointSwapX; this.run_stepY = -this.run_stepY;this.isSwapDirection = true;}
        }
        break;
        case 2:
        if (this.x < this.pointSwapX) {
          if (getRandomIntInclusive(0,1)) {this.run_stepX = -this.run_stepX; this.run_stepY = -this.run_stepY;this.isSwapDirection = true;}
        }
        break;
        case 3:
        if (this.y > this.pointSwapX) {
          if (getRandomIntInclusive(0,1)) {this.run_stepX = -this.run_stepX; this.run_stepY = -this.run_stepY;this.isSwapDirection = true;}
        }
        break;
        case 4:
        if (this.y < this.pointSwapX) {
          if (getRandomIntInclusive(0,1)) {this.run_stepX = -this.run_stepX; this.run_stepY = -this.run_stepY;this.isSwapDirection = true;}
        }
        break;
      }
    }
  }
}
}
function monsterClick(number, element) {

//s$(element).remove();
}
Monster.prototype.draw = function() {
var monsterCur = this;
//console.log("name: "+ this.name + " status: " + this.status);
//  console.log("x: " + this.x + " y: " + this.y + " pointSwapX: " + this.pointSwapX + " pointSwapY: " + this.pointSwapY);
drawImage("img/prettymonter.png", this.x, this.y, 100, 100, mainScreen, "monster" + this.name);
$(".monster" + this.name).animate({
  "left": monsterCur.pointSwapX,
  "top": monsterCur.pointSwapY
}, speed, function () {
  $(".monster" + monsterCur.name).animate({
    "left": monsterCur.x,
    "top": monsterCur.y
  },speed, function () {
    monsterCur.status = 0;
    $(".monster" + monsterCur.name).remove();
    run();
  });
});
}
Monster.prototype.checkOutScreen = function() {
var mainLeft = mainScreen.offset().left;
var mainTop = mainScreen.offset().top;
// console.log("checkOutScreen work!" + ".monster" + this.name );
if (this.status == 1) {
  var x = $(".monster" + this.name).offset().left;
  var y = $(".monster" + this.name).offset().top;
  //  console.log("checkOutScreen work!" + ".monster" + this.name +" " + "left" + (x - mainScreen.offset().left) + " top: " + (y -mainScreen.offset().top));
  // console.log("mainLeft" +" "+ mainLeft + " " + (mainLeft + mainScreenWidth));
  // console.log("mainTop" + " " + mainTop + " " + mainScreenHeight);
  if (x < mainLeft || x > (mainLeft + mainScreenWidth - 100) ||
  y < mainTop || y > (mainTop + mainScreenHeight - 100)) {
    this.remove();
    this.status = 0;
  }
}
}
Monster.prototype.remove = function () {
$(".monster" + this.name).remove();
this.status = 0;
}
Monster.prototype.pause = function () {
$(".monster" + this.name).pause();
}
Monster.prototype.resume = function () {
$(".monster" + this.name).resume();
}
Monster.prototype.click = function () {
var MonsterCur = this;
$(".monster" + this.name).click(function (e) {
  if (canClickMainScreen) {
    var xCoor = e.clientX - mainScreen.offset().left -50;
    var yCoor = e.clientY - mainScreen.offset().top - 50;
    drawImage("img/blood.png", xCoor, yCoor, 100, 100, mainScreen, "blood" + MonsterCur.name%4)
    score += 2;
    updateScore();
    MonsterCur.status = 0;
    this.remove();
    run();
  }
});
}
function updateScore() {
$("#score-cur").text(score);
}
function pauseMonster() {
  canClickMainScreen = false;
  realTime = new Date().getTime();
  remainingTime = realTime - startTime;
  for (var i = 1; i < (_monsters.length); i++) {
    console.log(i);
    if (_monsters[i].status == 1) {
      _monsters[i].pause();
    }
  }
}
function resumeMonster() {
  canClickMainScreen = true;
  for (var i = 1; i < (_monsters.length); i++) {
    console.log(i);
    if (_monsters[i].status == 1) {
      _monsters[i].resume();
    }
  }
}
function stopMonster() {
  for (var i = 1; i < (_monsters.length); i++) {
    console.log(i);
    if (_monsters[i].status == 1) {
      _monsters[i].pause();
    }
  }
}
function bombingMonster() {
  var monsterBombedNumb = 0;
  for (var i = 1; i < (_monsters.length); i++) {
    console.log(i);
    if (_monsters[i].status == 1) {
      monsterBombedNumb++;
      _monsters[i].remove();
    }
  }
  run();
  score += monsterBombedNumb;
  $("#score-cur").text(score);

}
function resetMonter() {
monsters = new Array();
for (var i = 0; i < monstersNumb; i++) {
  monsters[i] = new Monster(i);
}
}
function resetLevel() {
resetMonter();
level++;
speed -= 200;
run();
$("body").animate({

},timeChangeLevel
,resetLevel);
}
function run() {
startTime = new Date().getTime();
_monsters[++monstersAppearedNumb] = new Monster(monstersAppearedNumb);
_monsters[monstersAppearedNumb].run();
_monsters[monstersAppearedNumb].click();
console.log("monstersAppearedNumb: " + monstersAppearedNumb + " X: " + _monsters[monstersAppearedNumb].x +
" Y: " + _monsters[monstersAppearedNumb].y +
" status " + _monsters[monstersAppearedNumb].status +
" this.sideAppear " + _monsters[monstersAppearedNumb].sideAppear +
" this.pointSwapX " + _monsters[monstersAppearedNumb].pointSwapX +
" this.pointSwapY " + _monsters[monstersAppearedNumb].pointSwapY +
" this.name " + _monsters[monstersAppearedNumb].name);
}
function checkAllmonsterDied(monster) {
var temp =0;
for (var i = 0; i < monstersNumb; i++) {
  if (monster.status == 0) {
    temp++;
  }
}
if (temp == monstersNumb) {
  canClickMainScreen = false;
}
}

function mouseMoveHandler(e) {
var a = e.clientX - mainScreen.offset().left;
var b = e.clientY - mainScreen.offset().top;
//console.log("x: " + a + "y: "+ b);
}
function handlekeydown(e) {
if ((e.keyCode == 81) && canclickBoom) {
  handingEventOptionClicked("boom");
}
if ((e.keyCode == 87) && canclickStop) {
  handingEventOptionClicked("stop");
  return;
}
if ((e.keyCode == 69) && canClickPause) {
  handingEventOptionClicked("pause");
  return;
}
if (e.keyCode == 82) {
  handingEventOptionClicked("reset");
  return;
}
console.log('keycode: '+e.keyCode);
}
document.addEventListener('keydown',handlekeydown,false);
document.addEventListener("mousedown", mouseMoveHandler, false);
function main() {
resetLevel();
}
window.onload = function() {
function newMonster() {
  var _monster = new Monster(monstersAppearedNumb++);
  _monster.run();
  $("body").animate({

  },20000,newMonster);
}
function drawSituation() {
  drawText("Score: ", 30, -5, "blue", situationScreen,"score");
  drawText(score, 110, -5, "blue", situationScreen, "score-cur");
  drawText("Heart: ",30, 25, "red", situationScreen,"heart");
  drawText("Speed: ",30, 52, "#07f8ea", situationScreen,"speed");
  drawText(speed, 110, 52, "#07f8ea", situationScreen,"speed-cur")
  drawText("Level: ", situationScreenWidth - 150, 0 , "red", situationScreen,"level");
  drawText(level,situationScreenWidth - 80, 0, "red", situationScreen,"level-cur");
}
function drawLives() {
  for (var i = 0; i < lives; i++) {
    drawImage("img/live.png",110 + i*32, 45, 30, 30, situationScreen,"heart" + i);
  }
}
function drawOptionIcon() {
  drawImage("img/boom_icon.png",situationScreenWidth - 250, 60, 40, 40, situationScreen, "boom-icon");
  drawText(boomNumb,situationScreenWidth - 215, 50, "red", situationScreen, "boom-numb");

  drawImage("img/stop.png",situationScreenWidth - 195, 60, 40, 40, situationScreen, "stop-icon");
  drawText(stopNumb,situationScreenWidth - 150, 50, "red", situationScreen, "stop-Numb");

  drawImage("img/pause_icon.png",situationScreenWidth - 130, 60, 40, 40, situationScreen, "pause-icon");
  drawText(stopNumb,situationScreenWidth - 85, 50, "red", situationScreen, "pause-Numb");

  drawImage("img/reset_icon.png",situationScreenWidth - 65, 60, 40, 40, situationScreen, "reset-icon");
  drawText(stopNumb,situationScreenWidth - 20, 50, "red", situationScreen, "reset-Numb");
}
function clickEvent() {
  mainScreen.click(function () {
    if (canClickMainScreen) {
      console.log(score);
      score--;
      $(".score-cur").text(score);
    }
  });
  $(".boom-icon").click(function () {
    bombingMonster();
  });
  $(".pause-icon").click(function () {
    if (isPauseSwapPlay) {
      pauseMonster();
      $(".pause-icon").attr("src","img/play_icon.png");
      isPauseSwapPlay = !isPauseSwapPlay;
    } else {
      resumeMonster();
      $(".pause-icon").attr("src","img/pause_icon.png");
      isPauseSwapPlay = !isPauseSwapPlay;
    }
  });
}
drawSituation();
drawLives();
drawOptionIcon();
clickEvent();
run();
mainRun = setInterval(function () {
  updateScore();
  updateLives();
}, 10);
}
