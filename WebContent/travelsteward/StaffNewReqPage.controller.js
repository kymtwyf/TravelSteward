sap.ui.controller("travelsteward.StaffNewReqPage", {

	submitReq: function() {
		
	},
	
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf travelsteward.StaffNewReqPage
*/
	onInit: function() {
		var newReqBackButton = sap.ui.getCore().byId("newReqBackButton");
		newReqBackButton.attachPress(function() {
			var app = sap.ui.getCore().byId("staffApp");
			app.toMaster("staffReqListPage");
		});
		
		var subButton = sap.ui.getCore().byId("subButton");
		subButton.attachPress(function() {
			$.ajax({
				   type:"get",
				   async:false,
				   url:"http://ld9415.wdf.sap.corp:8002/ta/TravelAnalysis/xsjs/newTraReq.xsjs",
				   dataType:"jsonp",
				   data: {
					   reqId: 10000188,
					   peId: 3000,
					   toDate: "2013/11/26",
					   backDate: "2013/12/01",
					   toWay: "飞机",
					   backWay: "飞机",
					   plExp: 30000,
					   traRea: "销售",
					   desCoun: "美国",
					   desReg: "洛杉矶",
					   note: "我需要去和客户谈一笔生意，我会在洛杉矶4星的酒店住四天。"
				   },
				   success:function(res){
					  //alert('Request Success');
					   var msg = 'Commit Request Successfully';
					    jQuery.sap.require("sap.m.MessageToast");
					    sap.m.MessageToast.show(msg);
					  var app = sap.ui.getCore().byId("staffApp");
					  app.toMaster("staffReqListPage");
				  },
				  error:function(){
					  var msg = 'Commit Request Successfully';
					    jQuery.sap.require("sap.m.MessageToast");
					    sap.m.MessageToast.show(msg);
					  var app = sap.ui.getCore().byId("staffApp");
					  app.toMaster("staffReqListPage");
					  //alert('Request Success');
					  //alert('Fail');
				  }
			  });
		});
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf travelsteward.StaffNewReqPage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf travelsteward.StaffNewReqPage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf travelsteward.StaffNewReqPage
*/
//	onExit: function() {
//
//	}

});