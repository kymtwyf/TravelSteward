sap.ui.jsview("manager.analysisByCity", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf manager.analysisByCity
	*/ 
	getControllerName : function() {
		return "manager.analysisByCity";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf manager.analysisByCity
	*/ 
	createContent : function(oController) {
		var objectheader = util.uiFactory.getAnalysisObjectHeader();
		var content = new sap.m.VBox({
			items:[
				objectheader,
				new sap.ui.core.HTML("analysisByCity-mapDiv",{
					content:"<div id='analysisByCity-mapDiv' style='display:none'></div>"
				}),
				new sap.m.VBox("analysisByCity-tablevbox"),
				
				new sap.ui.core.HTML("analysisByCity-chartDiv",{
					content:"<div id='analysisByCity-chartDiv' style='display:none'></div>"
				})
			]
		});
		var btn_personizedChart = new sap.m.Button({
	        icon: "sap-icon://globe",
	       press:function(){
	       	//再次点这个地图的时候肯定已经画好了地图。
		       // bus.publish('container','show',{
		       // 		index:0
		       // });
	       }
		});
		
		var btn_tableChart = new sap.m.Button({
	        icon: "sap-icon://table-chart",
	       press:function(){
	    	   // var vbox = sap.ui.getCore().byId('tablevbox');
	    	   // vbox.removeAllItems();
	    	   // vbox.addItem(tableChart);
	   		   // // bus.publish('tableChart','draw', model.data['analysisByCountry']);
	    	   // bus.publish('tableChart','draw');
	       }
		});
		
		var btn_barChart = new sap.m.Button({
	        icon: "sap-icon://pie-chart",
	       	press:function(){
	       		// bus.publish('chartDiv','draw');
	        }
		});
		
		var sgBtn_chartType = new sap.m.SegmentedButton({
			buttons:[btn_personizedChart,btn_tableChart,btn_barChart],
			selectedButton:btn_personizedChart

		});
		var btn_setTime = new sap.m.Button({
                icon: "sap-icon://history",
                  press : function() {
                  	bus.publish("splitapp","toDetail","manager.analysisByCountry");
                	  //	monthActionSheet.openBy(this);
                                   
                        }        
        });	
		var btn_setting = new sap.m.Button({
                icon: "sap-icon://settings",
              	press : function() {
              		bus.publish("splitapp","toDetail","manager.analysisByPerson");
                             // bus.publish('mapDiv','draw',model.data.getFakeData());
       //                       bus.publish("analysisHeader","update",{
							// 	title:"Total Cost",
							// 	description:"in Year 2013",
							// 	total:"12345232457",
							// 	currency:'EUR',
							// 	budget:"1234.0"
							// });
                	}        
        });
	    var footer = new sap.m.Bar({ 
            contentLeft: [sgBtn_chartType],
            contentRight:[btn_setTime,btn_setting]
	    });
 		return new sap.m.Page({
			title: "Title !!!",
			content: [
				content,				
			],
			footer:footer
		});
	}

});