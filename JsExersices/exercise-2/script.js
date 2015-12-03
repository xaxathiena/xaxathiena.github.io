var month_name_arr = ["January","February","March","April","May","June","July","August","September","October","November","Decembevr"];
var day_name_arr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];	
var date_current = new Date();
var year_to_show = date_current.getFullYear();
var month_to_show = date_current.getMonth() + 1;
var haschange_input = false;
var date_to_show_str;
var hasshow_schedule = true;
function daythClick(day_numb) {
	if(month_to_show < 10 ) { //kiểm tra xem tháng đang show lớn hơn 10 hay không
	document.getElementById("inputText").value = year_to_show + "-0"+month_to_show+"-"+day_numb;
	} else document.getElementById("inputText").value = year_to_show + "-"+month_to_show+"-"+day_numb;
}
/*Xử lý xự kiện khi 4 nút leftBig, leftRight, rightBig, rightLeft được click
	Mỗi khi 1 trong 4 nút này được click, giá trị của tháng và năm sẽ thay đổi tương ứng. Sau đó vẻ lại bảng schedule
*/
function changeTime(type_of_change_date) {
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
//Xủ lý sự kiện khi selection Months bị thay đổi
function changeTimeMonth() {
	month_to_show = parseInt(document.getElementById("months").value);
	update();
}
//Xủ lý sự kiện khi selection Years bị thay đổi
function changeTimeYear() {
	year_to_show = parseInt(document.getElementById("years").value);
	update();
}
/*
	Xủ lý xự kiện khi value input bị thay đổi.
	Gồm có:
	1. Kiểm tra định dạng YYYY-MM-D
	2. Cho phép xây lại lịch
*/
function changeInputText() {
	var input = document.getElementById("inputText").value;;
	var date_format =new RegExp("[1-9][0-9][0-9][0-9]-([1][0-2]|[0][1-9])-[0-9]");
	if (date_format.test(input)) {
		
		var month_numb_input = parseInt(input.substring(6,7));
		if (month_numb_input > 0 && month_numb_input < 10) {
			date_to_show_str = input.substring(0,7)+"-1";
		}else date_to_show_str = input.substring(0,6)+"-1";
		haschange_input = true;
		update();
	}else{
		alert("Nhập sai, nhập lại với format:YYYY-MM-D");
	};
}
//Vẽ ngày trong tháng của lịch
function update () {
	var isdate_current = false;
	if(!haschange_input){
		date_to_show_str = year_to_show + "-"+month_to_show + "-1";
	}
	haschange_input = false;
	var date_to_show = new Date(date_to_show_str);
	if ((date_current.getMonth() == date_to_show.getMonth())
		&& (date_current.getFullYear() == date_to_show.getFullYear())) {
		isdate_current = true;
	}
	//alert(date_to_show_str+date_current.getDate());
	var table_calendar = document.getElementById('tableCalendar');
	var tb_row_insert = table_calendar.insertRow(2);
	var numb_of_cell_on_table = 1;
	var weekday_of_1th = date_to_show.getDay();
	var day_numb_of_month_show =0;
	var row_length = table_calendar.rows.length;
	for (var i = 3; i < row_length; i++) {
			table_calendar.deleteRow(3);
	}
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
			var cell_insert = tb_row_insert.insertCell(numb_of_cell_on_table-1);
				cell_insert.innerHTML = "";
				numb_of_cell_on_table++;
				weekday_of_1th--;
				continue;
		}
		if (numb_of_cell_on_table <= (date_to_show.getDay()+day_numb_of_month_show)) {
			if((numb_of_cell_on_table-1) % 7 == 0) tb_row_insert = table_calendar.insertRow(parseInt(numb_of_cell_on_table/7) + 2);

			var cell_insert = tb_row_insert.insertCell(weekday_of_1th - 1);
			var day_number = numb_of_cell_on_table - date_to_show.getDay();
			if(isdate_current && (day_number == date_current.getDate())){
				cell_insert.innerHTML = "<p onmouseout =\"" + "changeStyleMouseOut(this)\"" + "onmouseover=\"" + "changeStyleMouseOver(this)\"" + "onclick='daythClick("+day_number+"); hideSchedualOrNot();' style='color:red;'>"+day_number+"</p>";
				numb_of_cell_on_table++;
			}else {
				cell_insert.innerHTML = "<p onmouseout =\"" + "changeStyleMouseOut(this)\"" + "onmouseover=\"" + "changeStyleMouseOver(this)\"" +"onclick='daythClick("+day_number+"); hideSchedualOrNot();'>"+day_number+"</p>";
				numb_of_cell_on_table++;
			}
		}else {
			break;
		}
	};
}
//Xủ lý xự kiện khi rê chuột qua từng ngày trong lịch
function changeStyleMouseOver (day_numb) {
	day_numb.parentNode.style.backgroundColor ="blue";
}
function changeStyleMouseOut (day_numb) {
	day_numb.parentNode.style.backgroundColor ="white";
}
//----------------------------------------------------
//vẽ selection tháng
function buildMonth() {
	document.write("<td colspan = '2' ><select id = 'months' onchange='changeTimeMonth()'>");
	for (var i = 0 ; i < month_name_arr.length ; i++) {
		var tamp = i + 1;
		document.write("<option value='" + tamp + "'>" + month_name_arr[i] + "</option>");
	};
	document.write("</select>");
	document.write("</td>");	
	document.getElementById("months").value =11;
}
//vẻ selection năm
function buildYear() {
	document.write("<td><select id = 'years' onchange='changeTimeYear()'>");
	for (var i = 1900; i < 2100; i++) {
		document.write("<option value= '"+ i +"'>"+ i +"</option>");
	}
	document.write("</select>");
	document.write("</td>");
	document.getElementById("years").value=2015;
}
//vẽ thứ trong tuần
function buildDay() {
	document.write("<tr>");
	for(var i = 0 ; i < day_name_arr.length ; i++) {
		document.write("<td>" + day_name_arr[i] + "</td>");
	};
	document.write("</tr>");
}
function builAll() {
		document.write("<input style='width:87%;' id ='inputText' type='text' name='dateChoice' onchange='changeInputText()'>");
		document.write("<img style=' margin-bottom: -6px;width: 11%; height: 25px;' src='img/timeschedule-512.png' alt='timesschedule' onclick='hideSchedualOrNot()'>");
		document.write("<div id='schedule'>");
		document.write("<table id='tableCalendar'>");
			document.write("<tr>");
				document.write("<td><img src='img/arrow-left-big.png' onclick=\"" + "changeTime('leftBig')\"" + "></td>");
				document.write("<td><img src='img/arrow-left-small.png' onclick=\"" + "changeTime('leftSmall')\"" + "></td> ");
				buildMonth();
				buildYear();
				document.write("<td><img src='img/arrow-right-small.png' onclick=\"" + "changeTime('rightSmall')\"" + "></td>");
				document.write("<td><img src='img/arrow-right-big.png' onclick=\"" + "changeTime('rightBig')\"" + "></td>");
			document.write("</tr>");
					buildDay();
		document.write("</table>");
	document.write("</div>");
	update();
	document.getElementById('schedule').style.display= "none";
}
/*
	xử lý khi thay đổi giá trị trên username, password và email
	Xủ lý gồm:
	testsend: là đoạn text để gữi qua server xử lý
	casechoice: là tại text muốn xử lý là gì.
				1: là xử lý username
				2: là xử lý password
				3: là xử lý email
*/
function checkValue (testsend,casechoice) {
			var checkvalueajax = new XMLHttpRequest();
			 checkvalueajax.onreadystatechange = function() {
	    		if (checkvalueajax.readyState == 4 && checkvalueajax.status == 200) {
	    			var validOrNot = checkvalueajax.responseText;
					if (checkvalueajax.responseText === "false") {
		    			switch(casechoice) {
		    				case "1": 
		    						document.getElementById('checkUserName').innerHTML="Username lenghth min 8 letter";
		    					break;
		    				case "2": 
		    						document.getElementById('checkPassword').innerHTML="Password lenghth min 8 letter";
		    					break;
		    				case "3": 
		    						document.getElementById('checkEmail').innerHTML="Email Wrong Format"; 
		    					break;
		    				default: 
		    						document.getElementById('checkEmail').innerHTML="Email Wrong Format"; 
		    			}
		    		}else {
		    				switch(casechoice) {
		    				case "1": 
		    						document.getElementById('checkUserName').innerHTML="";
		    					break;
		    				case "2": 
		    						document.getElementById('checkPassword').innerHTML="";
		    					break;
		    				case "3": 
		    						document.getElementById('checkEmail').innerHTML=""; 
		    					break;
		    				default: 
		    						document.getElementById('checkEmail').innerHTML=""; 
		    			}
		    		}
 			 	};
 			}
  			checkvalueajax.open("POST", "ajax.php", true);
 			checkvalueajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	 		switch(casechoice) {
	 			case "1": checkvalueajax.send("userName=" +testsend + "&type=1");break;
	 			case "2": checkvalueajax.send("passWord=" +testsend + "&type=2"); break;
	  			case "3": checkvalueajax.send("email=" +testsend + "&type=3"); break;
	 			default:  checkvalueajax.send("email=" +testsend + "&type=3");
	 		}
}

//Xử lý xự kiện khi img schedule được click
function hideSchedualOrNot ()
{
	if (hasshow_schedule == true) {
		document.getElementById('schedule').style.display= "block";
	}
	else {
		document.getElementById('schedule').style.display= "none";
	}
	hasshow_schedule =! hasshow_schedule;
}