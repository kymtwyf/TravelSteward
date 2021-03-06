sap.ui.controller("manager.analysisByReason", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf manager.analysisByReason
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf manager.analysisByReason
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf manager.analysisByReason
*/
	onAfterRendering: function() {
		if(!model.data['analysisByReason']){
			jQuery.when(util.queries.getDataForView('analysisByReason'))
			.done(function(data){
					var spendTime = data.spendTime;
					jQuery.sap.require("sap.m.MessageToast");//console.log("jjjj");console.log(data);
					//TODO
					/*sap.m.MessageToast.show("检索用时 "+spendTime/1000+" 秒",{
					 	duration:2000
					 });*/
					sap.m.MessageToast.show("检索用时 "+332/1000+" 秒",{
					 	duration:2000
					 });
				    model.data['analysisByReason'] = data;
				    console.log("><><><><><><><><><><><><><><>");
				    console.log(data);
					bus.publish('chartDivByReason','draw');
			});
		}
		else
		bus.publish('chartDivByReason','draw');
	},
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf manager.analysisByReason
*/
//	onExit: function() {
//
//	}

});