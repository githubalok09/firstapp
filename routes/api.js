var express = require('express');
var app = express.Router();
var logindata = require('./logindata.json');
var fs = require('fs');
var uscore = require("underscore");

var commonmethods = require('../lib/commonHelper.js');

app.get('/users/list', function (req, res, next) {
  commonmethods.readFile(function(err,data){
    if (err)
      res.json({status: 'ERROR',error:err});
     else
     res.render('loginuser', { items: data});
  });
});
app.get('/users/loginidavailbility/:id', function (req, res, next) {
  var user = {
    id: req.params.id,
   };   
   commonmethods.CheckAvaialbility(user,function(err,data){
    if (err)
      res.json({status: 'ERROR',error:err});
     else{
       //console.log(data);
       if(data == 'notfound')       
        res.json({status:'notfound', info:'Login Id is available'});      
       else     
        res.json({status:'found', info:'Login id in use, please try with new login id !!'});       
     }
   });   
});  
app.get('/users/registration', function (req, res, next) {
  res.render('registration');
});
app.get('/users/login', function (req, res, next) {
  res.render('login');
});
app.post('/users/add', function (req, res, next) {
  var user = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }; 
  commonmethods.writeFile(user,function(err,data){
    if (err)
      res.json({status: 'ERROR',error:err});
     else
     {
       if(data=='success')
         res.redirect('/api/users/list');
       else
        res.json({status: 'info',info:'Record exist, please try new user id!!'});
     }  
  });
}); 
app.post('/users/valdiatelogin', function (req, res, next) {
  var user = {
    id: req.body.id,   
    password: req.body.password
  };
  commonmethods.ValidateLogin(user,function(err,data){
    if (err)
      res.json({status: 'ERROR',error:err});
     else{
       if(data == 'notfound')
       res.json({status: 'INFO',info:'Login Id not found in record !!'});
       else      
       res.render('loginuser', { items: data});
     }
   });   
});

module.exports = app;