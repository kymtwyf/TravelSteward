sap.ui.controller("manager.masterdetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf manager.master2
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf manager.master2
*/
//	onBeforeRendering: function() {
//
//	},
	
	
	
	onBeforeShow:function(evt){
       
        
        var proposal=sap.ui.getCore().byId("proposal");
        var personalid = sap.ui.getCore().byId("personalid");
		var email =  sap.ui.getCore().byId("email");
		var department = sap.ui.getCore().byId("department");
	    var status =  sap.ui.getCore().byId("status");
	    
	    var detailOjectHeader =sap.ui.getCore().byId("detailobjectheader");
		var destinationCountry = sap.ui.getCore().byId("destinationcountry");
		var destinationCity = sap.ui.getCore().byId("destinationcity");
		var reason = sap.ui.getCore().byId("reason");
		var leaveDate = sap.ui.getCore().byId("leavedate");
		var leaveWay = sap.ui.getCore().byId("leaveway");
		var returnDate = sap.ui.getCore().byId("returndate");
		var returnWay = sap.ui.getCore().byId("returnway");
		
		var requestdata = model.data["request"].content;
        var id = evt.data.id;
        detailOjectHeader.setTitle("NO."+id);
        
        	for(var i = 0; i<requestdata.length; i++){
        		if(requestdata[i].REQID == id){
        			
        			proposal.setText("Name: "+requestdata[i].PNAME);
        			personalid.setText("Employer ID: "+requestdata[i].PEID);
        		    email.setText("Email: "+requestdata[i].EMAIL);
        		    department.setText("Department: "+requestdata[i].DNAME);
        		    status.setText(requestdata[i].STATUS);
        		    destinationCountry.setValue(requestdata[i].DESCOUN);
        		    destinationCity.setValue(requestdata[i].DESREG);
        		    reason.setValue(requestdata[i].REA);
        		    leaveDate.setValue(requestdata[i].TDATE);
        		    leaveWay.setValue(requestdata[i].TWAY);
        		    returnDate.setValue(requestdata[i].BDATE);
        		    returnWay.setValue(requestdata[i].BWAY);
        		    
        			if(requestdata[i].STATUS =="Approved")
        				status.setState("Success");
        		    else if (requestdata[i].STATUS =="Pending")
        		    	status.setState("Warning");
        		    else status.setState("Error");
        			
        			detailOjectHeader.setTitle("NO."+id);
        			detailOjectHeader.setNumber(requestdata[i].PLEXP);
        			detailOjectHeader.setNumberUnit("RMB");
        		}
        }
        
       //Handle show or hide check box and send message button 	
       var detailIconTabBar = new sap.ui.getCore().byId("detailicontabbar");
       detailIconTabBar.attachSelect(function(evt) {
    	   var selected = evt.getParameters().item.getText();
    	   var transSelect = sap.ui.getCore().byId("transSelect");
    	   var sendMessButton = sap.ui.getCore().byId("sendMessButton");
    	   if(selected == "Detail") {
    		   transSelect.setVisible(false);
    		   sendMessButton.setVisible(false);
    	   }
    	   else if(selected == "Comments") {
    		   transSelect.setVisible(true);
    		   sendMessButton.setVisible(true);
    	   }
       });
        //Handle send message
       this.reqId = id;
       this.locMessCount = 0;
       var list = sap.ui.getCore().byId("messList");
       list.destroyItems(); 
       var controller = this;												//alias
       
       var sendMessButton = sap.ui.getCore().byId("sendMessButton");
       sendMessButton.attachPress(function() {
    	   var inputMess = sap.ui.getCore().byId("inputArea").getValue();
    	   sap.ui.getCore().byId("inputArea").setValue("");
    	   var transMess = controller.transContent(inputMess);
    	   var list = sap.ui.getCore().byId("messList");					//refresh list immediately
    	   controller.locMessCount++;
    	   list.addItem(new sap.m.FeedListItem({
    		   sender: "May Grace",
    		   //icon: "img/important_grey.png",	//TODO
    		   //info: "Message",
    		   timestamp: new Date().toLocaleString(),
    		   text: transMess,
    		   iconDensityAware:false
    	   }));
    	   controller.sendMessage(transMess);
       });
       
       
       //handle refresh messages
       this.keepRefresh = true;												//start refresh messages
       
       var itemTemplate = new sap.m.FeedListItem({
    	   sender: "{FNAME}",
    	   //icon: "img/important_grey.png",	//TODO
    	   //info: "Message",
    	   timestamp: "{STIME}",
    	   text: "{CONTENT}"
     }); 
       
       if(controller.keepRefresh) {											//run once immediately						
		   $.ajax({
			   type:"get",
			   async:false,
			   //url:"http://ld9415:8002/ta/TravelAnalysis/ta.xsodata/AllMess?$filter=(REQID eq "+controller.reqId+")&$orderby=STIME asc&$format=json",
			   url: "http://ld9415:8002/ta/TravelAnalysis/xsjs/getChat.xsjs?reqId="+controller.reqId,
			   dataType:"jsonp",
			   data: {
				   time: new Date().toLocaleTimeString()				//ensure not use cache
			   },
			   success:function(res){ //console.log(res.d.results.length);
				   for(;controller.locMessCount < res.d.results.length;controller.locMessCount++) {
					   var list = sap.ui.getCore().byId("messList");
					   list.addItem(new sap.m.FeedListItem({
			    		   sender: res.d.results[controller.locMessCount].FNAME,
			    		   //icon: "img/important_grey.png",	//TODO
			    		   //info: "Message",
			    		   timestamp: res.d.results[controller.locMessCount].STIME,
			    		   text: res.d.results[controller.locMessCount].CONTENT
			    	   }));
				   }
			  },
			  error:function(){
				  alert('Fail to get messages from HANA server!');
			  }
		 });
	   }		
       
       setInterval(function() {												//set timer
    	   if(controller.keepRefresh) {									
    		   $.ajax({
    			   type:"get",
    			   async:false,
//    			   url:"http://ld9415:8002/ta/TravelAnalysis/ta.xsodata/AllMess?$filter=(REQID eq "+controller.reqId+")&$orderby=STIME asc&$format=json",
//    			   dataType:"json",
    			   url: "http://ld9415:8002/ta/TravelAnalysis/xsjs/getChat.xsjs?reqId="+controller.reqId,
    			   dataType:"jsonp",
    			   data: {
    				   time: new Date().toLocaleTimeString()				//ensure not use cache
    			   },
    			   success:function(res){ 
    				   for(;controller.locMessCount < res.d.results.length;controller.locMessCount++) {
    					   var list = sap.ui.getCore().byId("messList");
    					   list.addItem(new sap.m.FeedListItem({
    			    		   sender: res.d.results[controller.locMessCount].FNAME,
    			    		   //icon: "img/important_grey.png",	//TODO
    			    		   //info: "Message",
    			    		   timestamp: res.d.results[controller.locMessCount].STIME,
    			    		   text: res.d.results[controller.locMessCount].CONTENT
    			    	   }));
    				   }
    			  },
    			  error:function(){
    				  alert('Fail to get messages from HANA server!');
    			  }
    		 });
    	   }																//endif keepRefresh
		}, controller.refreshInterval); 
       
     },
    
     
    reqId: -1,
     
	locMessCount: 0,
	
	keepRefresh: false,														//control whether refresh
	
	refreshInterval: 3000,													//millsecond
	
	transContent: function(cont) {
		var transCont = null;
		$.ajax({
			   type:"get",
			   async:false,													//must be synchronized
			   url:"http://openapi.baidu.com/public/2.0/bmt/translate",
			   dataType:"json",
			   data: {
				   from: "zh",												//language choose
				   to: "en",
				   client_id: "0UFMGl3prDszMBjSYF1bbw6D",					//baidu api key
				   q: cont
			   },	
			   success:function(json){
				  transCont = cont+"("+json.trans_result[0].dst+")";
			  },
			  error:function(){
				  alert('Fail to translate with baidu API!');
			  }
		});
		return transCont;
	},
	
	sendMessage: function(transCont) {
		$.ajax({
			   type:"get",
			   async:true,													//asynchron is ok
			   url:"http://ld9415:8002/ta/TravelAnalysis/xsjs/insertChat.xsjs",
			   dataType:"json",
			   data: {
				   reqId: this.reqId,
				   from: 18,
				   to: 81,
				   time: new Date().toLocaleString(),
				   content: transCont
			   },
			   success:function(transCont){
				  //console.log("SendMessage "+this.reqId+" "+18+" "+81+" "+time+" "+transCont);
			  },
			  error:function(){
				  alert('Fail to send message to HANA server!');
			  }
		 });
    }
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf manager.master2
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf manager.master2
*/
//	onExit: function() {
//
//	}

});
