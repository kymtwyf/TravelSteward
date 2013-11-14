sap.ui.controller("manager.analysisByCountry", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf manager.analysisByCountry
*/
	onInit: function() {
		console.log('analysisBycountry ON INIT');

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
		console.log('analysisByCountry onbeforeshow');
		console.log($('#mapDiv'));
		console.log($("#analysisByCountry").height());
		console.log($("#analysisByCountry").width());
		if(!model.data['analysisByCountry']){
			jQuery.when(util.queries.getDataForView('analysisByCountry'))
			.done(function(data){
					// bus.publish('mapDiv','draw',data);
					bus.publish("data","ready",data);

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
		bus.publish('mapDiv','draw',data);
		
		console.log("here is on data ready:");
		console.log(data.data);
		
		var model = new sap.ui.model.json.JSONModel(data.data);
		
		 var table = new sap.m.Table("table",{
		      columns: [
		        new sap.m.Column({
		          header: new sap.m.Label({text: "Country"})
		        }),
		        new sap.m.Column({
		          header: new sap.m.Label({text: "Cost"})
		        }),
		        new sap.m.Column({
		          header: new sap.m.Label({text: "Sales"})
		        })
		      ],
		      items: {
		        path: "/ProductCollection",
		        template: new sap.m.ColumnListItem({
		          cells: [
		            new sap.m.ObjectIdentifier({
		              title: "[A]",
		              text: "Country"
		            }),
		            new sap.m.Text({
		              text: "{cost}"
		            }),
		            new sap.m.Text({
		              text: "{sale}"
		            })
		          ]
		        })
		      }
		    });
		 
		 table.setModel(model);

		/*
		var table = sap.ui.getCore().byId('table');
		
		table.addColumn(new sap.m.Column({
	                      header: new sap.m.Label({text: "Country"})
	    	}));
		
		table.addColumn(new sap.m.Column({
		  		          header: new sap.m.Label({text: "Cost"})
			}));
		
		table.addColumn(new sap.m.Column({
		  		          header: new sap.m.Label({text: "Sales"})
		    }));
		
		var listItem = new sap.m.ColumnListItem({
	          cells: [
	            new sap.m.ObjectIdentifier({
	              title: "[A]",
	              text: "Country"
	            }),
	            new sap.m.Text({
	              text: "{cost}"
	            }),
	            new sap.m.Text({
	              text: "{sale}"
	            })
	          ]
	        })
		*/
		
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
