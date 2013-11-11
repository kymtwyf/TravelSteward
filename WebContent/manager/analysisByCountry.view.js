sap.ui.jsview("manager.analysisByCountry", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf manager.analysisByCountry
	*/ 
	getControllerName : function() {
		return "manager.analysisByCountry";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf manager.analysisByCountry
	*/ 
	onBeforeShow:function(evt){
		this.getController().onBeforeShow(evt);
	},
	createContent : function(oController) {
		jQuery.sap.require("util.uiFactory");

		var objectStatue = new sap.m.ObjectStatus({
            text : "In Stock",
            state : "Success"
        });
		var objectheader = new sap.m.ObjectHeader("analysisHeader",{			
			  title:"This Year",
		      number : 0,
		      numberUnit : "USD",
			 firstStatus : objectStatue
		 });
		bus.subscribe("analysisHeader","update",oController.updateObjectHeader,this);
		

		var content = new sap.m.VBox("main",{
			items:[
				objectheader,
				new sap.ui.core.HTML("mapDiv",{
				content:"<div id='mapDiv' style='display:none'></div>"
			})]
		});

		var btn_personizedChart = new sap.m.Button({
	        icon: "sap-icon://pie-chart",
	       // press:
		});
		
		var btn_tableChart = new sap.m.Button({
	        icon: "sap-icon://table-chart",
	       // press:
		});
		
		var btn_barChart = new sap.m.Button({
	        icon: "sap-icon://bar-chart",
	       // press:
		});
		
		var sgBtn_chartType = new sap.m.SegmentedButton("sgBtn",{
			buttons:[btn_personizedChart,btn_tableChart,btn_barChart],
			selectedButton:btn_personizedChart

		})
	    var footer = new sap.m.Bar({ 
            contentLeft: [sgBtn_chartType]
	    });
	
		var page = new sap.m.Page("analysisByCountry",{
			title: "Title2",
			footer:footer,
			content: [content]
		});

		return page;
	}

});
