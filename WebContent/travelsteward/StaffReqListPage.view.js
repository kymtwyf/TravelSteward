sap.ui.jsview("travelsteward.StaffReqListPage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf travelsteward.StaffReqListPage
	*/ 
	getControllerName : function() {
		return "travelsteward.StaffReqListPage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf travelsteward.StaffReqListPage
	*/ 
	createContent : function(oController) {
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
			content: [
			    new sap.m.List("reqList", {
			    	items:[
			    	       new sap.m.StandardListItem({
			    	    	   title: "Chengdu For Meeting",
			    	    	   description: "22/09/2013-25/09/2013",
			    	    	   icon: "sap-icon://meeting-room",
			    	    	   info: "Awaiting Approve",
			    	    	   infoState: sap.ui.core.ValueState.Error
			    	       }),
			    	       new sap.m.StandardListItem({
			    	    	   title: "Shanghai For Sale",
			    	    	   description: "22/09/2013-25/09/2013",
			    	    	   icon: "sap-icon://sales-order",
			    	    	   info: "Awaiting Approve",
			    	    	   infoState: sap.ui.core.ValueState.Error
			    	       }),
			    	       new sap.m.StandardListItem({
			    	    	   title: "Beijing For Support",
			    	    	   description: "22/09/2013-25/09/2013",
			    	    	   icon: "sap-icon://wrench",
			    	    	   info: "Approved",
			    	    	   infoState: sap.ui.core.ValueState.Success
			    	       }),
			    	       new sap.m.StandardListItem({
			    	    	   title: "Shanghai For Sale",
			    	    	   description: "22/09/2013-25/09/2013",
			    	    	   icon: "sap-icon://sales-order",
			    	    	   info: "Approved",
			    	    	   infoState: sap.ui.core.ValueState.Success
			    	       }),
			    	       new sap.m.StandardListItem({
			    	    	   title: "Beijing For Support",
			    	    	   description: "22/09/2013-25/09/2013",
			    	    	   icon: "sap-icon://wrench",
			    	    	   info: "Approved",
			    	    	   infoState: sap.ui.core.ValueState.Success
			    	       }),
			    	       new sap.m.StandardListItem({
			    	    	   title: "Chengdu For Meeting",
			    	    	   description: "22/09/2013-25/09/2013",
			    	    	   icon: "sap-icon://meeting-room",
			    	    	   info: "Approved",
			    	    	   infoState: sap.ui.core.ValueState.Success
			    	       }),
			    	       new sap.m.StandardListItem({
			    	    	   title: "Chengdu For Meeting",
			    	    	   description: "22/09/2013-25/09/2013",
			    	    	   icon: "sap-icon://meeting-room",
			    	    	   info: "Approved",
			    	    	   infoState: sap.ui.core.ValueState.Success
			    	       }),
			    	       new sap.m.StandardListItem({
			    	    	   title: "Shanghai For Sale",
			    	    	   description: "22/09/2013-25/09/2013",
			    	    	   icon: "sap-icon://sales-order",
			    	    	   info: "Approved",
			    	    	   infoState: sap.ui.core.ValueState.Success
			    	       }),
			    	       new sap.m.StandardListItem({
			    	    	   title: "Beijing For Support",
			    	    	   description: "22/09/2013-25/09/2013",
			    	    	   icon: "sap-icon://wrench",
			    	    	   info: "Approved",
			    	    	   infoState: sap.ui.core.ValueState.Success
			    	       }),
			    	]
			    }),
			],
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