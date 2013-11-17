sap.ui.jsview("manager.app", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf manager.app
	*/ 
	getControllerName : function() {
		return "manager.app";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf manager.app
	*/ 
	createContent : function(oController) {
		
		
		this.setDisplayBlock(true);

		// create app
		this.app = new sap.m.SplitApp("splitApp",{
			mode:"HideMode",
			afterDetailNavigate: function () {
				this.hideMaster();
			}
		});

		this.app.addDetailPage(sap.ui.jsview("manager.analysis", "manager.analysis"));

		this.app.addMasterPage(sap.ui.jsview("manager.master", "manager.master"));
		
		this.app.addMasterPage(sap.ui.jsview("manager.masterdetail", "manager.masterdetail"));
		console.log('analysisBycountry added加载');
		this.app.addDetailPage(sap.ui.jsview("manager.analysisByCountry", "manager.analysisByCountry"));
		this.app.addDetailPage(sap.ui.jsview("manager.AnalysisByMonth", "manager.AnalysisByMonth"));
		this.app.addDetailPage(sap.ui.jsview("manager.analysisByReason", "manager.analysisByReason"));

		
		this.app.toDetail("manager.analysisByCountry");

		this.app.toMaster("manager.master");
		
		function ToMaster2(channelId,eventId,requestid)
		{
			this.app.toMaster("manager.masterdetail",{
				id:requestid
			});
		}
		
		function ToMaster1(channelId,eventId)
		{
			this.app.backMaster("manager.master");
		}
		
		function toDetail(channelId,eventId,pageId){
			if(sap.ui.getCore().byId(pageId)){
				this.app.toDetail(pageId);
			}
		}
		function backDetail(channelId,eventId,pageId){
			if(sap.ui.getCore().byId(pageId)){
				this.app.backDetail(pageId);
			}
		}
		bus.subscribe("splitapp","tomaster2",ToMaster2,this);
		bus.subscribe("splitapp","toDetail",toDetail,this);
		bus.subscribe("splitapp","backDetail",backDetail,this);		
		bus.subscribe('masterdetail','backtomaster1',ToMaster1,this);
		// done
		return new sap.m.Shell("Shell", {
			showLogout : false,
			app : this.app
		});
	}

});
