var main_canvas = document.getElementById("main");
var ctx = main_canvas.getContext("2d");

var situation_canvas = document.getElementById("situation-place");
var situation_ctx = situation_canvas.getContext("2d");
//Audio
var background_music = new Audio("res/sound/musicbackground.mp3");
var game_over_music = new Audio("res/sound/gameover.wav");


var monter_positionX = main_canvas.width / 2;//width center of canvas
var monter_positionY = main_canvas.height / 2;//height center of canvas
var armLength = 250;//radius of monter appearance circle
// Make sure TAU is defined (it's not by default)
Math.TAU = 2 * Math.PI;//
var monters = [];
var monters_numb = 20;
var monters_appeared_mub = 0;
var auto_run_monter;
var auto_run_level;
var main_run;

//paramaters
var speed = 1000;
var speed_monter = 1.0;
var time_change_level = 20000;
var score = 0;
var level = 1;
var lives = 5;
var livesBonus = 0;
var boom_numb = 3;
var stop_numb = 3;
var pause_numb = 3;
var start_time;
var remaining_time = 20000;

//check img loaded or not
var isLoad_boom = false;
var isLoad_pause = false;
var isLoad_reset = false;
var isLoad_stop = false;
var isLoad_heart = false;
var isLoad_play = false;
var isHeart_big = false;
var isLoad_blood = false;
//status of game
var canClick_main_screen = true;
var canUse_boom = true;
var canPause = true;
var canStop = true;
var canReset = true;
var canPlay = false;
var canPlay_again = false;
var isGame_over = false;
var canCountdown_pass_level = false;

//control option
var canClick_pause = true;
var canclick_boom = true;
var canclick_stop = true;

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

//setting img element
var img = new Image();
img.src='img/prettymonter.png';
var img_heart = new Image();
img_heart.src='img/misc_game_life-128.png';
var boom_icon = new Image();
boom_icon.src = "img/boom_icon.png";
var stop_icon = new Image();
stop_icon.src = "img/stop.png";
var pause_icon = new Image();
pause_icon.src = "img/pause_icon.png";
var reset_icon = new Image();
reset_icon.src = "img/reset-icon.png";
var play_icon = new Image();
play_icon.src = "img/play_icon.png";
var game_over = new Image();
game_over.src = "img/gameover.png";
var play_again = new Image();
play_again.src = "img/play_again.png";
var blood_img = new Image();
blood_img.src = "img/blood.png";


function resetMonters(){
  for (var i = 0; i < monters_numb; i++) {
    monters[i] = {
      x : 0,
      y : 0,
      run_stepX : 0,
      run_stepY : 0,
      status : 0,
      clicked: false,
      sideAppear: 0,
      isSwap_direction: false,
      point_swap_direction : 0
    };
  }
}
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//------------------------------------------------------
function setNewMonter() {
  if (monters_appeared_mub < monters_numb) {
    randomDirection(monters[monters_appeared_mub]);
    monters[monters_appeared_mub].status = 1;
    clearInterval(auto_run_monter);
  } else {
    checkAllMonterDied();
  }
}

