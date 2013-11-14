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
	},
	formatNumberToBM:function(number){
		if(jQuery.isNumeric(number)){
			var index = number.indexOf(".");
			var formattedNumber=parseFloat(number);
			if(index==-1){
				formattedNumber=this.formatNumber(formattedNumber);
			}else{
				if(index>=7&&index<10) formattedNumber = this.formatNumber((formattedNumber/1000000).toFixed(2))+" M";
				else if(index>=10) formattedNumber = this.formatNumber((formattedNumber/1000000000).toFixed(2))+" B";
			}

			console.log('formattedNumber');
			console.log(formattedNumber);

			return formattedNumber;
		}
	},

	_F_Toast:function(message,timeDuring){//用来显示一条toast消息
			jQuery.sap.require("sap.m.MessageToast");
			 sap.m.MessageToast.show(message,{
			 	duration:timeDuring?timeDuring:3000
			 });
	},
	autoSetContainerSize:function(sId){
		var width = $('#main').width();
		var height = $('#main').height();
		$("#"+sId).width(width*0.8);
		$("#"+sId).height(height*0.7);
		$("#"+sId).css({
			"left":width*0.1,
			//"border":"solid"
		});
	}
}

