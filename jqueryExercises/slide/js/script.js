var isImg1_show = true;
var img_numb = 0;
var indexCirle;
var run_slider;
$("#img1").attr("src","res/imgs/"+ ++img_numb +".jpg");
var indexCirle = $(".circle");
function next() {
  img_numb = checkImgIndex(++img_numb)
  switchImg(img_numb);
}

function back() {
  img_numb = checkImgIndex(--img_numb)
  switchImg(img_numb);
}
function switchImg(imgIndex) {
  for (var i = 0; i < $(".circle").length; i++) {
    indexCirle = $(".circle")[i];
    if (i == (imgIndex - 1)) {
      $(indexCirle).attr("src","res/imgs/circle-blue.png");
    } else $(indexCirle).attr("src","res/imgs/circle-black.png");
  }
  if (isImg1_show) {
    $("#img1").fadeOut(250,function() {
      console.log(img_numb +" "+checkImgIndex(img_numb));
      $("#img2").css({'display':'block'}).attr("src","res/imgs/"+ imgIndex  +".jpg");
      $("#img1").css({'display':'none'}).removeAttr("src");
    });
    isImg1_show = !isImg1_show;
  } else {
    $("#img2").fadeOut(250,function() {
      img_numb = checkImgIndex(img_numb)
      console.log(img_numb+" "+checkImgIndex(img_numb));
        $("#img1").css({'display':'block'}).attr("src","res/imgs/"+ imgIndex +".jpg");
      $("#img2").css({'display':'none'}).removeAttr("src");
    });
    isImg1_show = !isImg1_show;
  }
}
function changeImgByIcon(index) {
  img_numb = index - 1;
  next();
}
function mouseOverIcon(icon) {
	icon.style.opacity = 1;
}
function mouseOutIcon(icon) {
	icon.style.opacity = 0.5;
}

function checkImgIndex(index) {
  if (index == 6) {
    return 1;
  }
  if (index <= 0) {
    return 5;
  }
  return index;
}
run_slider = setInterval(function(){next()},3000);
