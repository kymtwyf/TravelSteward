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
    	    // SERIAL CHART  
    	    var chart = new AmCharts.AmSerialChart();
    	    chart.dataProvider = chartData;
    	    chart.categoryField = "MON";
    	    chart.startDuration = 2;

    	    // AXES
    	    // category
    	    var categoryAxis = chart.categoryAxis;
    	    categoryAxis.gridPosition = "start";

    	    // value
    	    var valueAxis = new AmCharts.ValueAxis();
    	    valueAxis.axisAlpha = 0;
    	    chart.addValueAxis(valueAxis);

    	    // GRAPHS
    	    // column graph
    	    var graph1 = new AmCharts.AmGraph();
    	    graph1.type = "column";
    	    graph1.title = "Sale Amount";
    	    graph1.lineColor = "#a668d5";
    	    graph1.valueField = "AMOU";
    	    graph1.lineAlpha = 1;
    	    graph1.fillAlphas = 1;
    	    graph1.dashLengthField = "dashLengthColumn";
    	    graph1.alphaField = "alpha";
    	    graph1.balloonText = "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>";
    	    chart.addGraph(graph1);
    	    
    	    // line
    	    var graph2 = new AmCharts.AmGraph();
    	    graph2.type = "line";
    	    graph2.title = "Cost Amount";
    	    graph2.lineColor = "#fcd202";
    	    graph2.valueField = "AMOU";
    	    graph2.lineThickness = 10;
    	    graph2.bullet = "round";
    	    graph2.bulletBorderThickness = 3;
    	    graph2.bulletBorderColor = "#fcd202";
    	    graph2.bulletBorderAlpha = 1;
    	    graph2.bulletColor = "#ffffff";
    	    graph2.dashLengthField = "dashLengthLine";
    	    graph2.balloonText = "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>";
    	    chart.addGraph(graph2);
    	    
    	    // LEGEND                
    	    var legend = new AmCharts.AmLegend();
    	    legend.useGraphSettings = true;
    	    chart.addLegend(legend);

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