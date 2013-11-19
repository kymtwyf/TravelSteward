sap.ui.controller("manager.analysisByCity", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf manager.analysisByCity
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf manager.analysisByCity
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf manager.analysisByCity
*/
	onAfterRendering: function() {
		var screenWidth = 1024;
		var screenHeight = $(window).height();
		$('#analysisByCity-mapDiv').css({
			"width":screenWidth,
			"height":0.6*screenHeight,
			"display":"block",
			"position":"relative",
			"top":"-60px",
			// "left":0.05*screenWidth,		

		});
		$('#analysisByCity-tablevbox').css({
			"width":0.9*screenWidth,
			"height":0.7*screenHeight,
			"left":0.05*screenWidth,
			"display":"none"			
			
		});
		$('#analysisByCity-chartDiv').css({
			"width":0.9*screenWidth,
			"height":0.7*screenHeight,
			"left":0.05*screenWidth,
			"display":"none"
		});
		bus.subscribe('analysisByCity','show',function(channelId,eventId,index){

				var ids = ['analysisByCity-mapDiv','analysisByCity-tablevbox','analysisByCity-chartDiv'];
        		for(var i = 0 ; i < ids.length; i++){
		            console.log('showing container and hidding container');
		            if(i==index){
		                $('#'+ids[i]).css({"display":"block"});
		            }else{
		                $('#'+ids[i]).css({"display":"none"});
	            }            
        	}
		},this);	

		var analysisByCity_map = new Datamap({
	        scope: 'usa',
	        element: document.getElementById('analysisByCity-mapDiv'),
	        geographyConfig: {
	          highlightBorderColor: '#bada55',
	         popupTemplate: function(geography, data) {
	            return data?'<div class="hoverinfo"><strong>地区:' + geography.properties.name + '</strong> <br />' + '花费:'+data.cost + ' </div>':null;
	          },
	          highlightBorderWidth: 3
	        },
	        done:function(datamap){
                $(".datamaps-legend").css({"z-index":0});   
	        },
	        fills: {
	        	"超过1.2亿":"#FF0F00",
	        	"4000万到1.2亿":"#FF6600",
	        	"少于4000万":"#FCD202",
	        	"无数据":"RGBA(4,210,21,0.3)",
	     	   defaultFill: "RGBA(4,210,21,0.3)"
	        },
	        data:{
		        "IL":{
		        	"fillKey":"4000万到1.2亿",
		        	"cost":"6000万",
		        },
		        "CA":{
		        	"fillKey":"超过1.2亿",
		        	"cost":"12200万"
		        },
		        "TX":{
		        	"fillKey":"少于4000万",
		        	"cost":"2000万"
		        },
		        "NY":{
		        	"fillKey":"少于4000万",
		        	"cost":"2600万"
		        }
   	 		}	
		});
		analysisByCity_map.legend();
		analysisByCity_map.draw();
 

			
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf manager.analysisByCity
*/
//	onExit: function() {
//
//	}

});