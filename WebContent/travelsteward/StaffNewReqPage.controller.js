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
				   jsonp:"callback",
				   data: {
					   reqId: 10000018,
					   peId: 765,
					   toDate: "2013/11/26",
					   backDate: "2013/12/01",
					   toWay: "Flight",
					   backWay: "Train",
					   plExp: 8000,
					   traRea: "Meeting",
					   desCoun: "China",
					   desReg: "Shanghai",
					   note: "I need to go there to do a deal support. I will live in 4-star hotel for 4 days."
				   },
				   success:function(res){
					  alert('Request Success');
				  },
				  error:function(){
					  alert('Request Success');
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