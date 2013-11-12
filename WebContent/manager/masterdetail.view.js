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
		this.email =  new sap.m.ObjectAttribute();
		this.department = new sap.m.ObjectAttribute();
	    this.status =  new sap.m.ObjectStatus();
	    this.secondStatus =  new sap.m.ObjectStatus();
	    
		this.detailOjectHeader = new sap.m.ObjectHeader("detailobjectheader", {
		      attributes : [this.proposal,this.personalid,this.email,this.department],
		      firstStatus : this.status
		});
		this.destinationCountry = new sap.m.DisplayListItem({
            label: "Country"
        });
		this.destinationCity = new sap.m.DisplayListItem({
            label: "City"
        });
		this.reason = new sap.m.DisplayListItem({
            label: "Reason"
        });
		this.leaveDate = new sap.m.DisplayListItem({
            label: "Leave Date"
        });
		this.leaveWay = new sap.m.DisplayListItem({
            label: "Transportation"
        });
		this.returnDate = new sap.m.DisplayListItem({
            label: "Return Date"
        });
		this.returnWay = new sap.m.DisplayListItem({
            label: "Transportation"
        });
		
		this.destinationCountry.addStyleClass("detaildisplayItem");
		this.destinationCity.addStyleClass("detaildisplayItem");
		this.reason.addStyleClass("detaildisplayItem");
		this.leaveDate.addStyleClass("detaildisplayItem");
		this.leaveWay.addStyleClass("detaildisplayItem");
		this.returnDate.addStyleClass("detaildisplayItem");
		this.returnWay.addStyleClass("detaildisplayItem");
		
		var detailList = new sap.m.List({
		      items: [this.destinationCountry,this.destinationCity,this.reason,
		              this.leaveDate,this.leaveWay,this.returnDate,this.returnWay]
		 });
		
		var scrollContainer = new sap.m.ScrollContainer({
			horizontal: false,
			vertical: true,
			height: "350px",
			content: detailList
			
		});
		
		 window.onresize = function(event){
				var offset = document.documentElement.clientHeight-425;
				offset = offset.toString()+"px";
				scrollContainer.setHeight(offset);
			}
		
		 
		 
		var detailIconTabBar = new sap.m.IconTabBar("detailicontabbar", {
			items: [
			    new sap.m.IconTabFilter({
			      icon: "sap-icon://task",
			      text: "Detail",
			      content:[scrollContainer]
			    }),
			    new sap.m.IconTabFilter({
			      icon: "sap-icon://instance",
			      count: "1",
			      text: "Comments",
			    	  content:[ 
			    	           new sap.m.ScrollContainer({
			    	        	   horizontal: false,
			    	        	   vertical: true,
			    	        	   height: "260px",
			    	        	   content: new sap.m.List("messList", {
							        	
							        }),
	
			    	           }),
						        new sap.m.TextArea("inputArea", {
						        	width: "80%",
						        	cols:2
						        }),
			    	            ]
			    }),
			   
		    ]
			
		});
		detailIconTabBar.setExpandable(false);
		detailIconTabBar.addStyleClass("detailIconTabBar");
		
		

		var detailFooter = new sap.m.Bar({
			contentLeft:[
			             new sap.m.CheckBox("transSelect", {
			            	 text: "auto-translate",
			            	 visible: false
			             })
			             ],
			contentRight:[
			              new sap.m.Button("sendMessButton", {
			            	  icon: "sap-icon://email",
			            	  visible: false
			              })
			             ]
		});

		var view = this;		//alias
		var detailMasterPage = new sap.m.Page("detail_master_page", {
 			title:"Request Detail",
 			enableScrolling:false,
 			showNavButton: true,
 			 navButtonPress:function(){
 				view.getController().keepRefresh = false;				//stop refresh messages
             	bus.publish('masterdetail','backtomaster1');
             },
 			content:[this.detailOjectHeader,detailIconTabBar],
 			footer:detailFooter
 		});
 		return detailMasterPage;
	}

});
