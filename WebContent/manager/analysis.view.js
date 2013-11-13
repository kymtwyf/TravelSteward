sap.ui.jsview("manager.analysis", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf manager.analysis
	*/ 
	getControllerName : function() {
		return "manager.analysis";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf manager.analysis
	*/ 
	createContent : function(oController) {
		
		
		
		var logoutBtn = new sap.m.Button({
	        icon: "sap-icon://log",
	       // press:
		});
		
		var objectStatue = new sap.m.ObjectStatus({
            text : "In Stock",
            state : "Success"
        });
		
		var objectheader = new sap.m.ObjectHeader("ObjectHeader",{			
			  title:"Title of OH",
		      number : 0,
		      numberUnit : "USD",
			 firstStatus : objectStatue
		 });
		bus.subscribe("ObjectHeader","update",oController.updateObjectHeader,this);/*number,numberunit,objectheader*/
		
		
		var mailButton = new sap.m.Button({
	        icon: "sap-icon://email",
	       // press:
		});
		
		var timeButton = new sap.m.Button({
	        icon: "sap-icon://history",
	       // press:
		});
		
		var settingButton = new sap.m.Button({
	        icon: "sap-icon://settings",
	       press:function(){
	       	bus.publish("splitapp","toDetail","manager.analysisByCountry");
	       }
		});
		
	    var footer = new sap.m.Bar({ 
            contentRight: [mailButton,timeButton,settingButton]
	    });
	
		var page = new sap.m.Page({
			title: "Title",
			headerContent:logoutBtn,
			footer:footer,
			content: [objectheader]
		});

 		return page;
	}

});