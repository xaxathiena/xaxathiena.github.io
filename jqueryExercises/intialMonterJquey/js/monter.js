var mainScreen = $("#main");
var mainScreenWidth = $("#main").width();
var mainScreenHeight = $("#main").height();
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
var monsters
var monstersNumb = 20;
var monstersAppearedNumb = 0;
var autoRunMonster;
var autoRunLevel;
var mainRun;
var helpScreen,welcomeScreen, highScoreScreen, storyScreen;
var canClickMenu = true;
//paramaters
var speed = 1000;
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
var remainingTime = 20000;

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
  var randomHeightPoint = getRandomIntInclusive(-100,mainScreenHeight);
  var randomWidthPoint = getRandomIntInclusive(-100,mainScreenWidth);
  this.sideAppear = sideAppear;
  console.log("side of appear: " + sideAppear);
  if(getRandomIntInclusive(0,1)) {this.isSwapDirection = true;}
  switch (sideAppear) {
    case 1:
      this.x = 0;
      this.y = getRandomIntInclusive(0,mainScreenHeight - 50);
      this.pointSwapX = mainScreenWidth;
      this.pointSwapY = getRandomIntInclusive(mainScreenHeight/2 -50,mainScreenHeight);
    break;
    case 2:
      this.x = mainScreenWidth - 100;
      this.y = getRandomIntInclusive(0,mainScreenHeight -50);
      this.pointSwapX = -100;
      this.pointSwapY = getRandomIntInclusive(mainScreenHeight/2 -50,mainScreenHeight);
    break;
    case 3:
      this.y = 0;
      this.x = getRandomIntInclusive(0,mainScreenWidth - 50);
      this.pointSwapX = getRandomIntInclusive(-100,mainScreenWidth);
      this.pointSwapY = mainScreenHeight;
    break;
    case 4:
      this.y = mainScreenHeight - 100;
      this.x = getRandomIntInclusive(0,mainScreenWidth - 50);
      this.pointSwapX = getRandomIntInclusive(-100,mainScreenWidth);
      this.pointSwapY = -100;
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
Monster.prototype.draw = function() {
  var monterCur = this;
  console.log("name: "+ this.name + " status: " + this.status);
  console.log("x: " + this.x + " y: " + this.y + " pointSwapX: " + this.pointSwapX + " pointSwapY: " + this.pointSwapY);
  if (this.status == 1) {
          $("#main").append("<img class='monster"+ this.name +"' src='img/prettymonter.png' alt='' width='100' height='100'/>");
          $(".monster" + this.name).css({
            "position": "relative",
            "left": this.x,
            "top": this.y
          });
          $(".monster" + this.name).animate({
          left: this.pointSwapX,
          top: this.pointSwapY
        },
        {
          duration: 5000,
          step: function (now,fx) {
            monterCur.checkOutScreen();
          }
        });
        if (this.isSwapDirection) {
          $(".monster" + this.name).animate({
          left: this.x,
          top: this.y
        },2000);
        }
        $(".monster" + this.name).click(function () {
          this.remove();
        });
    }
}
Monster.prototype.checkOutScreen = function() {
  var mainLeft = mainScreen.offset().left;
  var mainTop = mainScreen.offset().top
  // console.log("checkOutScreen work!" + ".monster" + this.name );
  if (this.status == 1) {
    var x = $(".monster" + this.name).offset().left;
    var y = $(".monster" + this.name).offset().top;
    console.log("checkOutScreen work!" + ".monster" + this.name +" " + "left" + (x - mainScreen.offset().left) + " top: " + (y -mainScreen.offset().top));
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
function resetMonter() {
  monsters = new Array();
  for (var i = 0; i < monstersNumb; i++) {
    monsters[i] = new Monster(i);
  }
}
function resetLevel() {
  $("body").animate({

  },20000
  ,resetLevel);

  resetMonter();
  level++;
}
function run() {
  for (var i = 0; i < monstersAppearedNumb; i++) {
    monsters[i].update();
    monsters[i].draw();
  }
}
function setNewMonster() {
  monsters[monstersAppearedNumb].setMonsterProperty();
  monsters[monstersAppearedNumb].draw(monstersAppearedNumb);
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
  console.log("x: " + a + "y: "+ b);
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

var _monster = new Monster(1);
_monster.setMonsterProperty();
_monster.draw();
}
