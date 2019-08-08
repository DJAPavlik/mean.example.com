//  ../routes/users.js

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/app', function(req, res, next) {
  console.log('     - IN USER.JS - before user/app call');
  res.render('users/app', { title: 'User Management' });
});

module.exports = router;
