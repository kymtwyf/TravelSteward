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

		var objectheader = util.uiFactory.getAnalysisObjectHeader("analysisHeaderByCountry");	
		
		var tableChart = new sap.m.Table("tableChart",{
			columns: [
				        new sap.m.Column({
				          header: new sap.m.Label({text: "Country"})
				        }),
				        new sap.m.Column({
				          header: new sap.m.Label({text: "Cost"})
				        }),
				        new sap.m.Column({
				          header: new sap.m.Label({text: "Sales"})
				        })
				     ]
		});
		
		var content = new sap.m.VBox("main",{
			items:[
				objectheader,
				new sap.ui.core.HTML("mapDiv",{
					content:"<div id='mapDiv' style='display:none'></div>"
				}),
				new sap.m.ScrollContainer("tablescrollcontiner",{
					horizontal: false,
					vertical: true
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
	    	   sap.ui.getCore().byId('tablescrollcontiner').removeAllContent();
	    	   sap.ui.getCore().byId('tablescrollcontiner').setHeight("0px");
		       bus.publish('container','show',{
		       		index:0
		       });
	       }
		});
		
		var btn_tableChart = new sap.m.Button({
	        icon: "sap-icon://table-chart",
	       press:function(){
	    	   var tableScrollContiner = sap.ui.getCore().byId('tablescrollcontiner');
	    	   tableScrollContiner.setHeight("550px");
	    	   tableScrollContiner.removeAllContent();
	    	   tableScrollContiner.addContent(tableChart);
	   		   bus.publish('tableChart','draw', model.data['analysisByCountry']);
	    	   //bus.publish('tableChart','draw');
	       }
		});
		
		var btn_barChart = new sap.m.Button({
	        icon: "sap-icon://bar-chart",
	       	press:function(){
	       		sap.ui.getCore().byId('tablescrollcontiner').removeAllContent();
	       		sap.ui.getCore().byId('tablescrollcontiner').setHeight("0px");
	       		bus.publish('chartDiv','draw');
	        }
		});
		
		var sgBtn_chartType = new sap.m.SegmentedButton("sgBtn",{
			buttons:[btn_personizedChart,btn_tableChart,btn_barChart],
			selectedButton:btn_personizedChart

		});
		
		var btn_message = new sap.m.Button("btn_message",{
			icon: "sap-icon://email",
            //type: "Reject",
            //text: "Reject",
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
              		bus.publish("splitapp","toDetail","manager.analysis");
                             // bus.publish('mapDiv','draw',model.data.getFakeData());
                    	}        
        });
		
		
	    var footer = new sap.m.Bar({ 
            contentLeft: [sgBtn_chartType],
            contentRight:[btn_message,btn_setTime,btn_setting]
	    });
	
		var page = new sap.m.Page("analysisByCountry",{
			title:"Analysis By Country",
			enableScrolling:false,
			footer:footer,
			content: [content]
		});
		return page;
	}

});
