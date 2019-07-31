//  ../routes/api/users.js

var express = require('express');
var router = express.Router();
var Users = require('../../models/users');

router.get('/', function(req, res, next) {
  Users.find({},function(err, users){
    if(err){
     return res.json({'success':false, 'error': err});
   }
    return res.json({'success':true, 'users': users});
  });
}); // end - router.get '/'

router.get('/:userId', function(req,res){

  var userId = req.params.userId;
   Users.findOne({'_id':userId}, function(err, user){
     if(err){
      return res.json({'success':false, 'error': err});
    }
     return res.json({'success':true, 'user': user});
   });
 }); // END - router.get '/:userid'

 router.post('/create', function(req, res) {
  var data = req.body

  Users.create(new Users({
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }), 
    data.password,
    function(err, user){

    if(err){
      return res.json({success: false, user: req.body, error: err});
    }

    return res.json({success: true, user: user});

  });
}); // END router.post - /create


router.post('/', function(req, res) {
  var data = req.body;

  Users.create(new Users({
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }),
  
    
    function(err, user){

      if(err){
        return res.json({success: false, user: req.body, error: err});
      }

      return res.json({success: true, user: user});

    } ); 
}); // END router.post - / 

router.put('/', function(req, res){

  Users.findOne({'_id': req.body._id}, function(err, user){

   if(err) {
     return res.json({success: false, error: err});
   }

   if(user) {

    let data = req.body;

    if(data.username){
      user.username = data.username;
    };

    if(data.email){
    user.email = data.email;
    };

    if(data.first_name){
    user.first_name = data.first_name;
    };

    if(data.last_name){
    user.last_name = data.last_name;
    };

    user.save(function(err){
      if(err){
        return res.json({success: false, error: err});
      }else{
        return res.json({success: true, user:user});
      }
    });

   } // end if(user)

  });

});  // end router.put

router.delete('/:userId', function(req,res){

  var userId = req.params.userId;

  Users.remove({'_id':userId}, function(err,removed){

    if(err){
      return res.json({success: false, error: err});
    }

    return res.json({success: true, status: removed});

  }); // end users.remove

});  // end router.delete

module.exports = router;