function randomDirection(monter) {
  var sideAppear = getRandomIntInclusive(1,4);
  var random_height_point = getRandomIntInclusive(0,main_canvas.height);
  var random_width_point = getRandomIntInclusive(0,main_canvas.width);
  monter.sideAppear = sideAppear;
  console.log(sideAppear);
  switch (sideAppear) {
    case 1:
      monter.x = 0;
      monter.y = getRandomIntInclusive(0,main_canvas.height - 50);
      monter.run_stepX = main_canvas.width/500;
      monter.run_stepY = (random_height_point - monter.y)/500;
      if(getRandomIntInclusive(0,1)) {monter.point_swap_direction = 600; break;}
      monter.point_swap_direction = getRandomIntInclusive(main_canvas.width/2,main_canvas.width);
    break;
    case 2:
      monter.x = main_canvas.width - 50;
      monter.y = getRandomIntInclusive(0,main_canvas.height -50);
      monter.run_stepX = -main_canvas.width/500;
      monter.run_stepY = (random_height_point - monter.y)/500;
      if(getRandomIntInclusive(0,1)) {monter.point_swap_direction = 0; break;}
      monter.point_swap_direction = getRandomIntInclusive(0,main_canvas.width/2);
    break;
    case 3:
      monter.y = 0;
      monter.x = getRandomIntInclusive(0,main_canvas.width -50);
      monter.run_stepX = (random_width_point - monter.x)/500;
      monter.run_stepY = main_canvas.height/500;
      if(getRandomIntInclusive(0,1)) {monter.point_swap_direction = 600; break;}
      monter.point_swap_direction = getRandomIntInclusive(main_canvas.height/2, main_canvas.height);
    break;
    case 4:
      monter.y = main_canvas.height - 50;
      monter.x = getRandomIntInclusive(0,main_canvas.width - 50);
      monter.run_stepX = (random_width_point - monter.x)/500;
      monter.run_stepY = -main_canvas.height/500;
      if(getRandomIntInclusive(0,1)) {monter.point_swap_direction = 0; break;}
      monter.point_swap_direction = getRandomIntInclusive(0, main_canvas.height/2);
    break;
  }
}
function checkAllMonterDied() {
  var temp =0;
  for (var i = 0; i < monters_numb; i++) {
    if (monters[i].status == 0) {
      temp++;
    }
  }
  if (temp == monters_numb) {
    canClick_main_screen = false;
  }
}
//handing event mouse click
function mouseMoveHandler(e) {
  var relativeX_situation = e.clientX - situation_canvas.offsetLeft;
  var relativeY_situation = e.clientY - situation_canvas.offsetTop;
  var relativeX_main = e.clientX - main_canvas.offsetLeft;
  var relativeY_main = e.clientY - main_canvas.offsetTop;
  //handing event click options (boom, reset, pause, stop)
  if (!isGame_over) {
    if (relativeY_situation > 0 && relativeY_situation < 110) {//clicked on situation place
      if (relativeY_situation > 60 && relativeY_situation < 100) {//height of all option
        if (relativeX_situation > resetX && relativeX_situation < (resetX + 40)) {
          handingEventOptionClicked("reset");
          return;
        }
      }
    }

    if (relativeY_situation > 0 && relativeY_situation < 110) {//clicked on situation place
      if (relativeY_situation > 60 && relativeY_situation < 100) {//height of all option
        if (relativeX_situation > boomX && relativeX_situation < (boomX + 40)) {
          if (canclick_boom) {
            handingEventOptionClicked("boom");
            return;
          }
        }
        if (relativeX_situation > stopX && relativeX_situation < (stopX + 40)) {
          if (canclick_stop) {
            handingEventOptionClicked("stop");
            return;
          }
        }
        if (relativeX_situation > pauseX && relativeX_situation < (pauseX + 40)) {
          if (canClick_pause) {
            handingEventOptionClicked("pause");
            return;
          }
        }
      }
      return;
    }
      }
    if (canClick_main_screen) {
    //handing event click main space
    var isHit = false;
    for (var i = 0; i < ((monters_appeared_mub < monters_numb)?monters_appeared_mub:20); i++) {
      if (monters[i].status == 1 && //handing status of monter
        (relativeX_main > monters[i].x - 50) && (relativeX_main < monters[i].x + 50) && //if mouse point > leftSide and < rightSide of monter
        (relativeY_main > monters[i].y - 50) && (relativeY_main < monters[i].y + 50)) {//if mouse point > topSide and < bottomSide of mnter
          monters[i].status = 0;
          monters[i].clicked = true;
          ctx.clearRect(0, 0, main_canvas.width, main_canvas.height);
          drawMonters();
          score ++;
          livesBonus++;
          var monter_die_music = new Audio("res/sound/monterdie.wav");
          monter_die_music.play();
          if (livesBonus == 5) {
            lives++;
            if (lives == 8) {
              isHeart_big = true;
            }
            livesBonus = 0;
          }
          isHit = true;
        }
      }
      if (!isHit) {
        lives--;
        var click_fail_music = new Audio("res/sound/clickfail.wav");
        click_fail_music.play();
        checkLives();
      }
    }
    if (isGame_over && canPlay_again) {
      if (relativeX_main > (main_canvas.width/2 - 50) && relativeX_main < (main_canvas.width/2 + 50) &&
      relativeY_main > 200 && relativeY_main < 300 && lives < 1) {
        isGame_over = false;
        canPlay_again = false;
        canClick_main_screen = true;
        reset();
      }
    }
}
function handlekeydown(e) {
  if ((e.keyCode == 81) && canclick_boom) {
      handingEventOptionClicked("boom");
  }
  if ((e.keyCode == 87) && canclick_stop) {
      handingEventOptionClicked("stop");
      return;
  }
  if ((e.keyCode == 69) && canClick_pause) {
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

function handingEventOptionClicked(option) {
  switch (option) {
    case "boom":
    var monters_die_by_boom = 0;
    if (canUse_boom) {
      if (boom_numb < 1) {
        canUse_boom = false;
      } else {
        for (var i = 0; i < monters_appeared_mub; i++) {
          if (monters[i].status == 1) {
            monters[i].status = 0;
            monters[i].clicked = true;
            monters_die_by_boom++;
          }
        }
        score +=monters_die_by_boom;
        boom_numb--;
      }
    }
    break;
    case "stop":
    if (canStop) {
      if (stop_numb-- < 1) {
        stop_numb = 0;
        canStop = false;
      } else {
        situation_ctx.clearRect(0,0,situation_canvas.width,situation_canvas.height);
        drawSituation();
        clearRun();
        canStop = false;
        var isDone_countdown = false;
        var countdown_numb = 3;
        canclick_boom = false;
        canClick_pause = false;
        var countdown = setInterval(function () {
          if (countdown_numb != 0) {
            situation_ctx.clearRect(situation_canvas.width/2,0,40,40);
            drawCountDownNumber(countdown_numb--);
          }else {
            auto_run_monter = setInterval(run,10);
            auto_run_level = setInterval(runNewMonter,speed);
            main_run = setInterval(resetLevel,remaining_time);
            canStop = true;
            canclick_boom = true;
            canClick_pause = true;
            clearInterval(countdown);
          }
        },1000);
      }
    }
    break;
    case "pause":
    if (( pause_numb == 0 && !canPause)|| canPlay) {
      //run
      auto_run_monter = setInterval(run,10);
      auto_run_level = setInterval(runNewMonter,speed);
      main_run = setInterval(resetLevel,remaining_time);
      background_music.play();
      canPlay = false;
      canPause = true;
      canClick_main_screen = true;
      canUse_boom = true;
      canclick_stop = true;
    } else if(canPause && pause_numb > 0){
      clearRun();
      canUse_boom = false;
      canclick_stop = false;
      pause_numb--;
      background_music.pause();
      canPlay = !canPlay;
      canPause = !canPause;
      situation_ctx.clearRect(0,0,situation_canvas.width,situation_canvas.height);
      drawSituation();
      canClick_main_screen = false;
    }
    break;
    case "reset":
    reset();
    break;
    default:
  }
}
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
  if (!isHeart_big) {
    if (!isLoad_heart) {
      img_heart.onload = function () {
        for (var i = 0; i < lives; i++) {
          situation_ctx.drawImage(img_heart, 160 + i*30, livesY-distanceY_left_info + 5, 30, 30);
        }
      }
      isLoad_heart = true;
    } else for (var i = 0; i < lives; i++) {
      situation_ctx.drawImage(img_heart, 160 + i*30, livesY-distanceY_left_info + 5, 30, 30);
    }
  } else {
    situation_ctx.drawImage(img_heart, 180, livesY-distanceY_left_info + 5, 30, 30);
    situation_ctx.fillStyle = "red";
    situation_ctx.fillText(lives, 160, livesY - 5 + 5);
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
  if (!isLoad_boom) {
    boom_icon.onload = function () {
      situation_ctx.drawImage(boom_icon,boomX,60,40,40);
    }
    isLoad_boom = true;
  } else  situation_ctx.drawImage(boom_icon,boomX,60,40,40);

  situation_ctx.font = "20px Comic Sans MS";
  situation_ctx.fillStyle = "red";
  situation_ctx.fillText(stop_numb,stopX + 12,60);
  if (!isLoad_stop) {
    stop_icon.onload = function () {
      situation_ctx.drawImage(stop_icon,stopX,60,40,40);
    }
    isLoad_stop = true;
  } else situation_ctx.drawImage(stop_icon,stopX,60,40,40);

  situation_ctx.font = "20px Comic Sans MS";
  situation_ctx.fillStyle = "red";
  situation_ctx.fillText(pause_numb,pauseX + 12,60);
  if (!isLoad_pause) {
    pause_icon.onload = function () {
      situation_ctx.drawImage(pause_icon,pauseX,60,40,40);
    }
    isLoad_pause = true;
  } else if (canPlay) {
    situation_ctx.drawImage(play_icon,pauseX,60,40,40);
  } else situation_ctx.drawImage(pause_icon,pauseX,60,40,40);

  if (!isLoad_reset) {
    reset_icon.onload = function () {
      situation_ctx.drawImage(reset_icon,resetX,60,40,40);
    }
    isLoad_reset = true;
  } else situation_ctx.drawImage(reset_icon,resetX,60,40,40);
}
function drawGameOver() {
  ctx.drawImage(game_over,main_canvas.width/2 - 150,100, 300, 120);
  ctx.drawImage(play_again,main_canvas.width/2 - 50, 200,100,100);
  canClick_main_screen = false;
  drawSituation();
}
function drawCountDownNumber(numb) {
  situation_ctx.beginPath();
  situation_ctx.arc(situation_canvas.width/2 + 15,18,20,0,2*Math.PI);
  situation_ctx.lineWidth = 2;
  situation_ctx.strokeStyle = '#14e5f2';
  situation_ctx.stroke();
  situation_ctx.font = "20px Comic Sans MS";
  situation_ctx.fillStyle = "red";
  situation_ctx.fillText(numb,situation_canvas.width/2 + 9,25);
}
drawSituation();

//create monters if they' status equal 1
function drawMonters() {
  for (var i = 0; i < ((monters_appeared_mub < monters_numb)?monters_appeared_mub:20); i++) {
    if (monters[i].status == 1) {
      ctx.drawImage(img,monters[i].x  - 50,monters[i].y - 50,100,100);
    }
    if (monters[i].clicked) {
      ctx.drawImage(blood_img,monters[i].x  - 50,monters[i].y - 50,100,100);
    }
  }
}
function update () {
  ctx.clearRect(0, 0, main_canvas.width, main_canvas.height);
  situation_ctx.clearRect(0,0,situation_canvas.width,situation_canvas.height);
  for (var i = 0; i < ((monters_appeared_mub < monters_numb)?monters_appeared_mub:20); i++) {
    if (monters[i].status == 1) {
      if ((monters[i].x + 50) < 0 || (monters[i].x + 50) > main_canvas.width||//monters moving out the width screen
      (monters[i].y + 50) < 0 || (monters[i].y + 50) > main_canvas.height)//monters moving out the height screen
      {
        lives--;
        checkLives();
        monters[i].status = 0;
      } else {
        if (!monters[i].isSwap_direction) {
          switch (monters[i].sideAppear) {
            case 1:
            if (monters[i].x > monters[i].point_swap_direction) {
              if (getRandomIntInclusive(0,1)) {monters[i].run_stepX = -monters[i].run_stepX; monters[i].run_stepY = -monters[i].run_stepY;monters[i].isSwap_direction = true;}
            }
            break;
            case 2:
            if (monters[i].x < monters[i].point_swap_direction) {
              if (getRandomIntInclusive(0,1)) {monters[i].run_stepX = -monters[i].run_stepX; monters[i].run_stepY = -monters[i].run_stepY;monters[i].isSwap_direction = true;}
            }
            break;
            case 3:
            if (monters[i].y > monters[i].point_swap_direction) {
              if (getRandomIntInclusive(0,1)) {monters[i].run_stepX = -monters[i].run_stepX; monters[i].run_stepY = -monters[i].run_stepY;monters[i].isSwap_direction = true;}
            }
            break;
            case 4:
            if (monters[i].y < monters[i].point_swap_direction) {
              if (getRandomIntInclusive(0,1)) {monters[i].run_stepX = -monters[i].run_stepX; monters[i].run_stepY = -monters[i].run_stepY;monters[i].isSwap_direction = true;}
            }
            break;
          }
        }
        monters[i].x += monters[i].run_stepX * level;
        monters[i].y += monters[i].run_stepY * level;
      }
    }
  }
}
function checkLives() {
  if (lives < 8) {
    isHeart_big = false;
  }
  if (lives < 1) {
    isGame_over = true;
      var wait_time = setInterval(
        function () {
          canPlay_again = true;
          clearInterval(wait_time);
        }
      ,3500);
    for (var i = 0; i < monters_appeared_mub; i++) {
      monters[i].status = 0;
    }
  }
}
function clearRun() {
  clearInterval(auto_run_monter);
  clearInterval(auto_run_level);
  clearInterval(main_run);
}
function run() {
  var real_time = new Date().getTime();
  remaining_time = 20000 - real_time + start_time;//caculation remaining time to change level
  update();
  drawMonters();
  drawSituation();
  if (isGame_over) {
    drawGameOver();
    background_music.pause();
    game_over_music.play();
    clearRun();
  }
}
function runNewMonter() {
  setNewMonter();
  monters_appeared_mub++;
  clearInterval(auto_run_monter);
  auto_run_monter = setInterval(run,10);
}

function resetLevel(argument) {
  canClick_main_screen = true;
  if (time_change_level != remaining_time) {
    remaining_time = 20000;
    clearInterval(main_run);
    main();
    return;
  }
  resetMonters();
  start_time = new Date().getTime();
  clearInterval(auto_run_level);
  speed -= 200;
  if (speed <= 0) {
    speed = 200
  }
  speed_monter += 0.1;
  level = parseInt(speed_monter*10 - 10);
  monters_appeared_mub = 0;
  auto_run_level = setInterval(runNewMonter,speed);
}
function main() {
  background_music.currentTime = 0;
  background_music.play();
  background_music.loop = true;
  resetLevel();
  clearInterval(main_run);
  main_run = setInterval(resetLevel,20000);
}
function reset() {
  ctx.clearRect(0, 0, main_canvas.width, main_canvas.height);
  situation_ctx.clearRect(0,0,situation_canvas.width,situation_canvas.height);
  drawSituation();
  clearInterval(auto_run_monter);
  clearInterval(auto_run_level);
  clearInterval(main_run);
  speed = 1000;
  speed_monter = 1.0;
  time_change_level = 20000;
  score = 0;
  level = 1;
  lives = 5;
  livesBonus = 0;
  boom_numb = 3;
  stop_numb = 3;
  pause_numb = 3;
  start_time;
  remaining_time = 20000;
  //status of game
  canClick_main_screen = true;
  canUse_boom = false;
  canPause = false;
  canStop = false;
  canReset = false;
  canPlay = false;
  var wait_time_reset = setInterval(function () {
    canUse_boom = true;
    canPause = true;
    canStop = true;
    canReset = true;
    clearInterval(wait_time_reset);
  },2000);
  main();
}
main();
0
