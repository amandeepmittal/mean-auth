var mongoose = require('mongoose');
var dbURI = 'mongodb://user123:user123@ds159328.mlab.com:59328/mean-auth';

mongoose.connect(dbURI);

// Mongoose Connection Events
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

require('./users');