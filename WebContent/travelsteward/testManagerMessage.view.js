sap.ui.jsview("travelsteward.testManagerMessage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf travelsteward.testManagerMessage
	*/ 
	getControllerName : function() {
		return "travelsteward.testManagerMessage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf travelsteward.testManagerMessage
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
			title: "Title",
			content: [
			          new sap.m.HBox("inputDiv", {
			        	  
			          }),
			          new sap.ui.core.HTML({
			        	  content: '<input id="input" name="input" x-webkit-speech lang="zh-CN" />'
			          }),
			          new sap.m.Button("sendButton", {
			        	 text:"send" 
			          }),
			          new sap.m.List("messList", {
			        	  
			          })
			]
		});
	}

});