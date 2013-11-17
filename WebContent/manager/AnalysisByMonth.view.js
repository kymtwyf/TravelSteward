sap.ui.jsview("manager.AnalysisByMonth", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf manager.AnalysisByMonth
	*/ 
	getControllerName : function() {
		return "manager.AnalysisByMonth";
	},
	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf manager.AnalysisByMonth
	*/ 
	createContent : function(oController) {
		var btn_menu = new sap.m.Button({
            icon: "sap-icon://menu2",
          	press : function() {
          		var splitapp = sap.ui.getCore().byId('splitApp');
          		splitapp.showMaster("manager.master");
                	}        
    });
		
		var headerTitle = new sap.m.Label({
			text: "Analysis By Month"
		});
		
		var customerHeader = new sap.m.Bar({ 
            contentLeft: [btn_menu],
            contentMiddle:[headerTitle]
	    });
		
		var objectheader = util.uiFactory.getAnalysisObjectHeader("analysisHeaderByMonth");	
		/*
		 bus.publish("analysisHeader","update",{
			title:"Total Cost",
			description:"in Year 2013",
			total:"123457",
			currency:'EUR',
			budget:"1234.0"
		 });
		*/
		
		var content = new sap.m.VBox("mainByMonth",{
			items:[
				objectheader,
				new sap.ui.core.HTML("chartDivByMonth",{
					content:"<div id='chartDivByMonth' style='width: 100%; height: 550px;'></div>"
				})
			]
		});
		
		var page = new sap.m.Page("analysisByMonth",{
			title:"Analysis By Month",
			enableScrolling:false,
			customHeader: customerHeader,
			content: [content]
		});
		return page;
	}

});