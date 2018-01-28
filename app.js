var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var testroutes = require('./routes/testroutes');
var users = require('./routes/users');

var app = express();
var db = null;
//DB Connectivity
/*mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;*/
/*db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});*/

/*var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/alok', function(err,database) {
    if(err) { console.error(err) }
    console.log('connected');
    db = database // once connected, assign the connection to the global variable
})*/

// view engine setup
var exphbs = require('express-handlebars');
app.engine('hbs', exphbs({defaultLayout: 'default',extname: '.hbs'})); 
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/testroutes',testroutes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
