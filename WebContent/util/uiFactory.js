jQuery.sap.declare("util.uiFactory");

util.uiFactory = {
	createDataMap:function(sId){
		var map = new Datamap({
        element: document.getElementById(sId),
        scope:'world',
        projection:"mercator",
        fills: {
            'USA': '#1f77b4',
	        'RUS': '#9467bd',
	        'PRK': '#ff7f0e',
	        'PRC': '#2ca02c',
	        'IND': '#e377c2',
	        'GBR': '#8c564b',
	        'FRA': '#d62728',
	        'PAK': '#7f7f7f',
	        defaultFill: '#EDDC4E'
        },
        data: {
            'RUS': {fillKey: 'RUS',cost:123576},
	        'PRK': {fillKey: 'PRK',cost:1235761},
	        'PRC': {fillKey: 'PRC',cost:1235762},
	        'IND': {fillKey: 'IND',cost:1235763},
	        'GBR': {fillKey: 'GBR',cost:1235756},
	        'FRA': {fillKey: 'FRA',cost:1235766},
	        'PAK': {fillKey: 'PAK',cost:1237576},
	        'USA': {fillKey: 'USA',cost:1283576}
        },

        geographyConfig: {
            popupTemplate: function(geo, data) {
            	var cost = data?data.cost:0;            	
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
            $(".datamaps-legend").css({"z-index":0});

            
        }
    	});
    	return map;
	},
	createPopover:function(sCountry,sSale,sCost){
		if(this.mapPopover){
			this.mapPopover.destroy();
		}
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
						              text : "Total Sale:"+(sSale?sSale:0)
						            }),
						            new sap.m.ObjectAttribute({
						              text : "Trip Cost:"+(sCost?sCost:0)
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
                        var number=parseFloat(total); //获取小数型数据
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
    


}