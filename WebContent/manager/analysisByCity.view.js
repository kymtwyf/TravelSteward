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
		// var objectheader = util.uiFactory.getAnalysisObjectHeader();
		var objectStatus = new sap.m.ObjectStatus({
	        text : "超出预算",
	        state : "Warning"
        });
        var attribute = new sap.m.ObjectAttribute({
          text : "40,127次出差"
        });
        var attribute2 = new sap.m.ObjectAttribute({
          text : "1,752,346张发票"
        });
        var objectheader = new sap.m.ObjectHeader({            
              title:"美国差旅总花费",
              number : "240,632,500.48",
              numberUnit : "RMB",
              firstStatus : objectStatus,
              attributes:[attribute,attribute2]
        });
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
                  	bus.publish("splitapp","toDetail",{
                  		pageId:"manager.analysisByCountry"});
                	  //	monthActionSheet.openBy(this);
                                   
                        }        
        });	
		var btn_setting = new sap.m.Button({
                icon: "sap-icon://settings",
              	press : function() {
              			bus.publish("splitapp","toDetail",{pageId:"manager.analysisByPerson"});
                	}        
        });
		
		var btn_message = new sap.m.Button({
			icon: "sap-icon://email",
            //type: "Reject",
            //text: "Reject",
          });
		
	    var footer = new sap.m.Bar({ 
            contentLeft: [sgBtn_chartType],
            contentRight:[btn_message,btn_setTime,btn_setting]
	    });
 		return new sap.m.Page({
			title: "出差费用分析（按城市)",
			content: [
				content,				
			],
			footer:footer
		});
	}

});