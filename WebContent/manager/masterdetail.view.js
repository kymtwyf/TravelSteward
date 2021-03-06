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
		            var splitapp = sap.ui.getCore().byId('splitApp');
		           	splitapp.toDetail("manager.analysis");
		 	
			}
		});
		
	    var status =  new sap.m.ObjectStatus("status");
	//    var secondStatus =  new sap.m.ObjectStatus("secondstatus");
	    
		var detailOjectHeader = new sap.m.ObjectHeader("detailobjectheader", {
		      attributes : [proposal, personalid,email, department],
		      firstStatus : status
		});
		var destinationCountry = new sap.m.DisplayListItem("destinationcountry",{
			type: sap.m.ListType.Navigation, 
            label: "国家",
            press: function(oControlEvent){
          		bus.publish("splitapp","toDetail",{pageId:"manager.analysisByCountry"});
				// alert("Hey Man! You can add an event here");
			}
        });
		var destinationCity = new sap.m.DisplayListItem("destinationcity",{
			type: sap.m.ListType.Navigation,
            label: "城市",
             press: function(oControlEvent){
				//alert("Hey Man! You can add an event here");
				console.log('pressed');
          		bus.publish("splitapp","toDetail",{pageId:"manager.analysisByCity"});

			}
        });
		var reason = new sap.m.DisplayListItem("reason",{
			type: sap.m.ListType.Navigation,
            label: "出差目的",
            press: function(oControlEvent){
                var splitapp = sap.ui.getCore().byId('splitApp');
              	splitapp.toDetail("manager.analysisByReason");
    		} 	
        });
		var leaveDate = new sap.m.DisplayListItem("leavedate",{
			type: sap.m.ListType.Navigation, 
            label: "出发日期",
            press: function(oControlEvent){
                var splitapp = sap.ui.getCore().byId('splitApp');
              	splitapp.toDetail("manager.AnalysisByMonth");
    		} 	
        });
		var leaveWay = new sap.m.DisplayListItem("leaveway",{
            label: "出发的方式"
        });
		var returnDate = new sap.m.DisplayListItem("returndate",{
			type: sap.m.ListType.Navigation, 
            label: "返回日期",
            press: function(oControlEvent){
                var splitapp = sap.ui.getCore().byId('splitApp');
              	splitapp.toDetail("manager.AnalysisByMonth");
    		} 	
        });
		var returnWay = new sap.m.DisplayListItem("returnway",{
            label: "返回的方式"
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
			      text: "详细信息",
			      content:[scrollContainer]
			    }),
			    new sap.m.IconTabFilter({
			      icon: "sap-icon://comment",
			      text: "留言",
			    	  content:[ 
			    	           new sap.m.ScrollContainer({
			    	        	   horizontal: false,
			    	        	   vertical: true,
			    	        	   height: "260px",
			    	        	   content: new sap.m.List("messList", {
			    	        		   noDataText: "无留言"
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
		
		function changeStatusToServer(reqID,status){
			jQuery.ajax({
				url:"http://ld9415.wdf.sap.corp:8002/ta/TravelAnalysis/xsjs/updateReq.xsjs?reqId="+reqID+"&status="+status ,
				dataType: "jsonp",
				//end 
				error:function(error){
					console.log("change status error!");
				},
				success:function(data){
					console.log(reqID+status+"change status success!!!!!!");
				}
			});
			
		}
		
		var rejectedButton = new sap.m.Button({
		      icon: "sap-icon://decline",
	          type: "Reject",
		      text: "拒绝",
		      press:function(){
		    	 status.setText("拒绝");
		    	 status.setState("Error");
		    	 changeStatusToServer( util.tools.getRequireID(detailOjectHeader.getTitle()),status.getText());
		      }
		      
		});
		var approvedButton = new sap.m.Button({
		      icon: "sap-icon://accept",
              type: "Accept",
		      text: "批准",
		      press:function(){
		    	 status.setText("批准");
		    	 status.setState("Success");
		    	 changeStatusToServer( util.tools.getRequireID(detailOjectHeader.getTitle()),status.getText());
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
			            	 text: "自动翻译",
			            	 visible: false
			             })
			             ],
			contentRight:[
			              new sap.m.Button("sendMessButton", {
			            	  icon: "sap-icon://response",
			            	  visible: false
			              })
			             ]
		});

		var view = this;		//alias
		var detailMasterPage = new sap.m.Page("detail_master_page", {
 			title:"请求详细信息",
 			headerContent:actionButton,
// 			enableScrolling:false,
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
