/**
 * Created by Andrew Kralovec 
 */
var express = require('express');
var router = express.Router();
var app = express(); 
// Will add :username
router.get('/', function (req, res, next) {
    res.render('register', { title: 'Create a new account', message :'Message'});
});

router.get('/error', function (req, res, next) {
    res.render('error.jade', { title: 'Error Page'});
});
module.exports = router;

