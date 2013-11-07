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
			          
			]
		});
	}

});