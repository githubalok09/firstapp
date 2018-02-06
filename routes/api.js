var express = require('express');
var app = express.Router();
var logindata = require('./logindata.json');
var fs = require('fs');
var uscore = require("underscore");

app.get('/users/list', function (req, res, next) {
  //res.render('loginuser', { items : logindata.loginusers});
  fs.readFile('./data/login.data', function (err, content) {
    if (err) throw err;
    var data = JSON.parse(content.toString());  
    res.render('loginuser', { items: data.users});
  });
});
app.get('/users/registration', function (req, res, next) {
  res.render('registration');
});
app.get('/users/login', function (req, res, next) {
  res.render('login');
});
app.post('/users/valdiatelogin', function (req, res, next) {
  fs.readFile('./data/login.data', function (err, content) {
    if (err) throw err;
    var data = JSON.parse(content.toString());  
    var id = req.body.id;
    var pwd = req.body.password;
    var filterdata = uscore.where(data.users, {id: id, password:pwd});
    res.render('loginuser', { items: filterdata});
  });
});
app.post('/users/add', function (req, res, next) {
 // console.log("called post");
  fs.readFile('./data/login.data', function (err, content) {
    if (err) throw err;
    var data = JSON.parse(content.toString());
    //console.log(data);
    var users = data.users;
    var user = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    var id = req.body.id;
    var filterdata = uscore.where(data.users, {id: id});
   if(filterdata.length == 0){
    data.users.push(user);

    fs.writeFile('./data/login.data', JSON.stringify(data), function (err) {
      if (err) throw err
      else res.redirect('/api/users/list');
    })
  }  
  else{ res.send('Login id exist !!') } 
  })
});


module.exports = app;