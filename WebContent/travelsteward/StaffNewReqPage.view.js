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
			        	        	text:"From"
			        	        }),
//			        	        new sap.m.HBox({
//			        	        	items: [new sap.m.DateTimeInput({
//				        	        	type: sap.m.DateTimeInputType.Date
//				        	        }), ]
//			        	        }),
			        	        new sap.m.DateTimeInput("toDate", {
			        	        	type: sap.m.DateTimeInputType.Date,
			        	        	displayFormat: 'y/M/d',
			        	        	value: "2013-11-26"
			        	        }),
			        	        new sap.m.HBox({
				    	           }),
			    	           new sap.m.Label({
			    	        	   text:"End"
			    	           }),
			    	           new sap.m.DateTimeInput("backDate", {
			    	        	   type: sap.m.DateTimeInputType.Date,
			    	        	   displayFormat: 'y/M/d',
			    	        	   value: "2013-12-01"
			    	           }),
			    	           new sap.m.HBox({
			    	           }),
			    	           new sap.m.Label({
			    	        	   text:"Dest"
			    	           }),
			    	           new sap.m.HBox({
			    	        	   items:[
			    	        	   new sap.m.Select("desCoun", {
				    	        	   items: [
							            	    new sap.ui.core.Item({text: "China"}),
							            	    new sap.ui.core.Item({text: "Germany"}),
							            	    new sap.ui.core.Item({key: "item3", text: "Item 3"}),
							            	    new sap.ui.core.Item({text: "Item 4"}),
							            	    new sap.ui.core.Item({text: "Item 5"})
							            	  ],
//							           selectedKey: "item3"
				    	           }),
				    	           new sap.m.HBox({
				    	           }),
				    	           new sap.m.Select("desReg", {
				    	        	   items: [
							            	    new sap.ui.core.Item({text:"Shanghai"}),
							            	    new sap.ui.core.Item({text:"Beijing"})
							            	  ],
				    	           }),
			    	        	   ] 
			    	           }),
//			    	           new sap.m.Label({
//			    	        	   text:"Depa"
//			    	           }),
//			    	           new sap.m.Select({
//	        	    	        	  items:[
//	        	    	        	         new sap.ui.core.Item({text: "Sale"}),
//	        	    	        	         new sap.ui.core.Item({text: "Support"}),
//	        	    	        	         ]
//	        	    	       }),
			    	           new sap.m.Label({
			    	        	   text:"Rea"
			    	           }),
			    	           new sap.m.Select("traRea", {
			    	        	   items: [
						            	    new sap.ui.core.Item({text: "Support"}),
						            	    new sap.ui.core.Item({text: "Meeting"}),
						            	  ],
			    	           }),
			    	           new sap.ui.commons.Title({ // this starts a new group
			        	        	  text: "Detail Information"
			        	          }),
			        	       new sap.m.Label({
			        	    	   text: "To"
			        	       }),
			        	       new sap.m.Select("toWay", {
	        	    	        	  items:[
	        	    	        	         new sap.ui.core.Item({text: "Flight"}),
	        	    	        	         new sap.ui.core.Item({text: "Train"}),
	        	    	        	         ]
	        	    	       }),
	        	    	       new sap.m.HBox({
			    	           }),
	        	    	       new sap.m.Label({
	        	    	        	  text: "Back"
	        	    	          }),
	        	    	          new sap.m.Select("backWay", {
	        	    	        	  items:[
	        	    	        	         new sap.ui.core.Item({text: "Train"}),
	        	    	        	         new sap.ui.core.Item({text: "Flight"}),
	        	    	        	         ]
	        	    	       }),
	        	    	       new sap.m.HBox({
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
			    	        	   text:"Pl Exp"
			    	           }),
			    	           new sap.m.Input({
			    	        	   type: sap.m.InputType.Number,
			    	        	   value: "8000"
			    	           }),
			    	           new sap.m.HBox({
			    	           }),
			    	           new sap.m.Label({
			    	        	   text:"Note"
			    	           }),
			    	           new sap.m.TextArea({
			    	        	   value: "I need to go there to do a deal support. I will live in 4-star hotel for 4 days.",
			    	        	   rows: 4 
			    	           }),
			    	           new sap.ui.commons.Title({ // this starts a new group
			        	        	  text: ""
			        	       }),
//			        	       new sap.m.Label({
//			    	        	   text:"No Message"
//			    	           }),
//			        	       new sap.m.HBox({
//			    	           }),
			    	           new sap.m.HBox({
			    	           }),
			        	       new sap.m.Button("subButton", {
			        	    	  
						        	  icon: "sap-icon://accept",
						        	  type: sap.m.ButtonType.Accept,
						        	  text: "Submit"
						          }).addStyleClass("floatRight"),
			    	           ]
			          }).addStyleClass("padding10"),
			          
			],
			footer: new sap.m.Bar({
				translucent: true,
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