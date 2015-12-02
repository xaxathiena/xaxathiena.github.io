var monthName = ["January","February","March","April","May","June","July","August","September","October","November","Decembevr"];
var dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var yearsRun = 2015;
	var monthRun = 11;
	var canChange=false;
	var dateFormat;
function daythClick( argument) {
	if(monthRun < 10 ){
	document.getElementById("inputText").value = yearsRun + "-0"+monthRun+"-"+argument;
	}else document.getElementById("inputText").value = yearsRun + "-"+monthRun+"-"+argument;
}
function changeTime(type) {
	switch(type){
		case "leftBig": yearsRun--; break;
		case "leftSmall": 
			monthRun--;
			if (monthRun==0) {
				monthRun=12;
				yearsRun--;
			};
		break;
		case "rightBig": yearsRun++;break;
		case "rightSmall": 
			monthRun++;
			if (monthRun==13) {
				monthRun=1;
				yearsRun++;
			};
		break;
		default:break;
	}
	document.getElementById("months").value =monthRun;
	document.getElementById("years").value=yearsRun;
	update();
}
function changeTimeMonth() {
	monthRun = parseInt(document.getElementById("months").value);
	update();
}
function changeTimeYear() {
	yearsRun = parseInt(document.getElementById("years").value);
	update();
}
function changeInputText() {
	var input = document.getElementById("inputText").value;;
	var patt1 =new RegExp("[1-9][0-9][0-9][0-9]-([1][0-2]|[0][1-9])-[0-9]");
	if (patt1.test(input)) {
		
		var checkNumb = parseInt(input.substring(6,7));
		if (checkNumb > 0 && checkNumb < 10) {
			dateFormat = input.substring(0,7)+"-1";
		}else dateFormat = input.substring(0,6)+"-1";
		alert(input.substring(6,7));
		canChange = true;
		update();
	}else{
		alert("Nhập sai, nhập lại với format:YYYY-MM-D");
	};
}
function update () {
	var dayCurB = false;
	if(!canChange){
		dateFormat = yearsRun + "-"+monthRun+"-1";
	}
	canChange = false;
	var day = new Date(dateFormat);
	var dateCur = new Date();
	if ((dateCur.getMonth() == day.getMonth())
		&&(dateCur.getFullYear() == day.getFullYear())) {
		dayCurB=true;
	}
	//alert(dateFormat+dateCur.getDate());
	var table = document.getElementById('tableCalendar');
	var row = table.insertRow(2);
	var numb = 1;
	var days = day.getDay();
	var dayNumber =0;
	var rows = table.rows.length;
	for (var i = 3; i < rows; i++) {
			table.deleteRow(3);
	}
	switch(day.getMonth()+1) {
		case 1: 
		case 3:
		case 5: 
		case 7:
		case 8:
		case 10:
		case 12:
			dayNumber = 31; break;
		case 4: 
		case 6: 
		case 9: 
		case 11:
			dayNumber = 30;break;
		case 2:
			if ((day.getFullYear() % 400 == 0)||((day.getFullYear() % 4 == 0)&&(day.getFullYear() % 100 != 0))) dayNumber = 29;
			else dayNumber = 28;
			break;
		default: dayNumber =30;
	}

	for (var i = 0; i < 35; i++) {
		if (days>0) {
			var cell1 = row.insertCell(numb-1);
				cell1.innerHTML = "";
				numb++;
				days--;
				continue;
		}
		if (numb <= (day.getDay()+dayNumber)) {
			if((numb-1)%7==0) row = table.insertRow(parseInt(numb/7)+2);
			var cell1 = row.insertCell(days-1);
			var dateNumber =numb-day.getDay();
			if(dayCurB&&(dateNumber==dateCur.getDate())){
				cell1.innerHTML = "<p onclick='daythClick("+dateNumber+")' style='color:red;'>"+dateNumber+"</p>";
				numb++;
			}else {
				cell1.innerHTML = "<p onclick='daythClick("+dateNumber+")'>"+dateNumber+"</p>";
				numb++;
			}
		}else {
			break;
		}
	};
}

function buildMonth() {
	document.write("<td colspan = '2' ><select id = 'months' onchange='changeTimeMonth()'>");
	for (var i = 0 ; i < monthName.length ; i++) {
		var tamp = i+1;
		document.write("<option value='" + tamp + "'>" + monthName[i] + "</option>");
	};
	document.write("</select>");
	document.write("</td>");
}

function buildYear() {
	document.write("<td><select id = 'years' onchange='changeTimeYear()'>");
	for (var i = 1900; i < 2100; i++) {
		document.write("<option value= '"+ i +"'>"+ i +"</option>");
	}
	document.write("</select>");
	document.write("</td>");
}
function buildDay() {
	document.write("<tr>");
	for(var i = 0 ; i < dayName.length ; i++) {
		document.write("<td>" + dayName[i] + "</td>");
	};
	document.write("</tr>");
}