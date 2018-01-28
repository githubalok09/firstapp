var express = require('express');
var router = express.Router();
var uscore = require("underscore");


/* GET home page. */
var companyInfo = {
   employees : [{ "empId": 1, "name":"Adams","first":"Ansel","profession":"photographer","born" :"SanFrancisco"},
            { "empId": 2,"name":"Muir","first":"John","profession":"naturalist","born":"Scotland"},
            { "empId": 3 , "name":"Schwarzenegger","first":"Arnold","profession":"governator","born":"Germany"},
            { "empId": 4, "name":"Wellens","first":"Paul","profession":"author","born":"Belgium"}
]};

//DB Connectivity
var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/alok', function (err) { 
   if (err) throw err; 
   console.log('Successfully connected'); 
});
var EmpSchema = mongoose.Schema({
  empId : Number, 
  name : String, 
  first : String, 
  profession : String, 
  born : String    
});
var EmployeeModel = mongoose.model('Employee', EmpSchema, 'Employee');
//DB Connectivity

router.get('/', function(req, res, next) {
  res.render('index', companyInfo);
  //res.render('index', { title: 'Express' });
});
router.get('/empDetail/:empId', function(req, res, next) {
// var comInfo = JSON.parse(companyInfo);
//console.log(comInfo);
var id = parseInt(req.params.empId);
var empdetails = uscore.where(companyInfo.employees, {empId: id})[0];
  res.render('empDetail',empdetails);
 // res.send(req.params.empId)
  //res.send(empdetails)
});
router.get('/create', function(req, res, next) {
 res.render('create');
});

router.post('/save', function(req, res) {
 // console.log(req.body.first, +' '+ req.body.name);
  new EmployeeModel({
    empId :  101,
    first : req.body.first,
    name : req.body.name,  
    profession : req.body.profession ,
    born : 'Delhi'
	}).save(function(err, doc){
		if(err){ 
      console.log(err);
      res.json(err);
    }
		else    res.send('Successfully inserted!');
	});

});

/*router.post('/save', function(req, res, next) {
 // res.setHeader('Content-Type', 'application/json');
 // console.log('save route');
 //console.log(req.body);
 var empdata=req.body;
 empdata.empId=companyInfo.employees.length +1;
 empdata.born="new delhi";
 companyInfo.employees.push(empdata);
 res.render('index', companyInfo);
 //res.send(companyInfo.employees);
});*/
module.exports = router;
