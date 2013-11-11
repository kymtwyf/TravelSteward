sap.ui.jsview("manager.masterdetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf manager.masterdetail
	*/ 
	getControllerName : function() {
		return "manager.masterdetail";
	},
	onBeforeShow:function(evt){
        this.getController().onBeforeShow(evt);
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf manager.masterdetail
	*/ 
	createContent : function(oController) {
		this.detailOjectHeader = new sap.m.ObjectHeader("detailobjectheader", {
		      title : "No.9999999",
		      number: "300.00",
		      numberUnit : "RMB",
		      attributes : [
		        new sap.m.ObjectAttribute({
		          text : "Proposal: Owen Xu"
		        }),
		        new sap.m.ObjectAttribute({
			      text : "Department: FGI"
			    })
		      ],
		      firstStatus : new sap.m.ObjectStatus({
		        text : "Pending",
		        state : "Warning"
		      })
		    });
		
		var detailIconTabBar = new sap.m.IconTabBar("detailicontabbar", {
			items: [
			    new sap.m.IconTabFilter({
			      icon: "sap-icon://task",
			      text: "Detail"
			    }),
			    new sap.m.IconTabFilter({
			      icon: "sap-icon://instance",
			      count: "1",
			      text: "Comments",
			    	  content:[ new sap.m.Label({
							text:"content"
						})]
			    }),
			   
		    ]
			
		});
		detailIconTabBar.setExpandable(false);
		detailIconTabBar.addStyleClass("detailIconTabBar");
		
		var detailMasterPage = new sap.m.Page("detail_master_page", {
 			title:"Request Detail",
 			showNavButton: true,
 			 navButtonPress:function(){
             	bus.publish('masterdetail','backtomaster1');
             },
 			content:[this.detailOjectHeader,detailIconTabBar]
 		});
 		return detailMasterPage;
	}

});