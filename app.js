var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var User = require('./schemas/User');
var dbInit = require('./middlewares/dbInit').dbInit;
var authenticate = require('./middlewares/authenticate').authenticate;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

dbInit()
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
  "secret": 'secretString',
  "cookie": {
    "maxAge": 186000000,
  },
  "path": "/",
}))

app.use('/users', users);
app.use(authenticate);
app.get('/dashboard', (req, res)=>{
    console.log(req.session);
    User.findOne({emailId: req.session.emailId}, (err, user)=>{
        res.render('dashboard', {user});
    })
});
app.get('/logout', function(req, res){
    req.session.emailId = null;
    res.redirect('/users/login');
})
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
