sap.ui.jsview("travelsteward.homePage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf travelsteward.homePage
	*/ 
	getControllerName : function() {
		return "travelsteward.homePage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf travelsteward.homePage
	*/ 
	createContent : function(oController) {
		
		/*这个view暂时不要写代码 ！！！！！！！！！！*/
		
		this.shell= new sap.m.Shell("Shell");
		// var app = new sap.m.App("ManagerApp");
		
		this.app = new sap.m.SplitApp("ManagerApp",{
			mode:sap.m.SplitAppMode.HideMode
		})
		
		var analysisPage = new sap.m.Page("AnalysisPage",{
			title:"Travel Steward",
            showNavButton: false
		});
		
		var logoutBtn = new sap.m.Button({
	        icon: "sap-icon://log",
	       // press:
		});
		
		analysisPage.addHeaderContent(logoutBtn);
		
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
		analysisPage.addContent(objectheader);
		
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
	       // press:
		});
		
	    var footer = new sap.m.Bar({ 
            contentRight: [mailButton,timeButton,settingButton]
	    });
		// this.app.setMode(sap.m.SplitAppMode.HideMode);
	    analysisPage.setFooter(footer);
		this.app.addDetailPage(sap.ui.jsview("ui.whoiswhere", "ui.whoiswhere"));
		this.app.addMasterPage(sap.ui.jsview("manager.ManagerMasterPage", "manager.ManagerMasterPage"));
	    	// this.app.hideMaster();

	    

		// app.addPage(analysisPage);
        // shell.setAppWidthLimited(true);
        this.shell.setApp(this.app);
        return this.shell;
	}

});