sap.ui.controller("travelsteward.homePage", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf travelsteward.homePage
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf travelsteward.homePage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf travelsteward.homePage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf travelsteward.homePage
*/
//	onExit: function() {
//
//	},
	
	updateObjectHeader: function(number,numberunit,objectheader){
		number=parseFloat(number); //获取小数型数据
		number+="";
		if(number.indexOf(".")==-1) 
			number+=".0";//如果没有小数点，在后面补个小数点和0
		if(/\.\d$/.test(number)) 
			number+="0"; //正则判断
		while(/\d{4}(\.|,)/.test(number))  
			//符合条件则进行替换
			number=number.replace(/(\d)(\d{3}(\.|,))/,"$1,$2");
			//每隔3位添加一个	 
		objectheader.setNumber(number);
		objectheader.setNumberUnit(numberunit);
	}

});