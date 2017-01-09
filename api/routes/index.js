var router = require('express').Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'my_secret',
  userProperty: 'payload'
});

var profileCtrl = require('../controllers/profile');
var authCtrl = require('../controllers/authentication');

router.get('/profile', auth, profileCtrl.profileRead);
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

module.exports = router;