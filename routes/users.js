var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/app', function(req, res, next) {
  res.render('users/index', { title: 'User Management' });
});


module.exports = router;
