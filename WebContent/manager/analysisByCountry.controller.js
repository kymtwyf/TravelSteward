sap.ui.controller("manager.analysisByCountry", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf manager.analysisByCountry
*/
	onInit: function() {
		//set a timer 
		var flag = false;
		var refreshInterval = 5000;
		var btn_message = sap.ui.getCore().byId('btn_message');
		var app = sap.ui.getCore().byId('splitApp');
		btn_message.setType("Reject");
		btn_message.attachPress(function() {
			btn_message.setType("Default");
			app.showMaster("manager.master");
			flag = true;
			
			jQuery.ajax({
				//url:"http://ld9415:8002/ta/TravelAnalysis/ta.xsodata/AllReqs?$format=json",
				//jsonp parameter
				url:"http://ld9415.wdf.sap.corp:8002/ta/TravelAnalysis/xsjs/getReqs.xsjs",
				dataType: "jsonp",
				//end 
				error:function(error){
					console.log("Error");
				},
				success:function(data){
					console.log("aaaaaaaaaaaaaaaaa");
					var id;
					for(var i = 0; i<data.d.results.length ; i++ ){
						id = data.d.results[i].REQID;
						model.data["request"] = new Object();
						model.data["request"].content = data.d.results;
					}
					
					bus.publish("master","generatelist",{
						content:model.data["request"].content,
						filter:"all"
					});
				}
			});
	    });
		/*
		function startTiming(channelID,eventID,start){
		     setInterval(function() {												//set timer	
		    		   $.ajax({
		    			   type:"get",
		    			   async:false,
		    			   url: "http://ld9415:8002/ta/TravelAnalysis/xsjs/pendingCount.xsjs", 
		    			   dataType:"jsonp",
		    			   data: {
		    				   time: new Date().toLocaleTimeString()				//ensure not use cache
		    			   },
		    			   success:function(res){ 
		    				   console.log("flag："+ flag + res.count);
		    				   if((res.count!=0)&&(flag== false))
		    					   btn_message.setType("Reject");
		    				   else 
		    					   btn_message.setType("Default");
		    			   },	
		    			  error:function(){
		    				  alert('Fail to get count');
		    			  },
		    		 });
		    	   }, refreshInterval); 								//endif keepRefresh
			
		}
		bus.subscribe("time","start",startTiming,this);
		console.log('analysisBycountry ON INIT');
*/
		jQuery.sap.require('model.data');
		jQuery.sap.require('model.fakeData');
		jQuery.sap.require('util.queries');
		jQuery.sap.require('util.tools');

		// jQuery.when(util.queries.getDataForView('analysisByCountry'))
		// .done(function(data){
		// 	// console.log('the formatted data is')
		// 	// console.log(data);
		// 	model.data["analysisByCountry"] = data;
		// 	bus.publish('mapDiv','draw',data);
		// })
		// console.log(model.fakeData);
		bus.subscribe("data","ready",this.onDataReady,this);

		//this.CURRENT_DATA = model.fakeData;
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf manager.analysisByCountry
*/
//	onBeforeRendering: function() {
//
//	},
	onBeforeShow:function(evt){
//		bus.publish("time","start");
		console.log('analysisByCountry onbeforeshow');
		console.log($('#mapDiv'));
		console.log($("#analysisByCountry").height());
		console.log($("#analysisByCountry").width());
	
		if(!model.data['analysisByCountry']){
			jQuery.when(util.queries.getDataForView('analysisByCountry'))
			.done(function(data){
				model.data['analysisByCountry'] = data;
					// bus.publish('mapDiv','draw',data);
				//console.log(util.queries.formatDataForView(sId,data));
					bus.publish("data","ready",util.queries.formatDataForView("analysisByCountry",data));
					
					
					//Owen
			})
				// map = bus.publish('mapDiv','draw',model.data['analysisByCountry']);
		}
	},
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf manager.analysisByCountry
*/
	onAfterRendering: function() {
		console.log('analysisByCountry on after rendering');
		console.log($('#mapDiv'));

		console.log($("#analysisByCountry").height());

		console.log($("#analysisByCountry").width());

		jQuery.sap.require("util.uiFactory");
		jQuery.sap.require("model.data");

		var mapContainer = $("#mapDiv");
		var chartContainer = $("#chartDiv");
		//记录mouse click时鼠标的X 和Y
		mapContainer.on("click",function(evt){
			console.log(evt);
			clickedX = evt.pageX;
			clickedY = evt.pageY;
			var popoverHeight = $('#mapPopover').height()?$('#mapPopover').height():205;

			// console.log(popoverHeight);
			var correctTop = clickedY - popoverHeight/2;
			var correctLeft = clickedX+15;
			// alert('clicked outer');
			if(currentCountry){
				bus.publish('mapPopover','show',{
					top:correctTop,
					left:correctLeft,
					country:currentCountry,
					sale:currentSale,
					cost:currentCost
				})
			}
		});
		
		var analysisByCountryWidth = $("#analysisByCountry").width();
		var windowHeight = $(window).height();
		$("#main").css({
			"width":analysisByCountryWidth,
			"height":windowHeight*0.8
			// "height":"650px",
		});
		util.tools.autoSetContainerSize('mapDiv');
		util.tools.autoSetContainerSize('tablevbox');
		util.tools.autoSetContainerSize('chartDiv');
		mapContainer.css({
			"display":"block",
			"position":"relative",
		});
		chartContainer.css({
			// "display":"block",
			"position":"relative",
		});
		// console.log('!!!!!');
		// console.log(sap.ui.getCore().byId('sdgaetdradsf'));
		


		// if($('#mapDiv').length==0){
		// 	console.log('find div');
		// 	console.log($("mapDiv"));
		// 	if(){
		// 		console.log('drawing map');
		// 	}			
		// }

	},
	onDataReady:function(channelId,eventId,data){
		jQuery.sap.require('model.data');
		bus.publish('mapDiv','draw',data);
	//	console.log(data);
	//	console.log("here is on data ready:");
	//	console.log(model.data['analysisByCountry']);
		
	},
	

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf manager.analysisByCountry
*/
//	onExit: function() {
//
//	}

});

bus.subscribe('mapPopover','show',function(channelId,eventId,data){
	var country = data.country;
	var sale = data.sale;
	var cost = data.cost;
	var top = data.top;
	var left = data.left;
	var tmp = sap.ui.getCore().byId('main');
	util.uiFactory.createPopover(country,sale,cost).openBy(tmp);
	$('#mapPopover').css({
		"top":top,
		"left":left,
		"width":"200px"
	})
},this);
