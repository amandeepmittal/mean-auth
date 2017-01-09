var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email'
  }, function(username, password, done) {
      User.findOne({email: username}, function(err, user){
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'password is wrong'
          });
        }
        // if credentials match/correct, return user object
        return done(null, user);
      });
  }
));