var express = require('express');
var router = express.Router();

var EmpList = null;
/* GET testroutes listing. 
router.get('/', function(req, res, next) {
  res.send('test routes with nodemon');
});*/

/*var companyInfo = {
   employees : [{ "empId": 1, "name":"Adams","first":"Ansel","profession":"photographer","born" :"SanFrancisco"},
            { "empId": 2,"name":"Muir","first":"John","profession":"naturalist","born":"Scotland"},
            { "empId": 3 , "name":"Schwarzenegger","first":"Arnold","profession":"governator","born":"Germany"},
            { "empId": 4, "name":"Wellens","first":"Paul","profession":"author","born":"Belgium"}
]};*/


//DB Connectivity
/*var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/alok', function (err) { 
   if (err) throw err; 
   console.log('Successfully connected'); 
});*/
////////////////////////////

// Compile model from schema
/*var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String
});
var userModel = mongoose.model('UserModel', userSchema);
var vUser = new userModel({firstName: 'Alok', lastName:'Tiwari' });
 vUser.save(function (err) { //Save Data in DB
     if (err) console.log ('Error on save!')
     else console.log ('Data Save in DB')
    
});
userModel.find(function (err, items) { // Read Data
  if (err) return console.error(err);
  console.log(items);
})*/
///////////////////////////////////////////
/*var EmpSchema = mongoose.Schema({
  empId : String, 
  name : String, 
  first : String, 
  profession : String, 
  born : String    
});
var EmployeeModel = mongoose.model('Employee', EmpSchema);
EmployeeModel.find(function (err, items) { // Read Data
  if (err) return console.error(err);
  console.log(items);
})*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//Create Collection
/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
 var dbase = db.db("alok");
  dbase.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});*/

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbase = db.db("alok");
  dbase.collection("Employee").find({}).toArray(function(err, result) {  
    if (err) throw err;
    //console.log(result);
     EmpList = result;
    db.close();
  });
});

router.get('/', function(req, res, next) { 
    console.log(EmpList);
   res.render('index',{employees: EmpList});
  //res.render('index', { title: 'Express' });
});
/*
router.get('/', function(req, res, next) {
    db.collection('Employee').find({}).toArray(function(err,docs) {
        if(err) { console.error(err) }
        res.send(JSON.stringify(docs))  
});
});*/
module.exports = router;