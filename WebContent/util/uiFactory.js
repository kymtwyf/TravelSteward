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
                return ['<div class="hoverinfo"><strong>',
                		"Country:"+geo.properties.name,
                        "<br />Cost:"+cost ,
                        '</strong>',
                        '<button type="button">SBC</button></div>'].join('');

            }
        },
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geo) {
            	currentCountrySelection = geo.properties.name
                //alert(geography.properties.name);
            });
            datamap.svg.selectAll('.datamaps-subunit').on('mouseleave', function(geo) {
            	console.log("geography is");
            	console.log(geo);
            	currentCountrySelection = null
                
                //alert(geography.properties.name);
            });
            
        }
    	});
    	return map;
	}
}