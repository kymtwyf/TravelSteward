jQuery.sap.declare("util.uiFactory");
jQuery.sap.require('util.tools');

util.uiFactory = {
    create3dPieChart:function(sId,data){
        if($("#"+sId).length){
            $("#"+sId).empty();
            
        }
        util.tools.autoSetContainerSize(sId);

        var chartData = model.data['analysisByCountry'];//[{title:"Pie I have eaten",value:70},{title:"Pie I haven\'t eaten",value:30}];          
        var chart = new AmCharts.AmPieChart();
        chart.valueField = "TRAEXP";
        chart.titleField = "COUNAME";
        chart.dataProvider = chartData;
        chart.write("chartDiv");
    },
    createChartByMonth: function(sId,data){
    	var chartData = model.data['analysisBymonth'];
    	var Data = [];
    	var sumAmount = 0;
    	for(var i = 0; i<chartData.length; i++){
    		var DataItem = {
        			MONTH : null,
        			MONTHNAME : null,
        			BUDGET : null,
        			SALEAMOUNT: null,
        			OPEN: null,
        			CLOSE: null
        	};
    		DataItem.MONTH = chartData[i].MON;
    		DataItem.BUDGET = chartData[i].BUDG;
    		DataItem.SALEAMOUNT = chartData[i].TRAEXP;
    		DataItem.OPEN = sumAmount.toFixed(2);
    		console.log(sumAmount);
    		sumAmount = sumAmount + DataItem.SALEAMOUNT;
    		
    		DataItem.CLOSE = sumAmount.toFixed(2) ;
    		console.log(sumAmount);
    		switch (i) {
            case 0:
            	DataItem.MONTHNAME = "January";
                break;
            case 1:
            	DataItem.MONTHNAME = "February";
                break;
            case 2:
            	DataItem.MONTHNAME = "March";
                break;
            case 3:
            	DataItem.MONTHNAME = "April";
                break;
            case 4:
            	DataItem.MONTHNAME = "May";
                break;
            case 5:
            	DataItem.MONTHNAME = "June";
                break;
            case 6:
            	DataItem.MONTHNAME = "July";
                break;
            case 7:
            	DataItem.MONTHNAME = "August";
                break;
            case 8:
            	DataItem.MONTHNAME = "September";
                break;
            case 9:
            	DataItem.MONTHNAME = "Octomber";
                break;
    		
    		};
    		Data[i]=DataItem;
    	}
    	var temp = sumAmount + 25676799.79;
    	var DataItem11={
    			MONTH : 11,
    			MONTHNAME : "November",
    			BUDGET: 339149417 ,
    			SALEAMOUNT: 25676799.79,
    			OPEN: sumAmount.toFixed(2),
    			CLOSE: temp.toFixed(2),
    			"dashLengthColumn": 5,
    		    "alpha": 0.2,
    	};
		
    	Data[10]=DataItem11;

    	sumAmount = temp;
    	temp = sumAmount + 25676799.79;
    	var DataItem12={
    			MONTH : 12,
    			MONTHNAME : "December",
    			BUDGET: 339149417 ,
    			SALEAMOUNT: 25676799.79,
    			OPEN: sumAmount.toFixed(2),
    			CLOSE: temp.toFixed(2),
    			"dashLengthColumn": 5,
    		    "alpha": 0.2,
    	};
    	Data[11]=DataItem12;
    	
    	console.log(Data);
    	
    	console.log(">>>>>>>>>>>>>>>>>>>>>chartByMonth<<<<<<<<<<<<<<<<<<<<<<<");
    	var  chart = new AmCharts.AmSerialChart();
    	    chart.dataProvider = Data;
    	    chart.categoryField = "MONTH";
    	    chart.columnWidth = 0.6;
    	    chart.startDuration = 3;
    	    
    	    // AXES
    	    // Category
    	    var categoryAxis = chart.categoryAxis;
    	    categoryAxis.gridAlpha = 0.1;
    	    categoryAxis.axisAlpha = 0;
    	    categoryAxis.gridPosition = "start";
    	    
    	    // Value
    	    var valueAxis = new AmCharts.ValueAxis();
    	    valueAxis.gridAlpha = 0.1;
    	    valueAxis.axisAlpha = 0;
    	    chart.addValueAxis(valueAxis);
    	    
    	    // GRAPH                          
    	    var graph = new AmCharts.AmGraph();
    	    graph.valueField = "CLOSE";
    	    graph.openField = "OPEN";
    	    graph.type = "column";
    	    graph.lineAlpha = 1;
    	    graph.lineColor = "#1c8ceb";
    	    graph.fillAlphas = 0.8;
    	    graph.dashLengthField = "dashLengthColumn";
    	    graph.alphaField = "alpha";
    	    graph.balloonText = "<span style='color:#1c8ceb'>[[MONTHNAME]]</span><br><span style='font-size:15px;'><b>[[SALEAMOUNT]]RMB</b></span>";
    	    graph.labelText = "￥[[CLOSE]]";
    	    chart.addGraph(graph);
    	    
    	    // Trend lines used for connectors
    	    var trendLine = new AmCharts.TrendLine();
    	    trendLine.initialCategory = "1";
    	    trendLine.finalCategory = "12";
    	    trendLine.initialValue = 339149417;
    	    trendLine.finalValue = 339149417;
    	    trendLine.lineColor = "#000000";
    	    trendLine.dashLength = 10;
    	    trendLine.lineThickness = 3;
    	    chart.addTrendLine(trendLine);   
    	    
    	    // WRITE    
             chart.write(sId);
    },
    
    
    createChartByReason:function(sId,data){
    	var chartData = model.data['analysisByReason'];
    	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    	console.log(chartData);
    	console.log(sId);
    	
    	 var chart = new AmCharts.AmRadarChart();
    	    chart.dataProvider = chartData;
    	    chart.categoryField = "REA";
    	    chart.startDuration = 3;
    	       	    
    	    // VALUE AXIS
    	    var valueAxis = new AmCharts.ValueAxis();
    	    valueAxis.gridType = "circles";
    	    valueAxis.fillAlpha = 0.05;
    	    valueAxis.fillColor = "#000000";
    	    valueAxis.axisAlpha = 0.2;
    	    valueAxis.gridAlpha = 0;
    	    valueAxis.fontWeight = "bold";
    	    valueAxis.minimum = 0;
    	    chart.addValueAxis(valueAxis);
    	    
    	    // GRAPH
    	    var graph = new AmCharts.AmGraph();
    	    graph.lineColor = "#000000";
    	    graph.fillAlphas = 0.4;
    	    graph.bullet = "round";
    	    graph.valueField = "AMOU";
    	    graph.balloonText = "Cost on [[category]]: ￥[[AMOU]] ";
    	    chart.addGraph(graph);
    	    
    	    // GUIDES
    	    // blue fill
    	    var guide = new AmCharts.Guide();
    	    guide.angle = 225;
    	    guide.tickLength = 0;
    	    guide.toAngle = 315;
    	    guide.value = 0;
    	    guide.toValue = 14;
    	    guide.fillColor = "#0066CC";
    	    guide.fillAlpha = 0.6;
    	    valueAxis.addGuide(guide);
    	    
    	    // red fill
    	    guide = new AmCharts.Guide();
    	    guide.angle = 45;
    	    guide.tickLength = 0;
    	    guide.toAngle = 135;
    	    guide.value = 0;
    	    guide.toValue = 14;
    	    guide.fillColor = "#000000";
    	    guide.fillAlpha = 0.6;
    	    valueAxis.addGuide(guide);
    	    
    	    // WRITE                
    	    chart.write(sId);
    	
    	
    },
    createDataMap:function(sId,fills,data){
        console.log('画地图的数据');
        console.log(fills);
        console.log(data);
        if($("#"+sId).length){
            $("#"+sId).empty();
           
        }
        util.tools.autoSetContainerSize(sId);
        jQuery.sap.require("model.data");
		var map = new Datamap({
            element: document.getElementById(sId),
            scope:'world',
            projection:"mercator",
            fills:fills?fills:model.data.fakeData.fills,
            data:data?data:model.data.fakeData.data,
            geographyConfig: {
                popupTemplate: function(geo, data) {
                	currentCost = data?data.cost:0;
                	currentSale = data?data.sale:0;
                    return null;

                }
            },
            done: function(datamap) {
            	 
                datamap.svg.selectAll('.datamaps-subunit').on('click', function(geo) {
                	currentCountry = geo.properties.name;
                	// alert("clicked inner");
                	console.log('arguments');
                	console.log(arguments);
                });
                datamap.svg.selectAll('.datamaps-subunit').on('mouseleave', function(geo) {
                	console.log("geography is");
                	console.log(geo);//geo 有值，是上次留下的。。。
                	currentCountry = null;
                	currentCost = null;
                	currentSale = null;
                });
                // datamap.svg.selectAll('.datamaps-subunit').on('click', function(geo) {
                // 	currentCountry = geo.properties.name
                //     //alert(geography.properties.name);
                // });
                console.log('i am changing the z-index');
                $(".datamaps-legend").css({"z-index":0});                
            }
    	});
        map.legend();
        map.draw();
    	return map;
	},
	createPopover:function(sCountry,sSale,sCost){
		if(this.mapPopover){
			this.mapPopover.destroy();
		}

        jQuery.sap.require('util.tools');
		this.mapPopover = new sap.m.Popover("mapPopover",{                                                                                                        //popover
                title: "Detail",
                placement: sap.m.PlacementType.Right,
                content: [
                	new sap.m.List({
				        items: [
					        new sap.m.ObjectListItem({
					        	title:'Country:'+(sCountry?sCountry:"unknown"),
					            attributes:[
						            new sap.m.ObjectAttribute({
						              text : "Total Sale:"+(sSale?util.tools.formatNumberToBM(sSale.toString()):0)
						            }),
						            new sap.m.ObjectAttribute({
						              text : "Trip Cost:"+(sCost?util.tools.formatNumberToBM(sCost.toString()):0)
						            })
					            ]
					        }),		        
				        ]
		    		})            	
                ],
                footer: new sap.m.Bar({
                	contentMiddle:new sap.m.Button({
			            text: "ViewDetail",
			            icon: "sap-icon://drill-down",
			            press:function(){

			            }
	            	})
                }) 

                
        });

        return this.mapPopover;
	},
    getAnalysisObjectHeader:function(id){
        var tmp = sap.ui.getCore().byId(id);
        if(tmp){
            return tmp;
        }else{
            var objectStatus = new sap.m.ObjectStatus({
            text : "In Budget",
            state : "Success"
            });
            var attribute = new sap.m.ObjectAttribute({
              text : "Description"
            });
            var objectheader = new sap.m.ObjectHeader(id,{            
                  title:"This Year",
                  number : 0,
                  numberUnit : "USD",
                  firstStatus : objectStatus,
                  attributes:attribute
             });
            bus.subscribe("analysisHeader","update",function(channelId,eventId,data){
                /*
                data格式：
                data.title//Title 显示什么
                data.description//Title 下面的Description
                data.total//总金额
                data.currency//货币，例 USD
                data.budget//预算
                */

                if(!data){//没有 data你给我传个鸟啊
                    return null;
                }else {
                    var title = data.title;
                    var description = data.description;

                    var total = data.total;
                    var currency = data.currency;
                    var budget = data.budget;

                    if(title){
                        objectheader.setTitle(title);
                    }
                    if(description){
                        attribute.setText(description);
                    }
                    if(total){
                        jQuery.sap.require('util.tools');
                        var number = util.tools.formatNumber(total);
                        objectheader.setNumber(number);
                    }
                    if(currency){
                        objectheader.setNumberUnit(currency);
                    }
                    if(total && budget){
                        total = parseFloat(total);
                        budget = parseFloat(budget);
                        switch(total>budget){
                        case true: {
                            objectStatus.setText("Overspend");
                            objectStatus.setState("Error");
                            break;
                        }
                        case false: {
                            objectStatus.setText("In Budget");
                            objectStatus.setStatus("Success");
                            break;
                        }
                    }
                    }
                   
                }
            },this);
            return objectheader;
        }
    },
    
    showContainer:function(index){
        var ids = ['mapDiv','tablevbox','chartDiv'];
        for(var i = 0 ; i < ids.length; i++){
            console.log('showing container and hidding container');
            if(i==index){
                $('#'+ids[i]).css({"display":"block"});
            }else{
                $('#'+ids[i]).css({"display":"none"});
            }
            
        }
    },
    createTable:function(data){
    	
    	var tableChartData = {
			    items : data
			};
    	var tableChartModel= new sap.ui.model.json.JSONModel(tableChartData);
    	
    	var tableChart = sap.ui.getCore().byId('tableChart');
    	
    	var costCell = new sap.m.Text({
    		text: "{TRAEXP}"
    	});
    	
    	var saleCell = new sap.m.Text({
    		text:"{SALEAMOU}"
    	});
    	
    	var tableItemTemplate = new sap.m.ColumnListItem({
            cells: [
                    new sap.m.ObjectIdentifier({
                      title: "{COUNAME}"
                    }),
                    costCell,
                    saleCell
                  ]
        });
    	
		tableChart.setModel(tableChartModel);
		
		tableChart.bindAggregation("items", 
				{
					  path: "/items",
					  template: tableItemTemplate
				}
		);
		// create dialog
	    var tableDialog = new sap.m.ViewSettingsDialog({
	      title: "Ordered By",
	      sortItems : [
	        new sap.m.ViewSettingsItem({
	          text : "Country",
	          key : "COUNAME",
	          selected: true
	        }),
	        new sap.m.ViewSettingsItem({
	          text : "Cost",
	          key : "TRAEXP"
	        }),
	        new sap.m.ViewSettingsItem({
	          text : "Sales",
	          key : "SALEAMOU"
	        })
	      ],
	      
	      confirm : function (evt) {
	        var mParams = evt.getParameters();
	        var tableBinding = tableChart.getBinding("items");
	        
	        // apply sorter to binding
	        // (grouping comes before sorting)
	        var aSorters = [];
	        if (mParams.groupItem) {
	          var sPath = mParams.groupItem.getKey();
	          var bDescending = mParams.groupDescending;
	          var vGroup = mGroupFunctions[sPath];
	          aSorters.push(new sap.ui.model.Sorter(sPath, bDescending, vGroup));
	        }
	        var sPath = mParams.sortItem.getKey();
	        var bDescending = mParams.sortDescending;
	        aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
	        tableBinding.sort(aSorters);
	      }
	    });

	    // add a button to the table header for opening the dialog
	    tableChart.setHeaderToolbar(
	      new sap.m.Toolbar({
	        content: [
	          new sap.m.Button({
	            icon: "sap-icon://drop-down-list",
	            press: function () {
	            	tableDialog.open();
	            }
	          })
	        ]
	      })
	    );
		
    }

};
bus.subscribe('mapDiv','draw',function(channelId,eventId,data){
    util.uiFactory.createDataMap('mapDiv',data.fills,data.data);
    util.uiFactory.showContainer(0);
},this);
bus.subscribe('tableChart','draw',function(channelId,eventId,data){
    util.uiFactory.createTable(data);
    util.uiFactory.showContainer(1);
},this);
bus.subscribe('container','show',function(channelId,eventId,data){
    util.uiFactory.showContainer(data.index);
},this);
bus.subscribe('chartDiv','draw',function(channelId,eventId,data){    
    util.uiFactory.create3dPieChart('chartDiv');
    util.uiFactory.showContainer(2);
},this);
bus.subscribe('chartDivByMonth','draw',function(channelId,eventId,data){    
    util.uiFactory.createChartByMonth('chartDivByMonth');
},this);
bus.subscribe('chartDivByReason','draw',function(channelId,eventId,data){    
    util.uiFactory.createChartByReason('chartDivByReason');
},this);
