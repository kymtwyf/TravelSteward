jQuery.sap.declare("util.tools");

util.tools = {
			getRequireID:function(str){
				 var arr = str.split(".");
				 var id = arr[arr.length - 1];
				 return id;
			}
}

