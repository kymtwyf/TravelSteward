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
                	currentCountry = geo.properties.name
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
    getAnalysisObjectHeader:function(){
        var tmp = sap.ui.getCore().byId("analysisHeader");
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
            var objectheader = new sap.m.ObjectHeader("analysisHeader",{            
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
                        var number = util.tools.formatNumber(total)
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
        var ids = ['mapDiv','table','chartDiv'];
        for(var i = 0 ; i < ids.length; i++){
            console.log('showing container and hidding container');
            if(i==index){
                $('#'+ids[i]).css({"display":"block"});
            }else{
                $('#'+ids[i]).css({"display":"none"});
            }
            
        }
    }

}
bus.subscribe('mapDiv','draw',function(channelId,eventId,data){
    util.uiFactory.createDataMap('mapDiv',data.fills,data.data);
},this);
bus.subscribe('container','show',function(channelId,eventId,data){
    util.uiFactory.showContainer(data.index);
},this);
bus.subscribe('chartDiv','draw',function(channelId,eventId,data){    
    util.uiFactory.create3dPieChart('chartDiv');
    util.uiFactory.showContainer(2);

},this);