var myDate = new Date();
var yearReport;
var monthReport;
yearReport = myDate.getFullYear();
monthReport = myDate.getMonth()+1;
//monthReport = myDate.getMonth();
function getMonthFirstDay()
{
  if(monthReport<10){
    monthReport = "0"+monthReport;
  }
  var firstDay =yearReport+"-"+monthReport+"-"+"01";
	return firstDay;
}

function getMonthLastDay()
{
	myDate = new Date(yearReport,monthReport,0);
    var lastDay = yearReport+"-"+monthReport+"-"+myDate.getDate();
	return lastDay;
}
//对比日期大小
function DateDiff(d1,d2){
var result = Date.parse(d1.replace(/-/g,"/"))- Date.parse(d2.replace(/-/g,"/"));
return result;
}
