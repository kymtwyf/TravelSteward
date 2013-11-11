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
        var id = evt.data.id;
        this.getView().detailOjectHeader.setTitle("NO."+id);
        var requestdata = model.data["request"].content;
        
        console.log(requestdata[1]);
        	for(var i = 0; i<requestdata.length; i++){
        		if(requestdata[i].REQID == id){
        			
        			this.getView().proposal.setText("Name: "+requestdata[i].PNAME);
        			this.getView().personalid.setText("Employer ID: "+requestdata[i].PEID);
        		    this.getView().department.setText("Department: "+requestdata[i].DNAME);
        		    this.getView().status.setText(requestdata[i].STATUS);
        			
        			if(requestdata[i].STATUS =="Approved")
        				this.getView().status.setState("Success");
        		    else if (requestdata[i].STATUS =="Pending")
        		    	this.getView().status.setState("Warning");
        		    else this.getView().status.setState("Error");
        			
        			this.getView().detailOjectHeader.setTitle("NO."+id);
        			this.getView().detailOjectHeader.setNumber(requestdata[i].PLEXP);
        			this.getView().detailOjectHeader.setNumberUnit("RMB");
        		}
        	}
        	
 
       
        
       
        },
    
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