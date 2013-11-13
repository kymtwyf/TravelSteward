sap.ui.controller("manager.master", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf manager.master
*/
	onInit: function() {
		jQuery.ajax({
			url:"http://ld9415:8002/ta/TravelAnalysis/ta.xsodata/AllReqs?$format=json",
			error:function(error){
				console.log("Error");
			},
			success:function(data){
				var id;
				for(var i = 0; i<data.d.results.length ; i++ ){
					id = data.d.results[i].REQID;
					model.data["request"] = new Object();
					model.data["request"].content = data.d.results;
				}
				
				bus.publish("master","generatelist",{
					content:model.data["request"].content,
					filter:"all"
				});
			}
		});
		
	},
	
	
	onBeforeShow:function(evt){
			
		console.log("on before show");
		
		var pendingButton = new sap.ui.getCore().byId("pendingbutton");
		pendingButton.attachPress(function() {
			console.log("press pending button");
	    	   bus.publish("master","generatelist",{
		  			content:model.data["request"].content,
		  			filter:"pending"
		  		});
	     });
		
		
		var approvedButton =  new sap.ui.getCore().byId("approvedbutton");
		approvedButton.attachPress(function() {
	    	   bus.publish("master","generatelist",{
		  			content:model.data["request"].content,
		  			filter:"approved"
		  		});
	    });
		
		var rejectedButton =  new sap.ui.getCore().byId("rejectedbutton");
		rejectedButton.attachPress(function() {
	    	   bus.publish("master","generatelist",{
		  			content:model.data["request"].content,
		  			filter:"rejected"
		  		});
	    });
		
		var allButton =  new sap.ui.getCore().byId("allbutton");
		allButton.attachPress(function() {
	    	   bus.publish("master","generatelist",{
		  			content:model.data["request"].content,
		  			filter:"all"
		  		});
	    });
	}
	

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf manager.master
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf manager.master
*/
//	onAfterRendering: function() {

//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf manager.master
*/
//	onExit: function() {
//
//	}

});
