sap.ui.controller("travelsteward.homePage", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf travelsteward.homePage
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf travelsteward.homePage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf travelsteward.homePage
*/
	onAfterRendering: function() {
		// console.log("offset is ");
		// $("#ObjectHeader").offset();
		// this.generateBullet();
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf travelsteward.homePage
*/
//	onExit: function() {
//
//	},
	
	updateObjectHeader: function(number,numberunit,objectheader){
		number=parseFloat(number); //获取小数型数据
		number+="";
		if(number.indexOf(".")==-1) 
			number+=".0";//如果没有小数点，在后面补个小数点和0
		if(/\.\d$/.test(number)) 
			number+="0"; //正则判断
		while(/\d{4}(\.|,)/.test(number))  
			//符合条件则进行替换
			number=number.replace(/(\d)(\d{3}(\.|,))/,"$1,$2");
			//每隔3位添加一个	 
		objectheader.setNumber(number);
		objectheader.setNumberUnit(numberunit);
	},
	generateBullet:function(){
	    // bullet chart is a simple serial chart
	    chart = new AmCharts.AmSerialChart();
	    chart.dataProvider = this.getBulletChartData();
	    chart.categoryField = "category";
	    chart.rotate = true; // if you want vertical bullet chart, set rotate to false
	    chart.columnWidth = 1;
	    chart.startDuration = 1;
	    
	    
	    // AXES
	    // category
	    categoryAxis = chart.categoryAxis;
	    categoryAxis.gridAlpha = 0;
	    
	    // value
	    valueAxis = new AmCharts.ValueAxis();
	    valueAxis.maximum = 100;
	    valueAxis.minimum = 0;
	    valueAxis.axisAlpha = 1;
	    valueAxis.gridAlpha = 0;
	    chart.addValueAxis(valueAxis);
	    
	    
	    
	    // this graph displays the short dash, which usually indicates maximum value reached.
	    graph = new AmCharts.AmGraph();
	    graph.valueField = "limit";
	    graph.lineColor = "#ffffff";
	    graph.type = "step";
	    graph.noStepRisers = true;
	    graph.lineAlpha = 1;
	    graph.lineThickness = 3;
	    graph.columnWidth = 0.5;
	    graph.stackable = false;
	    chart.addGraph(graph);
	    
	    // this is the "bullet" graph - black bar showing current value
	    graph = new AmCharts.AmGraph();
	    graph.valueField = "bullet";
	    graph.lineColor = "#ffffff";
	    graph.type = "column";
	    graph.lineAlpha = 1;
	    graph.fillAlphas = 1;
	    graph.columnWidth = 0.3; // this makes it narrower than color graph
	    graph.clustered = false; // this makes the trick - one column above another
	    chart.addGraph(graph);	    
	    
	    // this is the color range graph.
	    // we use only one graph here (not like in the first example, and set gradient fill)
	    graph = new AmCharts.AmGraph();
	    graph.valueField = "full";
	    graph.showBalloon = false;
	    graph.type = "column";
	    graph.lineAlpha = 0;
	    graph.fillAlphas = 0.8;
	    graph.fillColors = ["#19d228", "#f6d32b", "#fb2316"];
	    graph.gradientOrientation = "horizontal";
	    chart.addGraph(graph); 
	    var container = $("#bulletContainer");
	    container.css({"display":"inline",
	    				"width":"500px",
	    				"height":"72px",
	    				"position":"absolute",
	    				"top":"64px",
	    				"left":'40%',
	    				"z-index":"2"
	    				});
	    chart.write("bulletContainer");
//	    $("#ManagerPage").append("")
	},
	getBulletChartData:function(){
		return [
		        {
		            "category": "Evaluation",
		            "excelent": 20,
		            "good": 20,
		            "average": 20,
		            "poor": 20,
		            "bad": 20,
		            "limit": 78,
		            "full": 100,
		            "bullet": 65
		        }
		    ];
		
	}

});