// Dependencies
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var passport = require('passport');

// Configuration

// db config
require('./api/models/dbconfig');
// passport config
require('./api/config/passport');

var app = express();
var port = process.env.PORT || 3000;
var api = require('./api/routes/index');

// Middleware Functions
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(passport.initialize());

// routes
app.use('/api/', api);

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// Error Handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// UnauthorizedError:
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler, will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Bootstrap app
app.listen(port, function () {
  console.log('Server running at ' + port);
});

module.exports = app;