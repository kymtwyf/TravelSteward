sap.ui.jsview("manager.analysisByPerson", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf manager.analysisByPerson
	*/ 
	getControllerName : function() {
		return "manager.analysisByPerson";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf manager.analysisByPerson
	*/ 
	createContent : function(oController) {
		jQuery.sap.require('util.uiFactory');
		jQuery.sap.require('util.tools');
		var objectheader = util.uiFactory.getAnalysisObjectHeader();
		var content = new sap.m.VBox("ByPerson-main",{
			items:[
				objectheader,
				new sap.ui.core.HTML("ByPerson-mapDiv",{
					content:"<div id='mapDiv' style='display:none'></div>"
				}),
				new sap.m.VBox("ByPerson-table",{

				}),
				new sap.ui.core.HTML("ByPerson-chartDiv",{
					content:"<div id='chartDiv' style='display:none'></div>"
				})
			]
		});
 		return new sap.m.Page({
			title: "Title",
			content: [
				content
			]
		});
	}

});