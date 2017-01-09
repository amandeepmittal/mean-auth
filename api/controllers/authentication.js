var passport = require('passport');
var User = require('../models/users');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

exports.register = function (req, res, next) {
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(function (err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({"token": token});
  });
};

exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var token;
    if (err) {
      res.status(404);
      res.json(err);
      return;
    }
    // if user exists and found
    if(user) {
      token = user.generateJwt();
      res.status(200);
      res.json({"token": token});
    } else {
      // if user not found
      res.status(401);
      res.json(info);
    }
  })(req, res);
};