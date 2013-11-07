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
			    	
			    })
			],
			footer: new sap.m.Bar({
				contentLeft: [
				              new sap.m.Button({
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