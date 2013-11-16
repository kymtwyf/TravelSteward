jQuery.sap.declare("util.queries");
jQuery.sap.require('model.data');
jQuery.sap.require('util.tools');


util.queries = {
	getDataForView:function(sId){//model.data[sId]
	/*
		analysisByCountry:
			->fills
			->data
		*/

		var d = jQuery.Deferred();
		switch(sId){
			case 'analysisByCountry':{
				// util.tools._F_Toast("Getting data from server");
				jQuery.ajax({
					url:"http://ld9415.wdf.sap.corp:8002/ta/TravelAnalysis/xsjs/getWorldSaleAndTraExp.xsjs?callback=123&year=2013",
					dataType: "jsonp",
					error:function(){
						d.reject();
						// util.tools.__F_Toast("Some error occurred when querying, please check the network and try again");
					},
					success:function(data){
						//现在用odata取，所以用data.d.results
						
						//console.log('woyhijindsifisdfjsdjf');
						d.resolve(data.d.results);//;autil.queries.formatDataForView(sId,data.d.results));

					}
				})
				
				break;
			};
			case 'analysisBymonth':{
				// util.tools._F_Toast("Getting data from server");
				jQuery.ajax({
					url:"http://ld9415.wdf.sap.corp:8002/ta/TravelAnalysis/xsjs/getMons.xsjs?year=2013&depa=Sale",
					dataType: "jsonp",
					error:function(){
						d.reject();
						// util.tools.__F_Toast("Some error occurred when querying, please check the network and try again");
					},
					success:function(data){
						//现在用odata取，所以用data.d.results
						//console.log('woyhijindsifisdfjsdjf');
						d.resolve(data.d.results);//;autil.queries.formatDataForView(sId,data.d.results));

					}
				})
				
				break;
			};
		}

		return d.promise();

	},

	formatDataForView:function(sId,resultSet){
		console.log("formatting data");
		console.log(resultSet);
		switch(sId){
			case 'analysisByCountry':{
				var fills = model.data.colorMapping;
				var data = {};
				for(var i = 0 ; i < resultSet.length; i ++){
					var cost = resultSet[i].TRAEXP;
					var fillK ;
					console.log('cost is');
					console.log(cost);
					console.log('numberBase');
					console.log(model.data.numberBase);
					if(cost>model.data.numberBase){
						fillK = ">100%";
					}else if(cost/model.data.numberBase >0.8){
						fillK = "80%~100%";
					}else if(cost/model.data.numberBase >0.2){
						fillK = "20%~80%";
					}else if(cost/model.data.numberBase >0.01){
						fillK = "1%~20%";
					}else {
						fillK = "0~1%";
					}
					data[resultSet[i].COUID] = {
						fillKey:fillK,
						cost : cost,
						sale : resultSet[i].SALEAMOU
					};
				}
				console.log('the fills  I get');
				console.log(fills);
				return {
					fills:fills,
					data:data
				}

				break;
			}

		}
	}
}
