var fs = require('fs');
var uscore = require("underscore");

var commonmethods = {
readFile : function(cb) {
	fs.readFile('./data/login.data', function (err, content) {
		if (err) 
		cb(err,undefined);
		
		var data = JSON.parse(content.toString());
		cb(undefined,data.users);
	  });	 
},
writeFile : function(user, cb) {
	fs.readFile('./data/login.data', function (err, content) {
		if (err)  	
		cb(err,undefined);

		var data = JSON.parse(content.toString());		
		var users = data.users;	
	 var filterdata = uscore.where(data.users, {id: user.id});
	   if(filterdata.length == 0){
		  data.users.push(user);	
		fs.writeFile('./data/login.data', JSON.stringify(data), function (err) {
		  if (err)
		   cb(err,undefined);

		   cb(undefined,"success");
		})
	  }  
	   else{  cb(undefined,"exist"); } 
	  })
},
ValidateLogin : function(user,cb) {
	fs.readFile('./data/login.data', function (err, content) {
	   if (err) 
		cb(err,undefined)		 
	
		var data = JSON.parse(content.toString());  
	    var filterdata = uscore.where(data.users, {id: user.id, password:user.password});
			//res.render('loginuser', { items: filterdata});
			if(filterdata.length > 0)
			 cb(undefined,filterdata);
			 else
			 cb(undefined,'notfound');		
		  });
	
},
CheckAvaialbility : function(user,cb) {
	fs.readFile('./data/login.data', function (err, content) {
	   if (err) 
		cb(err,undefined)		 
	
		var data = JSON.parse(content.toString());  
	    var filterdata = uscore.where(data.users, {id: user.id});
			//res.render('loginuser', { items: filterdata});
			if(filterdata.length > 0)		
			 cb(undefined,'found');			
			 else
			 cb(undefined,'notfound');
			 
		  });	
}
} //End

module.exports = commonmethods;