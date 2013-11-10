sap.ui.jsview("travelsteward.StaffNewReqPage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf travelsteward.StaffNewReqPage
	*/ 
	getControllerName : function() {
		return "travelsteward.StaffNewReqPage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf travelsteward.StaffNewReqPage
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
 			customHeader: new sap.m.Bar({ 	
 				contentLeft: [new sap.m.Button("newReqBackButton", {
 					icon: "sap-icon://nav-back"})
 							 ],
				contentMiddle: [new sap.m.Label({text: "New Request"})],
				contentRight: [
				               new sap.m.Button({
				            	   icon: "sap-icon://log",
				               }),
				               ],
			}),
			content: [
			          sap.ui.commons.form.SimpleForm({
			        	  minWidth : -1,
			        	  maxContainerCols : 1,
			        	  layout: sap.ui.commons.form.SimpleFormLayout.GridLayout,
			        	 content:[
			        	          new sap.ui.commons.Title({ // this starts a new group
			        	        	  text: "Base Information"
			        	          }),
			        	        new sap.m.Label({
			        	        	text:"From Date"
			        	        }),
//			        	        new sap.m.HBox({
//			        	        	items: [new sap.m.DateTimeInput({
//				        	        	type: sap.m.DateTimeInputType.Date
//				        	        }), ]
//			        	        }),
			        	        new sap.m.DateTimeInput({
			        	        	type: sap.m.DateTimeInputType.Date,
			        	        	value: "2013-11-25"
			        	        }),
			    	           new sap.m.Label({
			    	        	   text:"To Date"
			    	           }),
			    	           new sap.m.DateTimeInput({
			    	        	   type: sap.m.DateTimeInputType.Date,
			    	        	   value: "2013-12-05"
			    	           }),
			    	           new sap.m.Label({
			    	        	   text:"Destination"
			    	           }),
			    	           new sap.m.HBox({
			    	        	   items:[
			    	        	   new sap.m.Select({
				    	        	   items: [
							            	    new sap.ui.core.Item({text: "China"}),
							            	    new sap.ui.core.Item({text: "Germany"}),
							            	    new sap.ui.core.Item({key: "item3", text: "Item 3"}),
							            	    new sap.ui.core.Item({text: "Item 4"}),
							            	    new sap.ui.core.Item({text: "Item 5"})
							            	  ],
//							           selectedKey: "item3"
				    	           }),
				    	           new sap.m.Label({
				    	        	  text:"      " 
				    	           }),
				    	           new sap.m.Select({
				    	        	   items: [
							            	    new sap.ui.core.Item({text:"Shanghai"}),
							            	    new sap.ui.core.Item({text:"Beijing"})
							            	  ],
				    	           }),
			    	        	   ] 
			    	           }),
			    	           new sap.m.Label({
			    	        	   text:"Department"
			    	           }),
			    	           new sap.m.Select({
	        	    	        	  items:[
	        	    	        	         new sap.ui.core.Item({text: "Sale"}),
	        	    	        	         new sap.ui.core.Item({text: "Support"}),
	        	    	        	         ]
	        	    	       }),
			    	           new sap.m.Label({
			    	        	   text:"Reason"
			    	           }),
			    	           new sap.m.Select({
			    	        	   items: [
						            	    new sap.ui.core.Item({text: "Support"}),
						            	    new sap.ui.core.Item({text: "Meeting"}),
						            	  ],
			    	           }),
			    	           new sap.ui.commons.Title({ // this starts a new group
			        	        	  text: "Detail Information"
			        	          }),
			        	       new sap.m.Label({
			        	    	   text: "WayTo"
			        	       }),
			        	       new sap.m.Select({
	        	    	        	  items:[
	        	    	        	         new sap.ui.core.Item({text: "Flight"}),
	        	    	        	         new sap.ui.core.Item({text: "Train"}),
	        	    	        	         ]
	        	    	       }),
	        	    	       new sap.m.Label({
	        	    	        	  text: "WayBack"
	        	    	          }),
	        	    	          new sap.m.Select({
	        	    	        	  items:[
	        	    	        	         new sap.ui.core.Item({text: "Flight"}),
	        	    	        	         new sap.ui.core.Item({text: "Train"}),
	        	    	        	         ]
	        	    	       }),
//			        	       new sap.m.HBox({
//			        	    	   items:[
//			        	    	          new sap.m.Label({
//			        	    	        	  text: "To"
//			        	    	          }), 
//			        	    	          new sap.m.Select({
//			        	    	        	  items:[
//			        	    	        	         new sap.ui.core.Item({text: "Flight"}),
//			        	    	        	         new sap.ui.core.Item({text: "Train"}),
//			        	    	        	         ]
//			        	    	          }),
//			        	    	          new sap.m.Label({
//			        	    	        	  text: "Back"
//			        	    	          }),
//			        	    	          new sap.m.Select({
//			        	    	        	  items:[
//			        	    	        	         new sap.ui.core.Item({text: "Flight"}),
//			        	    	        	         new sap.ui.core.Item({text: "Train"}),
//			        	    	        	         ]
//			        	    	          }),
//			        	    	          ]
//			        	       }),
	        	    	       
			        	       new sap.m.Label({
			    	        	   text:"PlanExpense"
			    	           }),
			    	           new sap.m.Input({
			    	        	   type: sap.m.InputType.Number,
			    	        	   value: "5000"
			    	           }),
			    	           new sap.m.Label({
			    	        	   text:"Note"
			    	           }),
			    	           new sap.m.TextArea({
			    	        	   value: "I need to go there to do a deal support. I will live in 4-star hotel for 4 days.",
			    	        	   rows: 4 
			    	           }),
//			    	           new sap.ui.commons.Title({ // this starts a new group
//			        	        	  text: "Message"
//			        	       }),
//			        	       new sap.m.Label({
//			    	        	   text:"No Message"
//			    	           }),
//			    	           new sap.m.HBox({
//			    	           }),
			        	       ] 
			          }),
			          new sap.m.Button({
			        	  icon: "sap-icon://action",
			        	  type: sap.m.ButtonType.Accept,
			        	  text: "Submit"
			          }).addStyleClass("floatRight")
			],
			footer: new sap.m.Bar({
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