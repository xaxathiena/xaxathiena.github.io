var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var clockRadius = 100;
var monter_positionX = canvas.width / 2;//width center of canvas
var monter_positionY = canvas.height / 2;//height center of canvas
var armLength = 250;//radius of monter appearance circle
// Make sure TAU is defined (it's not by default)
Math.TAU = 2 * Math.PI;//
var monters = [];
var img = [];
var monters_numb = 10;
var monters_appeared_mub = 0;
var monters_img = new Image();
    monters_img.src='img/prettymonter.png';
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
  //  alert(monters_appeared_mub + " " + monter_radians + " "+ monters[monters_appeared_mub].x + " "+ monters[monters_appeared_mub].y + " " + monters[monters_appeared_mub].run_stepX + " " +monters[monters_appeared_mub].run_stepY);
    monters_appeared_mub++;
    setInterval(draw,3000);
}
//create monters if they' status equal 1
function drawMonters() {
  for (var i = 0; i < monters_appeared_mub; i++) {
    if (monters.status == 1) {
      ctx.drawImage(img, monters[i].x  - 50,monters[i].y - 50,100,100);
    }
  }
}
function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < monters_appeared_mub; i++) {
    monters[i].x += monters[i].run_stepX;
    monters[i].y += monters[i].run_stepY;
  }
  drawMonters();
}
reset();
setInterval(setNewMonter,5000);
