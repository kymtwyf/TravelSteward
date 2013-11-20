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
		jQuery.sap.require('util.uiFactory');
		//这个用来写analysis by department 每个部门预算和实际之间的关系
		// var objectheader = util.uiFactory.getAnalysisObjectHeader("analysisByDepartment");
		var objectStatus = new sap.m.ObjectStatus({
	        text : "低于预算",
	        state : "Success"
        });
		
		var popoverlist = new sap.m.List("list");
		
        var aliReason=new sap.m.ActionListItem('aliReason',{                                                                                        //action list item
            tap:function(oControlEvent){
            	 var splitapp = sap.ui.getCore().byId('splitApp');
		           	splitapp.toDetail("manager.analysisByReason","flip");
            }
        });
		aliReason.setText("按出差理由");
		
        var aliMonth=new sap.m.ActionListItem('aliMonth',{                                                                                        //action list item
            tap:function(oControlEvent){

            }
                  

	    });
	    aliMonth.setText("按月份");

	    popoverlist.addItem(aliReason);
	    popoverlist.addItem(aliMonth);
	    
		var popover = new sap.m.Popover("popover",{                                                                                                        //popover
            title: "查看详细",
            placement: sap.m.PlacementType.Right,
            content: popoverlist
        });        
		popover.setOffsetX(-600); 
		popover.setOffsetY(300);
		document.ondblclick = mouseDBClick;
	    
		
		
        var attribute = new sap.m.ObjectAttribute({
          text : "2013年至今"
        });

        var objectheader = new sap.m.ObjectHeader({            
              title:"差旅总支出",
              number : "670,278,320.76",
              numberUnit : "RMB",
              firstStatus : objectStatus,
              attributes:attribute
        });
        
        function mouseDBClick(ev){                                //double click will pop over
        	popover.openBy(objectheader);
        
              // console.log($('#popover').width());
			//	$('#popover').width("198px");
              //       var height = $("#popover").height();    
                   //("#popover").css({"top":mousePositionY-height/2,"left":mousePositionX+15});    
                     // $("#popover").width('194px');
                 //}

               //  return true;;
        }
		var content = new sap.m.VBox({
			items:[
				objectheader,
				new sap.ui.core.HTML("analysisByDepartment_chart",{
					content:"<div id='analysisByDepartment_chart' style='width: 100%; height: 480px;'></div>"
				})
				// new sap.m.HBox("analysisByDepartment-mapDiv",{
				// 	items:[
				// 	new sap.ui.core.HTML({
				// 		content:"<div id='analysisByDepartment_1' style='display:block;float:left;width:12.5%;height: 550px;'></div>"
				// 	}),
				// 	new sap.ui.core.HTML({
				// 		content:"<div id='analysisByDepartment_2' style='display:block;float:left;width:12.5%;height: 550px;'></div>"
				// 	}),
				// 	new sap.ui.core.HTML({
				// 		content:"<div id='analysisByDepartment_3' style='display:block;float:left;width:12.5%;height: 550px;'></div>"
				// 	}),
				// 	new sap.ui.core.HTML({
				// 		content:"<div id='analysisByDepartment_4' style='display:block;float:left;width:12.5%;height: 550px;'></div>"
				// 	}),
				// 	new sap.ui.core.HTML({
				// 		content:"<div id='analysisByDepartment_5' style='display:block;float:left;width:12.5%;height: 550px;'></div>"
				// 	}),
				// 	new sap.ui.core.HTML({
				// 		content:"<div id='analysisByDepartment_6' style='display:block;float:left;width:12.5%;height: 550px;'></div>"
				// 	}),
				// 	new sap.ui.core.HTML({
				// 		content:"<div id='analysisByDepartment_7' style='display:block;float:left;width:12.5%;height: 550px;'></div>"
				// 	}),
				// 	new sap.ui.core.HTML({
				// 		content:"<div id='analysisByDepartment_8' style='display:block;float:left;width:12.5%;height: 550px;'></div>"
				// 	})
				// 	]
				// })				
			]
		});
		var btn_personizedChart = new sap.m.Button({
	        icon: "sap-icon://bar-chart",
	       press:function(){
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
		
		
		var sgBtn_chartType = new sap.m.SegmentedButton({
			buttons:[btn_personizedChart,btn_tableChart],
			selectedButton:btn_personizedChart

		});
		var btn_setTime = new sap.m.Button({
                icon: "sap-icon://history",
                  press : function() {
                  	// bus.publish("splitapp","toDetail","manager.analysisByCountry");
                	  //	monthActionSheet.openBy(this);
                                   
                        }        
        });	
		var btn_setting = new sap.m.Button({
                icon: "sap-icon://settings",
              	press : function() {
              			// bus.publish("splitapp","toDetail","manager.analysisByPerson");
                	}        
        });
	    var footer = new sap.m.Bar({ 
            contentLeft: [sgBtn_chartType],
            contentRight:[btn_setTime,btn_setting]
	    });
 		return new sap.m.Page({
			title: "出差费用分析（按部门)",
			content: [
				content,				
			],
			footer:footer
		});
		
	}

});
