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
//		var btn_menu = new sap.m.Button({
//            icon: "sap-icon://menu2",
//          	press : function() {
//          		var splitapp = sap.ui.getCore().byId('splitApp');
//          		splitapp.showMaster("manager.master");
//                	}        
//    });
//		
//		var headerTitle = new sap.m.Label({
//			text: "Analysis By Month"
//		});
//		
//		var customerHeader = new sap.m.Bar({ 
//            contentLeft: [btn_menu],
//            contentMiddle:[headerTitle]
//	    });
		
		
		var objectheader = new sap.m.ObjectHeader("oheaderByMonth",{
			title:"Cost in different Months",
			 attributes : [
							new sap.m.ObjectAttribute("descriptionbyMonth",{
								text:"description"
							})
			               	],
		     firstStatus : new sap.m.ObjectStatus("statusbyMonth",{
		    	 			text:"OK",
		    	 			state:"Error"
		     }),
		     number:"123,233.00",
		     numberUnit:"RMB"
		});
		
		
		var content = new sap.m.VBox("mainByMonth",{
			items:[
				objectheader,
				new sap.ui.core.HTML("chartDivByMonth",{
					content:"<div id='chartDivByMonth' style='width: 100%; height: 540px;'></div>"
				})
			]
		});
		
		
		var btn_waterfallChart = new sap.m.Button({
	        icon: "sap-icon://bar-chart",
//	       	press:function(){
//	       		
//	        }
		});
		
		var btn_tableChart = new sap.m.Button({
	        icon: "sap-icon://table-chart",
//	       	press:function(){
//	       		
//	        }
		});
		
		var sgBtn_chartType = new sap.m.SegmentedButton("sgBtnByMonth",{
			buttons:[btn_waterfallChart,btn_tableChart],
			selectedButton:btn_waterfallChart

		});
		var btn_setTime = new sap.m.Button({
                icon: "sap-icon://history",
                
        });	
		var btn_setting = new sap.m.Button({
                icon: "sap-icon://settings",      
        });
		
		var footer = new sap.m.Bar({ 
	          contentLeft: [sgBtn_chartType],
	          contentRight:[btn_setTime,btn_setting]
	    });	
		
		var page = new sap.m.Page("analysisByMonth",{
			title:"Analysis By Month",
			enableScrolling:false,
			//customHeader: customerHeader,
			content: [content],
			footer:footer
		});
		return page;
	}

});