sap.ui.define([], function () {
	"use strict";
	
	return {
 	func1:function(id){ 
		var msg = "";
	  if(id > 0 ) {
		msg = "success";
	  } else {
	    msg = "Failure";
	  }
	  	return msg;
		} 
		
	};
});
