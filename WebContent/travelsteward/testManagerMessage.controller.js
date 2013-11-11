sap.ui.controller("travelsteward.testManagerMessage", {

	messCount: 0,
	
	bindData: function() {
		
	},
	
	refrechChat: function() {
		var controller = this;
		$.ajax({
			   type:"get",
			   async:false,
			   url:"http://ld9415:8002/ta/TravelAnalysis/xsjs/getChat.xsjs",
			   dataType:"json",
			   data: {
				   reqId: 18,
				   time: new Date().toLocaleTimeString()
			   },
			   success:function(res){
				  if(res.count > controller.messCount) {
					  var list = sap.ui.getCore().byId("messList");
					  var model = new sap.ui.model.json.JSONModel();
					  model.setData(res);
					  list.setModel(model);
				  }
				  controller.messCount = res.count;
				  var list = sap.ui.getCore().byId("messList");
				  var itemTemplate = new sap.m.FeedListItem({
					      sender: "{from}",
					      icon: "img/important_grey.png",
					      info: "Message",
					      timestamp: "{time}",
					      text: "{content}"
					});
					
					list.bindAggregation("items", {
						path: "/records",
						template: itemTemplate
					});
			  },
			  error:function(){
				  alert('Fail to connect to HANA server!');
			  }
		 });
	},
	
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf travelsteward.testManagerMessage
*/
	onInit: function() {
		var controller = this;
		this.refrechChat();
		
		var sendButton = sap.ui.getCore().byId("sendButton");
		sendButton.attachPress(function(){
			var tran_input;
			
			$.ajax({
				   type:"get",
				   async:false,//project=123DANIEL
				   url:"http://openapi.baidu.com/public/2.0/bmt/translate",
				   dataType:"json",
				   data: {
					   from: "zh",
					   to: "en",
					   client_id: "0UFMGl3prDszMBjSYF1bbw6D",
					   q: $("#input").val()
				   },	
				   success:function(json){console.log(json);
					  tran_input = json.trans_result[0].dst;
				  },
				  error:function(){
					  alert('Fail to connect to HANA server!');
				  }
			  });
			
			//console.log(tran_input);
			
			$.ajax({
				   type:"get",
				   async:false,
				   url:"http://ld9415:8002/ta/TravelAnalysis/xsjs/insertChat.xsjs",
				   dataType:"json",
				   data: {
					   reqId: 18,
					   from: 1,
					   to: 2,
					   time: new Date().toLocaleTimeString(),
					   content: tran_input
				   },
				   success:function(res){
					  
				  },
				  error:function(){
					  alert('Fail to connect to HANA server!');
				  }
			 });
		});
		
		setInterval(function() {
			$.ajax({
				   type:"get",
				   async:true,
				   url:"http://ld9415:8002/ta/TravelAnalysis/xsjs/getChat.xsjs",
				   dataType:"json",
				   data: {
					   reqId: 18,
					   time: new Date().toLocaleTimeString()
				   },
				   success:function(res){
					  if(res.count > controller.messCount) {
						  var list = sap.ui.getCore().byId("messList");
						  var model = new sap.ui.model.json.JSONModel();
						  model.setData(res);
						  list.setModel(model);
					  }
					  controller.messCount = res.count;
				  },
				  error:function(){
					  alert('Fail to connect to HANA server!');
				  }
			 });
		}, 3000);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf travelsteward.testManagerMessage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf travelsteward.testManagerMessage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf travelsteward.testManagerMessage
*/
//	onExit: function() {
//
//	}

});