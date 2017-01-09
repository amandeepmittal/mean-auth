var User = require('../models/users');

exports.profileRead = function (req, res, next) {
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function (err, user) {
        res.status(200).json(user);
      });
  }
};