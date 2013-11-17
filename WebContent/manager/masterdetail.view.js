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
		
		var proposal = new sap.m.ObjectAttribute("proposal",{
			active:true,
			press:function(){
				console.log( util.tools.splitString(personalid.getText()));
			}
		});
		var personalid = new sap.m.ObjectAttribute("personalid",{
			active:true,
			press:function(){
				console.log(util.tools.splitString(this.getText()));
			}
		});
		var email =  new sap.m.ObjectAttribute("email",{
			active:true,
			press:function(){
				   sap.m.URLHelper.triggerEmail(util.tools.splitString(this.getText()), 
						   						"Request "+detailOjectHeader.getTitle(), 
						   						"Dear " +  util.tools.splitString(proposal.getText())+ ",");
			}
		});
		var department = new sap.m.ObjectAttribute("department",{
			active:true,
			press:function(){
				console.log( util.tools.splitString(this.getText()));
			}
		});
		
	    var status =  new sap.m.ObjectStatus("status");
	//    var secondStatus =  new sap.m.ObjectStatus("secondstatus");
	    
		var detailOjectHeader = new sap.m.ObjectHeader("detailobjectheader", {
		      attributes : [proposal, personalid,email, department],
		      firstStatus : status
		});
		var destinationCountry = new sap.m.DisplayListItem("destinationcountry",{
			type: sap.m.ListType.Active, 
            label: "Country",
            press: function(oControlEvent){
				alert("Hey Man! You can add an event here");
			}
        });
		var destinationCity = new sap.m.DisplayListItem("destinationcity",{
			type: sap.m.ListType.Active,             
            label: "City",
             press: function(oControlEvent){
				//alert("Hey Man! You can add an event here");
				console.log('pressed');
          		bus.publish("splitapp","toDetail","manager.analysisByCity");

			}
        });
		var reason = new sap.m.DisplayListItem("reason",{
            label: "Reason"
        });
		var leaveDate = new sap.m.DisplayListItem("leavedate",{
            label: "Leave Date"
        });
		var leaveWay = new sap.m.DisplayListItem("leaveway",{
            label: "Transportation"
        });
		var returnDate = new sap.m.DisplayListItem("returndate",{
            label: "Return Date"
        });
		var returnWay = new sap.m.DisplayListItem("returnway",{
            label: "Transportation"
        });
		
		destinationCountry.addStyleClass("detaildisplayItem");
		destinationCity.addStyleClass("detaildisplayItem");
		reason.addStyleClass("detaildisplayItem");
		leaveDate.addStyleClass("detaildisplayItem");
		leaveWay.addStyleClass("detaildisplayItem");
		returnDate.addStyleClass("detaildisplayItem");
		returnWay.addStyleClass("detaildisplayItem");
		
		var detailList = new sap.m.List({
		      items: [destinationCountry,destinationCity,reason,
		              leaveDate,leaveWay,returnDate,returnWay]
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
			};
		 
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
		
		var rejectedButton = new sap.m.Button({
		      icon: "sap-icon://decline",
	          type: "Reject",
		      text: "Reject",
		      press:function(){
		    	 status.setText("Rejected");
		    	 status.setState("Error");
		      }
		      
		});
		var approvedButton = new sap.m.Button({
		      icon: "sap-icon://accept",
              type: "Accept",
		      text: "Approve",
		      press:function(){
		    	 status.setText("Approved");
		    	 status.setState("Success");
		      }
		      
		});
		
		var actionSheet = new sap.m.ActionSheet({
			  buttons: [approvedButton,rejectedButton],
			  placement: sap.m.PlacementType.Bottom
	    });
		
		
		var actionButton =   new sap.m.Button("actionbutton",{ 
	          icon: "sap-icon://action",
	          press: function(){
	        	  actionSheet.openBy(this);
	          }
	    });
		
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
 			headerContent:actionButton,
 			enableScrolling:false,
 			showNavButton: true,
 			 navButtonPress:function(){
 				view.getController().keepRefresh = false;				//stop refresh messages
             	bus.publish('masterdetail','backtomaster1');
             },
 			content:[detailOjectHeader,detailIconTabBar],
 			footer:detailFooter
 		});
 		return detailMasterPage;
	}

});
