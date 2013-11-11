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
		
		this.proposal = new sap.m.ObjectAttribute();
		this.personalid = new sap.m.ObjectAttribute();
		this.department = new sap.m.ObjectAttribute();
	    this.status =  new sap.m.ObjectStatus();
	    
		this.detailOjectHeader = new sap.m.ObjectHeader("detailobjectheader", {
		      attributes : [this.proposal,this.personalid,this.department],
		      firstStatus : this.status
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
			    	  content:[ 
//			    	            new sap.m.Label({
//			    	            	text:"content"
//			    	            }),
			    	            new sap.m.List("messList", {
						        	  
						        }),
						        new sap.m.TextArea("inputArea", {
						        	width: "80%",
						        	cols:2
						        }),
						        new sap.m.CheckBox({
						        	text: "auto-translate"
						        }),
						        new sap.m.Button("sendMessButton", {
						        	type : sap.m.ButtonType.Accept,
						        	text: "Send"
						        })
			    	            ]
			    }),
			   
		    ]
			
		});
		detailIconTabBar.setExpandable(false);
		detailIconTabBar.addStyleClass("detailIconTabBar");
		
		var view = this;		//alias
		var detailMasterPage = new sap.m.Page("detail_master_page", {
 			title:"Request Detail",
 			showNavButton: true,
 			 navButtonPress:function(){
 				view.getController().keepRefresh = false;				//stop refresh messages
             	bus.publish('masterdetail','backtomaster1');
             },
 			content:[this.detailOjectHeader,detailIconTabBar]
 		});
 		return detailMasterPage;
	}

});