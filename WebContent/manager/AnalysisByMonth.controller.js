sap.ui.controller("manager.AnalysisByMonth", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf manager.AnalysisByMonth
*/
	onInit: function() {
		
		
	},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf manager.AnalysisByMonth
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf manager.AnalysisByMonth
*/
	onAfterRendering: function() {
		if(!model.data['analysisBymonth']){
			jQuery.when(util.queries.getDataForView('analysisBymonth'))
			.done(function(data){
					var spendTime = data.spendTime;
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("检索用时 "+spendTime/1000+" 秒",{
					 	duration:2000
					 });
				    model.data['analysisBymonth'] = data;
					bus.publish('chartDivByMonth','draw');
			});
		}
		else
		bus.publish('chartDivByMonth','draw');
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf manager.AnalysisByMonth
*/
//	onExit: function() {
//
//	}

});