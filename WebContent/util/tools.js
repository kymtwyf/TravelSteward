jQuery.sap.declare("util.tools");

util.tools = {
	getRequireID:function(str){
		 var arr = str.split(".");
		 var id = arr[arr.length - 1];
		 return id;
	},
	splitString:function(str){
		 var splitstr = str.split(" ")[1];
		 return splitstr;
	},
	formatNumber:function(number){
		if(jQuery.isNumeric(number)){
			var formattedNumber=parseFloat(number); //获取小数型数据
                formattedNumber+="";
            if(formattedNumber.indexOf(".")==-1) 
                formattedNumber+=".0";//如果没有小数点，在后面补个小数点和0
            if(/\.\d$/.test(formattedNumber)) 
                formattedNumber+="0"; //正则判断
            while(/\d{4}(\.|,)/.test(formattedNumber))  
                //符合条件则进行替换
                formattedNumber=formattedNumber.replace(/(\d)(\d{3}(\.|,))/,"$1,$2");
                //每隔3位添加一个   
             return formattedNumber;
		}else return 0;
	}
}

