sap.ui.controller("travelsteward.StaffReqListPage", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf travelsteward.StaffReqListPage
*/
	onInit: function() {
//		jQuery.sap.require("sap.ui.model.json.JSONModel");
//		var data = {
//		  teamMembers: [
//		    {firstName: "Indiana", lastName: "Jones", birthDate: "1991-12-03", gender: "To Be Approved"},
//		    {firstName: "Barbara", lastName: "Dreher", birthDate: "1999-08-31", gender: "To Be Approved"},
//		    {firstName: "Dante", lastName: "Alighieri", birthDate: "1982-04-22", gender: "To Be Approved"},
//		    {firstName: "Terry", lastName: "Jones", birthDate: "1988-06-07", gender: "To Be Approved"},
//		    {firstName: "Leia", lastName: "Vader", birthDate: "1991-11-09", gender: "Approved"},
//		    {firstName: "John", lastName: "Dufke", birthDate: "1979-08-17", gender: "Approved"},
//		    {firstName: "Dante", lastName: "Alioli", birthDate: "1987-05-11", gender: "Approved"},
//		    {firstName: "Venus", lastName: "Botticelli", birthDate: "1976-09-08", gender: "Approved"}
//		  ]
//		};
//		var oModel = new sap.ui.model.json.JSONModel(data);
//		var oList = sap.ui.getCore().byId("reqList");
//		oList.setModel(oModel);
//		var oGenderSorter = new sap.ui.model.Sorter("gender", true, true);
//		var oItemTemplate = new sap.m.StandardListItem({
//			  title: "{firstName}",
//			  description: "ABC",
////			  icon: {
////			    path: "gender",
////			    formatter: function (sGender) {
////			      return (sGender === "Male" ? "sap-icon://doctor" : "sap-icon://nurse"); 
////			    }
////			  }
//			});
//		oList.bindAggregation("items", {
//			  path: "/teamMembers",
//			  template: oItemTemplate,
//			  sorter: oGenderSorter
//		});
//		oList.getBinding("items").sort(oGenderSorter);
		
		var newReqButton = sap.ui.getCore().byId("newReqButton");
		newReqButton.attachPress(function() {
			var app = sap.ui.getCore().byId("staffApp");
			app.toDetail("staffNewReqPage");
		});
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf travelsteward.StaffReqListPage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf travelsteward.StaffReqListPage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf travelsteward.StaffReqListPage
*/
//	onExit: function() {
//
//	}

});