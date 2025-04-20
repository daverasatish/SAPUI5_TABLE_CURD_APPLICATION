sap.ui.define([ "sap/ui/core/mvc/Controller" , "sample/ZDEMO/model/formatter" ,
                    "sap/ui/model/json/JSONModel", "sap/m/MessageBox" ],  
  
function(Controller, formatter, JSONModel) {
	"use strict";
	return Controller.extend("sample.ZDEMO.controller.View1", {
		formatter:formatter,
		onInit: function(){
		 this.datamodel = this.getOwnerComponent().getModel(); // initialising var as global
		 this.d1 = new JSONModel();
		 this.readdata();
		},
		
		
		readdata: function(){
		//	var ofilter = new sap.ui.model.Filter(oFilterInfo);
			this.datamodel.read("/STUDENT_DATA_ENTITYSET" , {
				    //  filters:[ofilter]
			          success: function(oresponse){ 
			          	this.getView().setModel( new JSONModel(oresponse) );
			          }.bind(this)   });
		},
		
		onPress: function(oevent){
			var ocontext = oevent.getSource().getBindingContext().getObject();
				this.getView().setModel( new JSONModel(ocontext), "dummy" );
				
			       if(!this.odialog1){   	
			  this.loadFragment({ name: "sample.ZDEMO.fragments.update" }
			                 ).then(function(odialog){ 
			                 	this.odialog1 = odialog;
			                 	this.odialog1.open(); 
			                 }.bind(this));
			       }else{
			       	this.odialog1.open(); 
			       }
		},
		
		onCancel:function(){
			if(this.odialog1){
			this.odialog1.close(); 
		     } else if(this.odialog2){
			this.odialog2.close(); 
		     }
		},
		
		onDelete:function(odelete){
				var ocontext = odelete.getSource().getBindingContext().getObject();
					var z1 = ocontext.ID;
			       var that = this;
				
			 sap.m.MessageBox.confirm("Delete this record" , {
			 	title:"Action",
			 	onClose:function(oaction){ 
			 		
			 		if(oaction === 'OK'){
			 		
			 		 that.datamodel.remove("/STUDENT_DATA_ENTITYSET("+z1+")", {
			 	  success: function(oresponse){ sap.m.MessageToast.show("Deleted");
			 	  	that.readdata();
			 	  } }   );
			 			              
			
			   } },	actions:[ sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL ]
			 });
		},
		
	    onSave:function(){
	       	if(this.odialog1){
	    	 var NID = this.getView().byId("F1").getValue();
	    		    var newupdate = { };
	    		      newupdate.ID = NID
	    		      newupdate.NAME = this.getView().byId("F2").getValue();
	    		      newupdate.BRANCH = this.getView().byId("F3").getValue();
	    		 
	    		    	
	    			this.datamodel.update("/STUDENT_DATA_ENTITYSET("+NID+")", newupdate );
	  
			this.odialog1.close(); 
			
	       	} else if(this.odialog2){
	
	    		    var newcreate = { };
	    		      newcreate.ID = this.getView().byId("C1").getValue();
	    		      newcreate.NAME = this.getView().byId("C2").getValue();
	    		      newcreate.BRANCH = this.getView().byId("C3").getValue();
	    		    	
	    			this.datamodel.create("/STUDENT_DATA_ENTITYSET", newcreate );
	    				this.odialog2.close();
	       	}
	        
	       		this.readdata();
		},
		
		onCreate:function(odata){
				
			       if(!this.odialog2){   	
			  this.loadFragment({ name: "sample.ZDEMO.fragments.create" }
			                 ).then(function(odialog){ 
			                 	this.odialog2 = odialog;
			                 	this.odialog2.open(); 
			                 }.bind(this));
			       }else{
			       	this.odialog2.open(); 
			       }
			       
		
		}
	});
				     //  	var json =  new sap.ui.model.json.JSONModel(oresponse);
			          //	this.getView().byId("idata").setModel(json);
	
	  			//{ success: function(oresponse){}
			           //error:function(oerror){  console.error("Error", oerror); } console.log("success", oresponse);
			         //  });
});
								          	      //	json.setProperty("idata",oresponse.results );
			          	      //    this.getView().setModel(json);   or
			                 //  	this.getView().byId("idata").setModel(json);
			          //	this.d1 = json.results;
			//var datamodel = this.getOwnerComponent().getModel();
						        //   error:function(oerror){  console.error("success", oerror);			          	
			         //  console.log("success", oresponse); } 
		
     /*func1:function(id){ 
		var msg = "";
	  if(id > 0 ) {
		msg = "success";
	  } else {
	    msg = "Failure";
	  }
	  	return msg;
		}*/

	/*	Inputevent: function(){
			var a1 = this.getView().byId("i1").getValue();
			this.getView().byId("i2").setValue(a1);
		    sap.m.MessageBox.show("Event triggered");
		}  */
