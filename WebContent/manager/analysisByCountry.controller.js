sap.ui.controller("manager.analysisByCountry", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf manager.analysisByCountry
*/
	onInit: function() {
		jQuery.sap.require('model.fakeData');
		console.log(model.fakeData);
		//this.CURRENT_DATA = model.fakeData;
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf manager.analysisByCountry
*/
//	onBeforeRendering: function() {
//
//	},
	onBeforeShow:function(evt){
		var data = evt.data;
		if(data){

		}
	},
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf manager.analysisByCountry
*/
	onAfterRendering: function() {
		jQuery.sap.require("util.uiFactory");
		
		console.log($("#analysisByCountry").width());
		$("#main").css({
			"width":$("#analysisByCountry").width(),
			"height":"650px",
		});
		var picContainer = $("#mapDiv");
		this.autoSetContainerSize('mapDiv');
		picContainer.css({
			"display":"block",
			"position":"relative",
		});
		
		map = util.uiFactory.createDataMap('mapDiv');
		map.legend();
		map.fills = {
			 'USA': '#1f77b4',
	        'RUS': '#1f77b4',
	        'PRK': '#ff7f0e',
	        'PRC': '#2ca02c',
	        'IND': '#1f77b4',
	        'GBR': '#1f77b4',
	        'FRA': '#1f77b4',
	        'PAK': '#7f7f7f',
		};
		map.draw();

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

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf manager.analysisByCountry
*/
//	onExit: function() {
//
//	}

});

