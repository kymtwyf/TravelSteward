sap.ui.jsview("travelsteward.StaffReqListPage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf travelsteward.StaffReqListPage
	*/ 
	getControllerName : function() {
		return "travelsteward.StaffReqListPage";
	},
	onBeforeShow:function(evt){
        this.getController().onBeforeShow(evt);
	},
	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf travelsteward.StaffReqListPage
	*/ 
	createContent : function(oController) {
		var requestList = new sap.m.GrowingList("requestList",{
			threshold : 4,
			scrollToLoad : false
		});
		
		function generateList(channelId,eventId,requestdata){
			
			var requestItems = {
				    items : []
				};
			var requestModel= new sap.ui.model.json.JSONModel(requestItems);
			
				var i = 0;
				for(var j = requestdata.length-1; j>=0; j-- ){
					requestItems.items[i] = [];
					requestItems.items[i].title = "No."+requestdata[j].REQID;
					requestItems.items[i].number = requestdata[j].PLEXP;
					requestItems.items[i].numberUnit =  "RMB";
					
					if(requestdata[j].STATUS =="Approved")
						requestItems.items[i].state = "Success";
				    else if (requestdata[j].STATUS =="Pending")
				    	requestItems.items[i].state = "Warning";
				    else requestItems.items[i].state = "Error";
					
					requestItems.items[i].status =  requestdata[j].STATUS;
					requestItems.items[i].createdtime =  "Created on "+requestdata[j].TDATE;
					requestItems.items[i].prio =  requestdata[j].PRIO;

			     	i++;
			}
			requestList.setModel(requestModel);

			console.log(requestList);
			
			var objectItemTemplate = new sap.m.ObjectListItem({
				type: sap.m.ListType.Active,
				title:"{title}",
				number:"{number}",
				numberUnit:"{numberUnit}",
				attributes : [
						new sap.m.ObjectAttribute({
							 text : "{createdtime}"
						})
				],
				firstStatus : 
					new sap.m.ObjectStatus({
						text : "{status}",
						state:"{state}"
					})
			});
			
//		   var objectItemSorter = new sap.ui.model.Sorter("prio",false,function (oContext) {
//			   var prio = oContext.getProperty("prio");
//			   var str;
//			   if(prio == 1)
//				   str = "Pending";
//			   else if( prio ==2 )
//				   str = "Rejected";
//			   else str = "Approved";
//			   return {
//			     key: str, // group by first letter of last name
//			     text: str
//			   };
//			 });
		   
			requestList.bindAggregation("items", 
					{
						  path: "/items",
						  template: objectItemTemplate,
						//  sorter: objectItemSorter
					}
			);
		}
		bus.subscribe("staff","generatelist",generateList,this);
		
		
		
		
 		return new sap.m.Page({
 			customHeader: new sap.m.Bar({ 	
 				contentLeft: [new sap.m.Button({
 					icon: "sap-icon://home"})
 							 ],
				contentMiddle: [new sap.m.Label({text: "Travel Request List"})],
				contentRight: [
				               new sap.m.Button({
				            	   icon: "sap-icon://log",
				               }),
				               ],
			}),
			content: [requestList],
			footer: new sap.m.Bar({
				contentLeft: [
				              new sap.m.Button("newReqButton", {
				            	  icon: "sap-icon://add"})
 							 ],
 				contentRight: [
 				               new sap.m.Button({
 				            	   icon: "sap-icon://email"
 				               }),
 				              new sap.m.Button({
				            	   icon: "sap-icon://action-settings"
				               }),
 				               ]
			})
		});
	}

});