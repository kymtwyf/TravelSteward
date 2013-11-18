sap.ui.controller("manager.analysis", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf manager.analysis
*/
	onInit: function() {
		bus.subscribe('bullet','draw',this.drawBullet,this);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf manager.analysis
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf manager.analysis
*/
	onAfterRendering: function() {
		jQuery.sap.require('model.data');
		var screenWidth = 1024;
		var screenHeight = $(window).height();
		$('#analysisByDepartment-mapDiv').css({
			"width":screenWidth,
			"height":screenHeight*0.8,
			"display":"block"
		});

		if(!model.data['analysisByDepartment']){
			jQuery.ajax({
			url:"http://ld9415.wdf.sap.corp:8002/ta/TravelAnalysis/xsjs/getBudget.xsjs?callback=123&year=2013",
			dataType: "jsonp",
			success:function(data){
				console.log('get the data!!!!!!!!!!');
				model.data['analysisByDepartment'] = data;
				bus.publish('bullet','draw');
				//d.resolve(data.d.results);//;autil.queries.formatDataForView(sId,data.d.results));
				// this.drawBullet();
			}
		});
		}else{
				bus.publish('bullet','draw');
				

		}

	},
	drawBullet:function(){//d.results
		jQuery.sap.require('model.data');
		var data = model.data['analysisByDepartment'].d.results;
		var realData = [];
		for(var i = 0 ; i < data.length; i ++){
			var cell = {};
			cell.department = data[i].DEPA,
			cell.realSpend = (data[i].TRAEXP/data[i].BUDG).toFixed(2);
			cell.estimate = (cell.realSpend*0.2).toFixed(2);
			if(cell.realSpend>1){
				cell["color"] = "#FF0F00";
			}else if(cell.realSpend>0.85){
				cell["color"] = "#FF6600";
			}else if(cell.realSpend>0.8){
				cell["color"] = "#FCD202";
			}else {
				cell["color"] = "#04D215";
			}
			realData.push(cell);
		}
		for(var i = 0 ; i < realData.length ; i ++){
			console.log("i");
			console.log(i);
			console.log(realData);
			// var index = i;
			for(var j = 1 ;j < realData.length ; j ++){
				if(realData[j].realSpend > realData[j-1].realSpend){
					console.log('changing');
					var tmp = realData[j];
					realData[j] = realData[j-1];
					realData[j-1] = tmp;
				}
			}

		}
		
		 chart = new AmCharts.AmSerialChart();
		    chart.dataProvider = realData;
		    chart.categoryField = "department";
		    chart.startDuration = 2;
		    
		    // AXES
		    // category
		    var categoryAxis = chart.categoryAxis;
		    categoryAxis.labelRotation = 45; // this line makes category values to be rotated
		    categoryAxis.gridAlpha = 0;
		    categoryAxis.fillAlpha = 1;
		    categoryAxis.fillColor = "#FAFAFA";
		    categoryAxis.gridPosition = "start";
		    
		    // value
		    var valueAxis = new AmCharts.ValueAxis();
		    valueAxis.stackType = "regular";
		    valueAxis.dashLength = 5;
		    valueAxis.axisAlpha = 0;
		    valueAxis.maximum = 1.2;
		    valueAxis.minimum = 0;
		    chart.addValueAxis(valueAxis);
		    
		    // GRAPH
		    var graph = new AmCharts.AmGraph();
		    graph.valueField = "realSpend";
		    graph.colorField = "color";
		    graph.balloonText = "<b>[[category]]: [[value]]</b>";
		    graph.type = "column";
		    graph.columnWidth = 0.6;
		    graph.lineAlpha = 0;
		    graph.fillAlphas = 1;
		    chart.addGraph(graph);
		    

		    graph = new AmCharts.AmGraph();
		    graph.valueField = "estimate";
		    graph.type = "column";
		    graph.lineAlpha = 0;
		    graph.fillAlphas = 0.5;
		    graph.columnWidth = 0.6;

		    graph.colorField = "color";		    
		    // graph.lineColor = "[[color]]";
		    // graph.balloonText = "<span style='color:#555555;'>[[category]]</span><br><span style='font-size:14px'>[[title]]:<b>[[value]]</b></span>";
		    chart.addGraph(graph);


		    // CURSOR
		    var chartCursor = new AmCharts.ChartCursor();
		    chartCursor.cursorAlpha = 0;
		    chartCursor.zoomable = false;
		    chartCursor.categoryBalloonEnabled = false;
		    chart.addChartCursor(chartCursor);
		    
		    
		    // WRITE
		    chart.write("analysisByDepartment_chart");
		// for(var i  = 0 ; i < data.length; i ++){
		// 	var j = i+1;
		// 	var chart = new AmCharts.AmSerialChart();
		//     chart.dataProvider = chartData;
		//     chart.categoryField = "category";
		//     chart.rotate = false; // if you want vertical bullet chart, set rotate to false
		//     chart.columnWidth = 1;
		//     chart.startDuration = 1;
		    
		    
		//     // AXES
		//     // category
		//     categoryAxis = chart.categoryAxis;
		//     categoryAxis.gridAlpha = 0;
		    
		//     // value
		//     valueAxis = new AmCharts.ValueAxis();
		//     valueAxis.maximum = 100;
		//     valueAxis.minimum = 0;
		//     valueAxis.axisAlpha = 1;
		//     valueAxis.gridAlpha = 0;
		//     chart.addValueAxis(valueAxis);
		    
		    
		    
		//     // this graph displays the short dash, which usually indicates maximum value reached.
		//     graph = new AmCharts.AmGraph();
		//     graph.valueField = "limit";
		//     graph.lineColor = "#000000";
		//     graph.type = "step";
		//     graph.noStepRisers = true;
		//     graph.lineAlpha = 1;
		//     graph.lineThickness = 3;
		//     graph.columnWidth = 0.5;
		//     graph.stackable = false;
		//     chart.addGraph(graph);
		    
		//     // this is the "bullet" graph - black bar showing current value
		//     graph = new AmCharts.AmGraph();
		//     graph.valueField = "bullet";
		//     graph.lineColor = "#000000";
		//     graph.type = "column";
		//     graph.lineAlpha = 1;
		//     graph.fillAlphas = 1;
		//     graph.columnWidth = 0.3; // this makes it narrower than color graph
		//     graph.clustered = false; // this makes the trick - one column above another
		//     chart.addGraph(graph);	    
		    
		//     // this is the color range graph.
		//     // we use only one graph here (not like in the first example, and set gradient fill)
		//     // graph = new AmCharts.AmGraph();
		//     // graph.valueField = "full";
		//     // graph.showBalloon = false;
		//     // graph.type = "column";
		//     // graph.lineAlpha = 0;
		//     // graph.fillAlphas = 0.8;
		//     // graph.fillColors = ["#19d228", "#f6d32b", "#fb2316"];
		//     // graph.gradientOrientation = "vertical";
		//     // chart.addGraph(graph);   
					
		//     console.log('analysisByDepartment_'+j);
		//     // WRITE
		//     chart.write("analysisByDepartment_"+j);
		// }
		
	}
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf manager.analysis
*/
//	onExit: function() {
//
//	}

});