var monthname = ["January","February","March","April","May","June","July","August","September","October","November","Decembevr"];
var dayname = ["Su","Mo","Tu","Wed","Th","Fr","Sa"];
	var yearsrun = 2015;	//Fixing year to show on schedule
	var monthrun = 11;	    //Fixing month to show on schedule
	var canchange = false; //check to exactly value to continue or not
	var dateformat;        // it's a argument to get day value to show on schedule
							//for example, if customer want to see schedule at march 2015, then format'll be 2015 - 3 - 1
	var showscheduleornot = true;//là biết xử lý sự kiện img schedule được click. Nó dùng để quyết định show bảng schedule hay không
	//hàm xử lý sự kiện khi 1 ngày trong lịch được click
function daythClick(testsend) {
	if(monthrun < 10 ) { //kiểm tra xem tháng đang show lớn hơn 10 hay không
	document.getElementById("inputText").value = yearsrun + "-0"+monthrun+"-"+testsend;
	} else document.getElementById("inputText").value = yearsrun + "-"+monthrun+"-"+testsend;
}
/*Xử lý xự kiện khi 4 nút leftBig, leftRight, rightBig, rightLeft được click
	Mỗi khi 1 trong 4 nút này được click, giá trị của tháng và năm sẽ thay đổi tương ứng. Sau đó vẻ lại bảng schedule
*/
function changeTime(type) {
	switch(type) {
		case "leftBig": yearsrun--; break;
		case "leftSmall": 
			monthrun--;
			if (monthrun == 0) {
				monthrun = 12;
				yearsrun--;
			};
		break;
		case "rightBig": yearsrun++;break;
		case "rightSmall": 
			monthrun++;
			if (monthrun == 13) {
				monthrun = 1;
				yearsrun++;
			};
		break;
		default:break;
	}
	document.getElementById("months").value =monthrun;
	document.getElementById("years").value=yearsrun;
	update();
}
//Xủ lý sự kiện khi selection Months bị thay đổi
function changeTimeMonth() {
	monthrun = parseInt(document.getElementById("months").value);
	update();
}
//Xủ lý sự kiện khi selection Years bị thay đổi
function changeTimeYear() {
	yearsrun = parseInt(document.getElementById("years").value);
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
	var patt1 =new RegExp("[1-9][0-9][0-9][0-9]-([1][0-2]|[0][1-9])-[0-9]");
	if (patt1.test(input)) {
		
		var checknumb = parseInt(input.substring(6,7));
		if (checknumb > 0 && checknumb < 10) {
			dateformat = input.substring(0,7)+"-1";
		}else dateformat = input.substring(0,6)+"-1";
		canchange = true;
		update();
	}else{
		alert("Nhập sai, nhập lại với format:YYYY-MM-D");
	};
}
//Vẽ ngày trong tháng của lịch
function update () {
	var daycurb = false;//dùng để kiểm tra xem tháng, năm đang show có phải là tháng năm hiện tại hay không.
						// Nếu có thì daycurb sẽ là true rồi bôi đỏ ngày hiện tại
	if(!canchange){
		dateformat = yearsrun + "-"+monthrun+"-1";
	}
	canchange = false;
	var day = new Date(dateformat);
	var dateCur = new Date();
	//Xủ lý tháng, năm đang show có phải là tháng năm hiện tại hay không.
	if ((dateCur.getMonth() == day.getMonth())
		&&(dateCur.getFullYear() == day.getFullYear())) {
		daycurb=true;
	}

	var table = document.getElementById('tableCalendar');
	var row = table.insertRow(2);
	var numb = 1;
	var days = day.getDay();
	var daynumber =0;    //ngày của tháng đang show
	var rows = table.rows.length;
	//những ô từ thứ 2 đến thứ hiện tại của mùng 1 tháng đó sẽ là rỗng
	for (var i = 3; i < rows; i++) {
			table.deleteRow(3);
	}
	//Kiểm tra năm nhuận, xuất ra số ngày của tháng đang show
	switch(day.getMonth()+1) {
		case 1: 
		case 3:
		case 5: 
		case 7:
		case 8:
		case 10:
		case 12:
			daynumber = 31; break;
		case 4: 
		case 6: 
		case 9: 
		case 11:
			daynumber = 30;break;
		case 2:
			if ((day.getFullYear() % 400 == 0)||((day.getFullYear() % 4 == 0)&&(day.getFullYear() % 100 != 0))) daynumber = 29;
			else daynumber = 28;
			break;
		default: daynumber =30;
	}
	//vẽ những ngày trong tháng
	for (var i = 0; i < 35; i++) {
		if (days>0) {
			var cell1 = row.insertCell(numb-1);
				cell1.innerHTML = "";
				numb++;
				days--;
				continue;
		}
		if (numb <= (day.getDay()+daynumber)) {
			if((numb-1) % 7 == 0) row = table.insertRow(parseInt(numb/7)+2);
			var cell1 = row.insertCell(days-1);
			var dateNumber = numb-day.getDay();
			if(daycurb&&(dateNumber == dateCur.getDate())){
				cell1.innerHTML = "<p onmouseout =\"" + "changeStyleMouseOut(this)\"" + "onmouseover=\"" + "changeStyleMouseOver(this)\"" + " onclick='daythClick("+dateNumber+"); openSchedule();' style='color:red;'>"+dateNumber+"</p>";
				numb++;
			}else {
				cell1.innerHTML = "<p onmouseout =\"" + "changeStyleMouseOut(this)\"" + "onmouseover=\"" + "changeStyleMouseOver(this)\"" + " onclick='daythClick("+dateNumber+"); openSchedule();'>"+dateNumber+"</p>";
				numb++;
			}
		}else {
			break;
		}
	};
}
//Xủ lý xự kiện khi rê chuột qua từng ngày trong lịch
function changeStyleMouseOver (testsend) {
	testsend.parentNode.style.backgroundColor ="blue";
}
function changeStyleMouseOut (testsend) {
	testsend.parentNode.style.backgroundColor ="white";
}
//----------------------------------------------------
//vẽ selection tháng
function buildMonth() {
	document.write("<td colspan = '2' ><select id = 'months' onchange='changeTimeMonth()'>");
	for (var i = 0 ; i < monthname.length ; i++) {
		var tamp = i + 1;
		document.write("<option value='" + tamp + "'>" + monthname[i] + "</option>");
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
	for(var i = 0 ; i < dayname.length ; i++) {
		document.write("<td>" + dayname[i] + "</td>");
	};
	document.write("</tr>");
}
function builAll() {
		document.write("<input style='width:87%;' id ='inputText' type='text' name='dateChoice' onchange='changeInputText()'>");
		document.write("<img style=' margin-bottom: -6px;width: 11%; height: 25px;' src='img/timeschedule-512.png' alt='timesschedule' onclick='openSchedule()'>");
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
function openSchedule ()
{
	if (showscheduleornot == true) {
		document.getElementById('schedule').style.display= "block";
	}
	else {
		document.getElementById('schedule').style.display= "none";
	}
	showscheduleornot =! showscheduleornot;
}