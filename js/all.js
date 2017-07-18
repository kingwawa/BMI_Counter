//array
var data = JSON.parse(localStorage.getItem("ListData"))||[];
var btn = document.querySelector("#btn");
var record = document.querySelector(".record");
btn.addEventListener("click",count,false);
record.addEventListener("click",cancel,false);


function count(){

//取身高體重計算
	var ht = Math.round(document.querySelector(".ht").value);
	var wg = Math.round(document.querySelector(".wg").value);
	var result = wg / ((ht*ht)/10000);
	var resultBmi = formatFloat(result);

	if (ht==""||wg==""){
		alert("欄位值不得為空值");
		clear();
	}else if(ht<=0||wg<=0){
		alert("欄位值不得為負值");
		clear();
	}else if(isNaN(ht)||isNaN(wg)){
		alert("格式輸入錯誤");
		clear();
	}else if(ht>=300){
		alert("全世界最高的人也才272cm，不可以騙人哦 ^.^！身高範圍 0-299");
		clear();
	}else if(wg>650){
		alert("全世界最重的人也才635kg，不可以騙人哦 ^.^！體重範圍 0-650");
		clear();
	}else{

//顯示BMI
		document.querySelector("#bmi").value = resultBmi;

//肥胖程度
		var fatStatus = size(resultBmi);

//取得時間 toISOString() => YYYY-MM-DDTHH:mm:ss.sssZ (從0取10位)
		var today = new Date().toISOString().slice(0,10);

//把資料塞進 陣列 & localStorage
		var localRecord = {"status":fatStatus.st,"weight":wg,"height":ht,"bmi":resultBmi,"time":today,"bar":fatStatus.bar};
		data.push(localRecord);
		localStorage.setItem('ListData', JSON.stringify(data));
		update(data);
		clear();
	}
}


//更新
function update(items){

	var str="";
	var len = items.length;
	for(var i=0;i<len;i++){	
		var status = data[i].status;
		var ht = data[i].height;
		var wg = data[i].weight;
		var resultBmi = data[i].bmi;
		var time = data[i].time;
		var bar = data[i].bar;
		str+="<li style='border-left:7px solid " + bar + "'>"+ status +"&nbsp;&nbsp;&nbsp;<span>BMI</span>&nbsp;"+ resultBmi +"&nbsp;&nbsp;&nbsp;<span>height</span>&nbsp;"+ht+"cm&nbsp;&nbsp;&nbsp;<span>weight</span>&nbsp;"+ wg + "kg&nbsp;&nbsp;&nbsp;<span>"+ time +"</span>&nbsp;&nbsp;&nbsp;<a href='#' data-num="+ i + ">刪除</a></li>"	;
	}
	record.innerHTML= str ;
}
			



//刪除
function cancel(e){
	e.preventDefault();
	if(e.target.nodeName!=="A"){
		return;
	}else{
		var index = e.target.dataset.num;
		data.splice(index,1);
		localStorage.setItem('ListData', JSON.stringify(data));
		update(data);
	}
	
} 


//判斷肥胖程度
function size(bmi){
	console.log(bmi);
	var status='';
	var color='';

	if(bmi<18.5){
		status = "過輕&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		color = "#31BAF9";
	}else if(bmi>=18.5&&bmi<24){
		status = "理想&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		color = "#86D73F";
	}else if(bmi>=24&&bmi<27){
		status = "過重&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		color = "#FFD306";
	}else if(bmi>=27&&bmi<30){
		status = "輕度肥胖";
		color = "#FF982D";
	}else if(bmi>=30&&bmi<35){
		status = "中度肥胖";
		color = "#FF5C02";
	}else{
		status = "重度肥胖";
		color = "#FF1200";
	}
	return({"st":status,"bar":color});
}



//取數字小數點 2 位
function formatFloat(num){
	var n = Math.round((num*100)/100);
	return(n.toFixed(2)) ;
}

//清空輸入值顯示
function clear(){
	document.querySelector(".ht").value = '' ;
	document.querySelector(".wg").value = '' ;	
}

