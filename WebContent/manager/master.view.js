sap.ui.jsview("manager.master", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf manager.master
	*/ 
	getControllerName : function() {
		return "manager.master";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf manager.master
	*/ 
	createContent : function(oController) {
		
		jQuery.sap.require("util.tools");
		
		var searchField =  new sap.m.SearchField({
            placeholder: "Search ..."
        });
		var searchBar = new sap.m.Bar({
		    contentMiddle: [searchField]
		});
		
		var requestList = new sap.m.GrowingList({
			threshold : 4,
			scrollToLoad : false
	    });
		
		
		var requestItems = {
			    items : []
			};
		
		var model = new sap.ui.model.json.JSONModel(requestItems);
		
		function generateList(channelId,eventId,requestdata){
			
			for(var i = 0; i<requestdata.length; i++ ){
				
				requestItems.items[i] = [];
				requestItems.items[i].title = "Request No."+requestdata[i].REQID;
				requestItems.items[i].number = requestdata[i].PLEXP;
				requestItems.items[i].numberUnit =  "RMB";
				
				if(requestdata[i].STATUS =="Approved")
					requestItems.items[i].state = "Success";
			    else if (requestdata[i].STATUS =="Pending")
			    	requestItems.items[i].state = "Warning";
			    else requestItems.items[i].state = "Error";
				
				requestItems.items[i].proposal =  requestdata[i].PNAME;
				requestItems.items[i].destination = requestdata[i].DESCOUN+"/"+requestdata[i].DESREG;
				requestItems.items[i].time =  requestdata[i].TDATE +"~"+requestdata[i].BDATE;
				requestItems.items[i].status =  requestdata[i].STATUS;
				
				requestItems.items[i].prio =  requestdata[i].PRIO;
			}
			
			
			requestList.setModel(model);
			
			var objectItemTemplate = new sap.m.ObjectListItem({
				type: sap.m.ListType.Active,
				title:"{title}",
				number:"{number}",
				numberUnit:"{numberUnit}",
				attributes : [
				    new sap.m.ObjectAttribute({
			              text : "{proposal}"
				    }),
				    new sap.m.ObjectAttribute({
			              text : "{destination}"
				    }),
				    new sap.m.ObjectAttribute({
				          text : "{time}"
					})
				],
				firstStatus : 
					new sap.m.ObjectStatus({
						text : "{status}",
						state:"{state}"
					}),
				press: function(oControlEvent){
					console.log("aaa");
					var id = util.tools.getRequireID(oControlEvent.getSource().mProperties.title);
					bus.publish("splitapp","tomaster2",id);
				}
			});
			
		   var objectItemSorter = new sap.ui.model.Sorter("prio",false,function (oContext) {
			   var prio = oContext.getProperty("prio");
			   var str;
			   if(prio == 1)
				   str = "Pending";
			   else if( prio ==2 )
				   str = "Rejected";
			   else str = "Approved";
			   return {
			     key: str, // group by first letter of last name
			     text: str
			   };
			 });
		   
			requestList.bindAggregation("items", 
					{
						  path: "/items",
						  template: objectItemTemplate,
						  sorter: objectItemSorter
					}
			);
			
			
			/*	
				var proposal = new sap.m.ObjectAttribute({
			          text : requestdata[i].PNAME
			    });
				
				var destnation = new sap.m.ObjectAttribute({
			          text : requestdata[i].DESCOUN+"/"+requestdata[i].DESREG
			    });
				
				var time = new sap.m.ObjectAttribute({
			          text :  requestdata[i].TDATE +"~"+requestdata[i].BDATE 
			    });
				
			    var status = new sap.m.ObjectStatus({
				        text : requestdata[i].STATUS
				});
			    
			    if(requestdata[i].STATUS =="Approved")
			    	status.setState("Success");
			    else if (requestdata[i].STATUS =="Pending")
			    	status.setState("Warning");
			    else status.setState("Error");
			        
				var item = new sap.m.ObjectListItem({
					attributes : [proposal,destnation,time],
					firstStatus : status,
					press: function(oControlEvent){
						var id = util.tools.getRequireID(oControlEvent.getSource().mProperties.title);
						bus.publish("splitapp","tomaster2",id);
					}
				});
				item.setTitle("Request No."+requestdata[i].REQID);
				item.setNumber(requestdata[i].PLEXP);
				item.setNumberUnit("RMB");
				item.setType(sap.m.ListType.Active);
				requestList.addItem(item); 
				
			}
			*/
		}
		bus.subscribe("master","generatelist",generateList,this);
		
		var masterFooter = new sap.m.Bar();
		
 		var listMasterPage = new sap.m.Page("list_master_page", {
 			title:"Travel requests",
 			subHeader:searchBar,
 			content:[requestList],
 			footer:masterFooter
 		});
 		return listMasterPage;
	}
	

});