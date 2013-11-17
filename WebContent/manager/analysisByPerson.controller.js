sap.ui.controller("manager.analysisByPerson", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf manager.analysisByPerson
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf manager.analysisByPerson
*/
	onBeforeRendering: function() {
		var screenWidth = 1024;
		var screenHeight = $(window).height();
		$('#ByPerson-mapDiv').css({
			"width":0.9*screenWidth,
			"height":0.7*screenHeight,
			"left":0.05*screenWidth,
			"display":"block",

		});
		$('#ByPerson-table').css({
			"width":0.9*screenWidth,
			"height":0.7*screenHeight,
			"left":0.05*screenWidth,
			"display":"none",
			
		});
		$('#ByPerson-chartDiv').css({
			"width":0.9*screenWidth,
			"height":0.7*screenHeight,
			"left":0.05*screenWidth,
			"display":"none",
			
		});
		bus.subscribe('analysisByPerson','show',function(channelId,eventId,index){

				var ids = ['ByPerson-mapDiv','ByPerson-table','ByPerson-chartDiv'];
        		for(var i = 0 ; i < ids.length; i++){
		            console.log('showing container and hidding container');
		            if(i==index){
		                $('#'+ids[i]).css({"display":"block"});
		            }else{
		                $('#'+ids[i]).css({"display":"none"});
	            }            
        	}
		},this);	

		// util.tools.autoSetContainerSize('ByPerson-mapDiv');
	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf manager.analysisByPerson
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf manager.analysisByPerson
*/
//	onExit: function() {
//
//	}

});