var anh_ar = [];
var img_numb = 0;
var run_slider;
var hasRun = true;
var circle_numb = 0;
var speed = 1000/60; // 60 Frame per second
var opacity = 100;
function first () {
	if (img_numb <= 10) {
		img_numb = 0;
	};
	document.duc.src = "img/anh" + img_numb + ".jpg";
}
function last () {
	if (img_numb >= 0) {
		img_numb = 9;
	};
	document.duc.src = "img/anh" + img_numb + ".jpg";
}
function play () {
	if (hasRun) {
		run_slider = setInterval(function(){next()},3000);
		hasRun = false;
	};
	
}
function next() {
	var img = document.getElementById('img1');
	var	circle = document.getElementsByClassName("circle");
    opacity-=10;
    img.style.opacity = opacity/100;
    if (opacity > 0){
        setTimeout(next,speed);
    } else {
    	circle_numb++;
    	img_numb++;
    	if (img_numb == 5) {
			img_numb = 0;
		};
		if (circle_numb > 4) {
			circle_numb = 0;
		};
		for (var i = 0;i < 5; i++){
			if (i == circle_numb) {
				circle[i].src = "img/circle-blue.png";
			} else circle[i].src = "img/circle-black.png";
		};
    	img.src = "img/anh" + img_numb + ".jpg";
    	setTimeout(visible,speed);
    }
}
function back() {
	var img = document.getElementById('img1');
	var	circle = document.getElementsByClassName("circle");
    opacity-=10;
    img.style.opacity = opacity/100;
    if (opacity > 0){
        setTimeout(back,speed);
    } else {
    	circle_numb--;
    	img_numb--;
    	if (img_numb < 0) {
			img_numb = 4;
		};
		if (circle_numb < 0) {
			circle_numb = 4;
		};
		for (var i = 0;i < 5; i++){
			if (i == circle_numb) {
				circle[i].src = "img/circle-blue.png";
			} else circle[i].src = "img/circle-black.png";
		};
    	img.src = "img/anh" + img_numb + ".jpg";
    	setTimeout(visible(),speed);
    }
}
// With setTimeout // my favorite
function visible() {
	var img = document.getElementById('img1')
    opacity ++;
    img.style.opacity = opacity/100;
    if (opacity < 100){
        setTimeout(visible,speed);
    }
}

function mouseOverIcon(icon) {
	icon.style.opacity = 1;
}
function mouseOutIcon(icon) {
	icon.style.opacity = 0.3;
}
function changeImgByIcon (imgNumb) {
	img_numb = imgNumb;
	circle_numb = imgNumb;
	back();
}
play();