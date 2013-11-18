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
				contentMiddle: [new sap.m.Label({text: "新建请求"})],
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
			        	        	  text: "基本信息"
			        	          }),
			        	        new sap.m.Label({
			        	        	text:"起始"
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
			    	        	   text:"结束"
			    	           }),
			    	           new sap.m.DateTimeInput("backDate", {
			    	        	   type: sap.m.DateTimeInputType.Date,
			    	        	   displayFormat: 'y/MM/dd',
			    	        	   value: "2013-12-01"
			    	           }),
			    	           new sap.m.HBox({
			    	           }),
			    	           new sap.m.Label({
			    	        	   text:"地点"
			    	           }),
			    	           new sap.m.HBox({
			    	        	   items:[
			    	        	   new sap.m.Select("desCoun", {
				    	        	   items: [
							            	    new sap.ui.core.Item({text: "美国"}),
							            	    new sap.ui.core.Item({text: "Germany"}),
							            	    new sap.ui.core.Item({text: "China"})
							            	  ],
//							           selectedKey: "item3"
				    	           }),
				    	           new sap.m.HBox({
				    	           }),
				    	           new sap.m.Select("desReg", {
				    	        	   items: [
							            	    new sap.ui.core.Item({text:"洛杉矶"}),
							            	    new sap.ui.core.Item({text:"Washington D.C"}),
							            	    new sap.ui.core.Item({text:"New York"})
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
			    	        	   text:"理由"
			    	           }),
			    	           new sap.m.Select("traRea", {
			    	        	   items: [
						            	    new sap.ui.core.Item({text: "销售"}),
						            	    new sap.ui.core.Item({text: "Customer Engagement"}),
						            	    new sap.ui.core.Item({text: "Meeting"}),
						            	  ],
			    	           }),
			    	           new sap.ui.commons.Title({ // this starts a new group
			        	        	  text: "详细信息"
			        	          }),
			        	       new sap.m.Label({
			        	    	   text: "去程"
			        	       }),
			        	       new sap.m.Select("toWay", {
	        	    	        	  items:[
	        	    	        	         new sap.ui.core.Item({text: "飞机"}),
	        	    	        	         new sap.ui.core.Item({text: "Train"}),
	        	    	        	         ]
	        	    	       }),
	        	    	       new sap.m.HBox({
			    	           }),
	        	    	       new sap.m.Label({
	        	    	        	  text: "返程"
	        	    	          }),
	        	    	          new sap.m.Select("backWay", {
	        	    	        	  items:[
	        	    	        	         new sap.ui.core.Item({text: "飞机"}),
	        	    	        	         new sap.ui.core.Item({text: "Train"}),
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
			    	        	   text:"花费"
			    	           }),
			    	           new sap.m.Input({
			    	        	   type: sap.m.InputType.Number,
			    	        	   value: "20000"
			    	           }),
			    	           new sap.m.HBox({
			    	           }),
			    	           new sap.m.Label({
			    	        	   text:"备注"
			    	           }),
			    	           new sap.m.TextArea({
			    	        	   value: "我需要去和客户签一份订单，我会在洛杉矶4星的酒店住四天。",
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
						        	  text: "提交"
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