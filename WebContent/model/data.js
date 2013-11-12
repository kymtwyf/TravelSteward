jQuery.sap.declare("model.data");

model.data = {
	numberBase:"2,000,000,000",//设置了1亿为基准100M,60M,20M,10M,1M
	colorMapping:{
		">100%":"RGB(183,44,52)",
		"80%~100%":"RGB(204,25,25)",
		"20%~80%":"RGB(204,25,25)",
		"1%~20%":"RGB(237,220,78)",
		"0~1%":"RGB(119,255,51)",
		defaultFill: '#EDDC4E'
	},

	///Fake 
	d:{"d":{"results":[{"__metadata": {"uri":"http://ld9415:8002/ta/TravelAnalysis/ta.xsodata/TRADATA('1')","type":"ta.odata.TRADATAType"},"COUN":"DEU","SALEAMOU":"18436460606.11","TRAEXP":"1894149787.47"},{"__metadata": {"uri":"http://ld9415:8002/ta/TravelAnalysis/ta.xsodata/TRADATA('2')","type":"ta.odata.TRADATAType"},"COUN":"GBR","SALEAMOU":"11381792311.15","TRAEXP":"877161840.33"},{"__metadata": {"uri":"http://ld9415:8002/ta/TravelAnalysis/ta.xsodata/TRADATA('3')","type":"ta.odata.TRADATAType"},"COUN":"IND","SALEAMOU":"20638591700.19","TRAEXP":"1920503741.03"},{"__metadata": {"uri":"http://ld9415:8002/ta/TravelAnalysis/ta.xsodata/TRADATA('4')","type":"ta.odata.TRADATAType"},"COUN":"JPN","SALEAMOU":"9373238441.62","TRAEXP":"1045294913.33"},{"__metadata": {"uri":"http://ld9415:8002/ta/TravelAnalysis/ta.xsodata/TRADATA('5')","type":"ta.odata.TRADATAType"},"COUN":"PRC","SALEAMOU":"26387565669.85","TRAEXP":"2365206774.58"},{"__metadata": {"uri":"http://ld9415:8002/ta/TravelAnalysis/ta.xsodata/TRADATA('6')","type":"ta.odata.TRADATAType"},"COUN":"RUS","SALEAMOU":"9319264281.16","TRAEXP":"714531615.71"},{"__metadata": {"uri":"http://ld9415:8002/ta/TravelAnalysis/ta.xsodata/TRADATA('7')","type":"ta.odata.TRADATAType"},"COUN":"USA","SALEAMOU":"22559870491.86","TRAEXP":"2149295834.98"}]}},
	fakeData:{
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
	},
	getFakeData:function(){
		var fills = this.colorMapping;
		var data = {};
		var resultSet = this.d.d.results;
		for(var i = 0 ; i < resultSet.length; i ++){
			var cost = resultSet[i].TRAEXP;
			var fillK ;
			if(cost>this.numberBase){
				fillK = ">100%";
			}else if(cost/this.numberBase >0.8){
				fillK = "80%~100%";
			}else if(cost/this.numberBase >0.2){
				fillK = "20%~80%";
			}else if(cost/this.numberBase >0.01){
				fillK = "1%~20%";
			}else {
				fillK = "0~1%";
			}
			data[resultSet[i].COUN] = {
				fillKey:fillK,
				cost : cost,
				sale : resultSet[i].SALEAMOU
			};
		}
		return {
			fills:fills,
			data:data
		}
		// console.log(fills);
		// console.log(data);
	},///FAKE




}
