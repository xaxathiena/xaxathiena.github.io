var month_name_arr = ["January","February","March","April","May","June","July","August","September","October","November","Decembevr"];
var day_name_arr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var date_current = new Date();
var year_to_show = date_current.getFullYear();
var month_to_show = date_current.getMonth() + 1;
var haschange_input = false;
var date_to_show_str;
var hasShow_schedule = true;

function daythClick( day_numb ) {
	$("#inputText").val(day_numb + "-" + month_to_show + "-" + year_to_show);

}

function hideSchedualOrNot ()
{
  $("#tableCalendar").fadeToggle("1000");
}
function buildMonth() {
  var buildMonth_Str = "";
	buildMonth_Str += "<td colspan = '2' ><select id = 'months' onchange = 'changeTimeMonth()'>";
	for (var i = 0 ; i < month_name_arr.length ; i++) {
		var tamp = i+1;
	   buildMonth_Str += "<option value ='" + tamp + "'>" + month_name_arr[i] + "</option>";
	};
	buildMonth_Str += "</select>";
	buildMonth_Str +="</td>";
  return buildMonth_Str;
}

function buildYear() {
  var buildYear_str = "";
	buildYear_str += "<td><select id = 'years' onchange = 'changeTimeYear()'>";
	for (var i = 1900; i < 2100; i++) {
	buildYear_str += "<option value= '"+ i +"'>"+ i +"</option>";
	}
	buildYear_str += "</select>";
	buildYear_str += "</td>";
  return buildYear_str;
}
function buildDay() {
  var buildDay_str = "";
	buildDay_str += "<tr>";
	for(var i = 0 ; i < day_name_arr.length ; i++) {
	buildDay_str += "<td>" + day_name_arr[i] + "</td>";
	};
	buildDay_str += "</tr>";
  return buildDay_str;
}
function update () {
	var isdate_current = false;
	if(!haschange_input) {
		date_to_show_str = year_to_show + "-"+month_to_show + "-1";
	}
	haschange_input = false;
	var date_to_show = new Date(date_to_show_str);
	if ((date_current.getMonth() == date_to_show.getMonth())
		&& (date_current.getFullYear() == date_to_show.getFullYear())) {
		isdate_current = true;
	}
	//alert(date_to_show_str+date_current.getDate());
  var buil_day_all_str ="";
  var parity_week = true;
  var week_class = (parity_week)? "week1":"week0";
  buil_day_all_str += "<tr class='" + week_class + "'>";
  parity_week = !parity_week;
	var numb_of_cell_on_table = 1;
	var weekday_of_1th = date_to_show.getDay();
	var day_numb_of_month_show =0;
  $(".week1").remove();
  $(".week0").remove();
	switch(date_to_show.getMonth() + 1) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			day_numb_of_month_show = 31; break;
		case 4:
		case 6:
		case 9:
		case 11:
			day_numb_of_month_show = 30; break;
		case 2:
			if ((date_to_show.getFullYear() % 400 == 0)||((date_to_show.getFullYear() % 4 == 0) && (date_to_show.getFullYear() % 100 != 0))) day_numb_of_month_show = 29;
			else day_numb_of_month_show = 28;
			break;
		default: day_numb_of_month_show = 30;
	}
	for (var i = 0; i < 35; i++) {
		if (weekday_of_1th > 0) {
      buil_day_all_str += "<td></td>";
				numb_of_cell_on_table++;
				weekday_of_1th--;
				continue;
		}
		if (numb_of_cell_on_table <= (date_to_show.getDay() + day_numb_of_month_show)) {
			if((numb_of_cell_on_table - 1) % 7 == 0){
        week_class = (parity_week)? "week1":"week0";
        buil_day_all_str += "</tr><tr class='" + week_class + "'>";
        parity_week = !parity_week;
      }
			buil_day_all_str += "<td>";
			var day_number = numb_of_cell_on_table - date_to_show.getDay();
			if(isdate_current && (day_number == date_current.getDate())){
				buil_day_all_str += "<p onmouseout =\"" + "changeStyleMouseOut(" +parity_week+ ",this)\"" + "onmouseover=\"" + "changeStyleMouseOver(this)\"" + "onclick='daythClick("+day_number+"); hideSchedualOrNot();' style='color:red;'>"+day_number+"</p></td>";
				numb_of_cell_on_table++;
			}else {
				buil_day_all_str += "<p onmouseout =\"" + "changeStyleMouseOut(" +parity_week+ ",this)\"" + "onmouseover=\"" + "changeStyleMouseOver(this)\"" +"onclick='daythClick("+day_number+"); hideSchedualOrNot();'>"+day_number+"</p></td>";
				numb_of_cell_on_table++;
			}
		}else {
      buil_day_all_str += "<td></td>";
		}
	};
  $("#tableCalendar").append(buil_day_all_str);
  runCSS();
}
function changeTime( type_of_change_date ) {
	switch( type_of_change_date ) {
		case "leftBig":
			year_to_show--; break;
		case "leftSmall":
			month_to_show--;
			if (month_to_show == 0) {
				month_to_show = 12;
				year_to_show--;
			};
		break;
		case "rightBig":
			year_to_show++;break;
		case "rightSmall":
			month_to_show++;
			if (month_to_show == 13) {
				month_to_show = 1;
				year_to_show++;
			};
		break;
		default:break;
	}
	document.getElementById("months").value = month_to_show;
	document.getElementById("years").value = year_to_show;
	update();
}
function changeTimeMonth() {
	month_to_show = parseInt($("#months").val());
	update();
}
function changeTimeYear() {
	year_to_show = parseInt($("#years").val());
	update();
}
function builAllIntitial() {
  var builAllIntitia_str = "";
	builAllIntitia_str += "<div id = 'check'>" +
	"<input id = 'inputText' type = 'text' name = 'dateChoice' disabled>" +
	"<img style=' margin-bottom: -6px;width: 3%; height: 25px;' src='img/timeschedule-512.png' alt='timesschedule' onclick='hideSchedualOrNot()'>" +
	"<table id = 'tableCalendar'>" +
	"<tr>" +
	"<td><img src = 'img/arrow-left-big.png' onclick = \"changeTime('leftBig')\" ></td>" +
	" <td><img src = 'img/arrow-left-small.png' onclick = \"changeTime('leftSmall')\" >" +
	"</td> " +
	buildMonth() +
	buildYear() +
	"<td><img src = 'img/arrow-right-small.png' onclick = \"changeTime('rightSmall')\" ></td>" +
	"<td><img src = 'img/arrow-right-big.png' onclick = \"changeTime('rightBig')\" ></td>" +
	"</tr>" +
	buildDay() +
//	document.getElementById('months').value = 11;
//	document.getElementById('years').value = 2015;
	"</table>" +
	"</div>";
  $("body").append(builAllIntitia_str);

  $("#months").val(11);
  $("#years").val(2015);
	update();

}
function runCSS() {
  $("tr").css({
    "margin": "auto"
  });
  $("tr img").css({
    "width": "30px",
    "height": "30px"
  });
  $("tr td").css({
    "width": "80px",
  });
  $("td p").css({
    "margin-left": "30%",
    "margin-top": "0px"
  });
  $(".week0").css({
    "backgroundColor": "#06efd6"
  });
  $(".week1").css({
    "backgroundColor": "#9406ef"
  });
}
function changeStyleMouseOver (testsend) {
  testsend.parentNode.style.backgroundColor = "#eff6f9";
}
function changeStyleMouseOut (isParityWeek,testsend) {
	if(isParityWeek) testsend.parentNode.style.backgroundColor = "#06efd6";
  else             testsend.parentNode.style.backgroundColor = "#9406ef";
}
