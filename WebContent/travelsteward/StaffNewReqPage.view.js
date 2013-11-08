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
			          new sap.m.VBox({
			        	 items:[
			        	        new sap.m.Label({
			        	        	text:"From Date"
			        	        }),
			        	        new sap.m.DateTimeInput({
			        	        	type: sap.m.DateTimeInputType.Date
			        	        }), 
			    	           new sap.m.Label({
			    	        	   text:"To Date"
			    	           }),
			    	           new sap.m.DateTimeInput({
			    	        	   type: sap.m.DateTimeInputType.Date
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
				    	           new sap.m.Select({
				    	        	   items: [
							            	    new sap.ui.core.Item({text:"Shanghai"}),
							            	    new sap.ui.core.Item({text:"Beijing"})
							            	  ],
				    	           }),
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
//			        	       new sap.m.Label({
//			        	    	   text: "Detail Information"
//			        	       }),
			        	       new sap.m.Label({
			        	    	   text: "Transportation"
			        	       }),
			        	       new sap.m.HBox({
			        	    	   items:[
			        	    	          new sap.m.Label({
			        	    	        	  text: "To"
			        	    	          }), 
			        	    	          new sap.m.Select({
			        	    	        	  items:[
			        	    	        	         new sap.ui.core.Item({text: "Flight"}),
			        	    	        	         new sap.ui.core.Item({text: "Train"}),
			        	    	        	         ]
			        	    	          }),
			        	    	          new sap.m.Label({
			        	    	        	  text: "Back"
			        	    	          }),
			        	    	          new sap.m.Select({
			        	    	        	  items:[
			        	    	        	         new sap.ui.core.Item({text: "Flight"}),
			        	    	        	         new sap.ui.core.Item({text: "Train"}),
			        	    	        	         ]
			        	    	          }),
			        	    	          ]
			        	       }),
			        	       new sap.m.Label({
			    	        	   text:"Plan Expense"
			    	           }),
			    	           new sap.m.Input({
			    	        	   type: sap.m.InputType.Number
			    	           }),
			    	           new sap.m.Label({
			    	        	   text:"Supplement"
			    	           }),
			    	           new sap.m.Input({
			    	        	   type: sap.m.InputType.Text
			    	           }),
			        	       ] 
			          }),
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