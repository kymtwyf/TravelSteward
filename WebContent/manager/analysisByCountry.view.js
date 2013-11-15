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

		var objectheader = util.uiFactory.getAnalysisObjectHeader();		

		var content = new sap.m.VBox("main",{
			items:[
				objectheader,
				new sap.ui.core.HTML("mapDiv",{
					content:"<div id='mapDiv' style='display:none'></div>"
				}),
				new sap.m.VBox("table",{

				}),
				new sap.ui.core.HTML("chartDiv",{
					content:"<div id='chartDiv' style='display:none'></div>"
				})
			]
		});
		//for test
		bus.publish("analysisHeader","update",{
			title:"Total Cost",
			description:"in Year 2013",
			total:"123457",
			currency:'EUR',
			budget:"1234.0"
		});
		
		var btn_personizedChart = new sap.m.Button({
	        icon: "sap-icon://globe",
	       press:function(){
	       	//再次点这个地图的时候肯定已经画好了地图。
		       bus.publish('container','show',{
		       		index:0
		       });
	       }
		});
		
		var btn_tableChart = new sap.m.Button({
	        icon: "sap-icon://table-chart",
	       press:function(){

	       }
		});
		
		var btn_barChart = new sap.m.Button({
	        icon: "sap-icon://bar-chart",
	       	press:function(){
	       		bus.publish('chartDiv','draw');
	        }
		});
		
		var sgBtn_chartType = new sap.m.SegmentedButton("sgBtn",{
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
                             bus.publish("analysisHeader","update",{
								title:"Total Cost",
								description:"in Year 2013",
								total:"12345232457",
								currency:'EUR',
								budget:"1234.0"
							});
                    	}        
        });
	    var footer = new sap.m.Bar({ 
            contentLeft: [sgBtn_chartType],
            contentRight:[btn_setTime,btn_setting]
	    });
	
		var page = new sap.m.Page("analysisByCountry",{
			title: "Title2",
			footer:footer,
			content: [content]
		});

		return page;
	}

});
