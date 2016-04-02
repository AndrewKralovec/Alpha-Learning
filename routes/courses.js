var express = require('express');
var router = express.Router();

// Will add :username
router.get('/', function (req, res, next) {
    res.render('course', { title: 'Course Page', message :'Message'});
});

router.get('/error', function (req, res, next) {
    res.render('404.jade', { title: 'Error Page'});
});


module.exports = router;
