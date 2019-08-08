/**  ../routes/articles.js
 *  * 
 *  module to provide primary (non-API) routing for the articles 
 * 
 *  2019-08-02 - verified code against Chad's functioning 
 *     code to correct my errors
 * 
 * 
*/
var express = require('express');
var router = express.Router();
var Articles = require('../models/articles');
var today = new Date();

/** GET all articles */
router.get('/app', function(req, res, next) {
  console.log('-------    in routes articles.js - articles/app');
  res.render('articles/app', { title: 'Article Management' });

});

/** GET one article  */
router.get('/', function(req, res, next) {
  Articles.find({},function(err, articles){
    console.log('     --- in routes articles.js - get one article');
    console.log( articles);
    if(err)
    {
      return handleError(err);
    }
      return res.render('articles/index', { title: 'Blog' , articles:articles});
  });
});

/** GET an article by it's slug  */
router.get('/view/:slug', function(req, res, next) {
  console.log('     --- in routes articles.js - get by slug');
    
  Articles.findOne({slug:req.params.slug},function(err, articles){

    if(err)
    {
      return handleError(err);
    }
    else{
      return res.render('articles/view', { title: 'Post' , article:articles});
    }
  });
});


module.exports = router;

