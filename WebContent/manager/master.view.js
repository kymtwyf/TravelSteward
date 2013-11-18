sap.ui.jsview("manager.master", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf manager.master
	*/ 
	getControllerName : function() {
		return "manager.master";
	},
	onBeforeShow:function(evt){
        this.getController().onBeforeShow(evt);
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf manager.master
	*/ 
	createContent : function(oController) {
		
		jQuery.sap.require("util.tools");
		
		var searchField =  new sap.m.SearchField({
            placeholder: "搜索 ..."
        });
		var searchBar = new sap.m.Bar({
		    contentMiddle: [searchField]
		});
		
		var requestList = new sap.m.GrowingList({
			threshold : 4,
			scrollToLoad : false
	    });
		
		function generateList(channelId,eventId,requestdata){
			
			var requestItems = {
				    items : []
				};
			var requestModel= new sap.ui.model.json.JSONModel(requestItems);
			if(requestdata.filter == "all"){
				//filter is all & init this view -> will show all the items in the list
				var i = 0;
				for(var j = requestdata.content.length-1; j>=0; j-- ){
						
						requestItems.items[i] = [];
						requestItems.items[i].title = " No."+requestdata.content[j].REQID;
						requestItems.items[i].number = requestdata.content[j].PLEXP;
						requestItems.items[i].numberUnit =  "RMB";
						
						if(requestdata.content[j].STATUS =="Approved")
							requestItems.items[i].state = "Success";
					    else if (requestdata.content[j].STATUS =="Pending")
					    	requestItems.items[i].state = "Warning";
					    else requestItems.items[i].state = "Error";
						
						requestItems.items[i].proposal =  requestdata.content[j].PNAME;
						requestItems.items[i].destination = requestdata.content[j].DESCOUN+"/"+requestdata.content[j].DESREG;
						requestItems.items[i].time =  requestdata.content[j].TDATE +"~"+requestdata.content[j].BDATE;
						requestItems.items[i].status =  requestdata.content[j].STATUS;
						
						requestItems.items[i].prio =  requestdata.content[j].PRIO;
						i++;
					}
			}	
			else if(requestdata.filter == "pending"){
				//filter is pending -> will show all the pending items in the list	
				var i = 0;
				for(var j = requestdata.content.length-1; j>=0; j-- ){
					
					if(requestdata.content[j].STATUS =="Pending"){
						
						requestItems.items[i] = [];
						requestItems.items[i].title = " No."+requestdata.content[j].REQID;
						requestItems.items[i].number = requestdata.content[j].PLEXP;
						requestItems.items[i].numberUnit =  "RMB";
						
						if(requestdata.content[j].STATUS =="Approved")
							requestItems.items[i].state = "Success";
					    else if (requestdata.content[j].STATUS =="Pending")
					    	requestItems.items[i].state = "Warning";
					    else requestItems.items[i].state = "Error";
						
						requestItems.items[i].proposal =  requestdata.content[j].PNAME;
						requestItems.items[i].destination = requestdata.content[j].DESCOUN+"/"+requestdata.content[j].DESREG;
						requestItems.items[i].time =  requestdata.content[j].TDATE +"~"+requestdata.content[j].BDATE;
						requestItems.items[i].status =  requestdata.content[j].STATUS;
						
						requestItems.items[i].prio =  requestdata.content[j].PRIO;
						i++;
						}
					
					}
			 }
			 else if(requestdata.filter == "approved"){
				//filter is approved -> will show all the approved items in the list
					var i = 0;
					for(var j = requestdata.content.length-1; j>=0; j--  ){
						
						if(requestdata.content[j].STATUS =="Approved"){
							
							requestItems.items[i] = [];
							requestItems.items[i].title = " No."+requestdata.content[j].REQID;
							requestItems.items[i].number = requestdata.content[j].PLEXP;
							requestItems.items[i].numberUnit =  "RMB";
							
							if(requestdata.content[j].STATUS =="Approved")
								requestItems.items[i].state = "Success";
						    else if (requestdata.content[j].STATUS =="Pending")
						    	requestItems.items[i].state = "Warning";
						    else requestItems.items[i].state = "Error";
							
							requestItems.items[i].proposal =  requestdata.content[j].PNAME;
							requestItems.items[i].destination = requestdata.content[j].DESCOUN+"/"+requestdata.content[j].DESREG;
							requestItems.items[i].time =  requestdata.content[j].TDATE +"~"+requestdata.content[j].BDATE;
							requestItems.items[i].status =  requestdata.content[j].STATUS;
							
							requestItems.items[i].prio =  requestdata.content[j].PRIO;
							i++;
							}
						
						}
			 }
			 else if(requestdata.filter == "rejected"){
				//filter is rejected -> will show all the rejected items in the list
					var i = 0;
					for(var j = requestdata.content.length-1; j>=0; j-- ){
						
						if(requestdata.content[j].STATUS =="Rejected"){
							
							requestItems.items[i] = [];
							requestItems.items[i].title = " No."+requestdata.content[j].REQID;
							requestItems.items[i].number = requestdata.content[j].PLEXP;
							requestItems.items[i].numberUnit =  "RMB";
							
							if(requestdata.content[j].STATUS =="Approved")
								requestItems.items[i].state = "Success";
						    else if (requestdata.content[j].STATUS =="Pending")
						    	requestItems.items[i].state = "Warning";
						    else requestItems.items[i].state = "Error";
							
							requestItems.items[i].proposal =  requestdata.content[j].PNAME;
							requestItems.items[i].destination = requestdata.content[j].DESCOUN+"/"+requestdata.content[j].DESREG;
							requestItems.items[i].time =  requestdata.content[j].TDATE +"~"+requestdata.content[j].BDATE;
							requestItems.items[i].status =  requestdata.content[j].STATUS;
							
							requestItems.items[i].prio =  requestdata.content[j].PRIO;
							i++;
							}
						
						}
				}//finish generate questitems in different situtatons
			
			
			requestList.setModel(requestModel);
			
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
					var id = util.tools.getRequireID(oControlEvent.getSource().mProperties.title);
					bus.publish("splitapp","tomaster2",id);
				}
			});
			
		   var objectItemSorter = new sap.ui.model.Sorter("prio",false,function (oContext) {
			   var prio = oContext.getProperty("prio");
			   var str;
			   if(prio == 1)
				   str = "待处理";
			   else if( prio ==2 )
				   str = "拒绝";
			   else str = "批准";
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
		}
		bus.subscribe("master","generatelist",generateList,this);
		
		var pendingButton =  new sap.m.Button("pendingbutton",{
		  	  text: "待处理"
		});
		
		var approvedButton =  new sap.m.Button("approvedbutton",{
	  	      text: "批准"
	    });
		
		var rejectedButton =  new sap.m.Button("rejectedbutton",{
	  	      text: "拒绝"
	    });
		
		var allButton =  new sap.m.Button("allbutton",{
	  	      text: "所有"
	    });
		
		var filterActionSheet = new sap.m.ActionSheet({
			  placement: sap.m.PlacementType.Top,
			  buttons: [pendingButton,approvedButton,rejectedButton,allButton]
		});
		
		var filterButton = new sap.m.Button("filter", {
	      	  icon: "sap-icon://filter",
	    	  press : function () {
	    		  filterActionSheet.openBy(this);
	    		  }
      });	
		
		var masterFooter = new sap.m.Bar({
			contentLeft:[filterButton]
		});
		
 		var listMasterPage = new sap.m.Page("list_master_page", {
 			title:"出差请求",
 			subHeader:searchBar,
 			content:[requestList],
 			footer:masterFooter
 		});
 		return listMasterPage;
	}
	

});