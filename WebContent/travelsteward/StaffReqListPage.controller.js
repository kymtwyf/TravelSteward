sap.ui.controller("travelsteward.StaffReqListPage", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf travelsteward.StaffReqListPage
*/
	onInit: function() {
		var newReqButton = sap.ui.getCore().byId("newReqButton");
		newReqButton.attachPress(function() {
			var app = sap.ui.getCore().byId("staffApp");
			app.toDetail("staffNewReqPage");
		});
		
	},
	onBeforeShow:function(evt){
		//in case manager approved or rejected the request So we need to get the requests from the server again
		jQuery.ajax({
			//url:"http://ld9415:8002/ta/TravelAnalysis/ta.xsodata/AllReqs?$format=json",
			//jsonp parameter
			url:"http://ld9415.wdf.sap.corp:8002/ta/TravelAnalysis/xsjs/getStaffReqs.xsjs",
			dataType: "jsonp",
			//end 
			error:function(error){
				console.log("Error");
			},
			success:function(data){
				var id;
				for(var i = 0; i<data.d.results.length ; i++ ){
					id = data.d.results[i].REQID;
					model.data["staffrequest"] = new Object();
					model.data["staffrequest"].content = data.d.results;
				}
				bus.publish("staff","generatelist",model.data["staffrequest"].content);
			}
		});
	}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf travelsteward.StaffReqListPage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf travelsteward.StaffReqListPage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf travelsteward.StaffReqListPage
*/
//	onExit: function() {
//
//	}

});