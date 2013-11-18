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
			"width":0.9*screenWidth,
			"height":0.7*screenHeight,
			"display":"block",
			"position":"relative",
			"left":0.05*screenWidth,			

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
	            return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong> <br />Electoral Votes:' +  data.electoralVotes + ' </div>'
	          },
	          highlightBorderWidth: 3
	        },
	        
	        fills: {
	        	
	        defaultFill: '#EDDC4E'
	        },
	        data:{
		        "IL":{

		        }
   	 		}	
});
 // var election = new Datamap({
 //        scope: 'world',
 //        element: document.getElementById('analysisByCity-mapDiv'),
 //        projection: 'mercator'
 //      });
 
 
 //    var presidentialTrips = [
 //        {
 //            origin: {
 //                latitude: 38.895111,
 //                longitude: -77.036667
 //            },
 //            destination: {
 //                latitude: 32.066667,
 //                longitude: 34.783333 
 //            }
 //        },
 //        {
 //            origin: {
 //                latitude: 38.895111,
 //                longitude: -77.036667
 //            },
 //            destination: {
 //                latitude: 19.433333,
 //                longitude: -99.133333
 //            }
 //        },
 //        {
 //            origin: {
 //                latitude: 38.895111,
 //                longitude: -77.036667
 //            },
 //            destination: {
 //                latitude: 9.933333,
 //                longitude: -84.083333
 //            }
 //        },
 //        {
 //            origin: {
 //                latitude: 38.895111,
 //                longitude: -77.036667
 //            },
 //            destination: {
 //                latitude: 54.597 ,
 //                longitude: -5.93
 //            }
 //        },
 //        {
 //            origin: {
 //                latitude: 38.895111,
 //                longitude: -77.036667
 //            },
 //            destination: {
 //                latitude: 52.516667,
 //                longitude: 13.383333 
 //            }
 //        },
 //        {
 //            origin: {
 //                latitude: 38.895111,
 //                longitude: -77.036667
 //            },
 //            destination: {
 //                latitude: 14.692778,
 //                longitude: -17.446667
 //            }
 //        },
 //        {
 //            origin: {
 //                latitude: 38.895111,
 //                longitude: -77.036667
 //            },
 //            destination: {
 //                latitude: -26.204444,
 //                longitude: 28.045556
 //            }
 //        },
 //                {
 //            origin: {
 //                latitude: 38.895111,
 //                longitude: -77.036667
 //            },
 //            destination: {
 //                latitude: -6.8,
 //                longitude: 39.283333 
 //            }
 //        },
 //                {
 //            origin: {
 //                latitude: 38.895111,
 //                longitude: -77.036667
 //            },
 //            destination: {
 //                latitude: 59.329444,
 //                longitude: 18.068611
 //            }
 //        },
 //                {
 //            origin: {
 //                latitude: 38.895111,
 //                longitude: -77.036667
 //            },
 //            destination: {
 //                latitude: 59.95 ,
 //                longitude: 30.3
 //            }
 //        }
 //    ];
 
 //  election.arc( presidentialTrips, {strokeWidth: 2});

			
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf manager.analysisByCity
*/
//	onExit: function() {
//
//	}

});