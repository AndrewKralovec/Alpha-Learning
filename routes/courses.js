/**
 * Created by Andrew Kralovec 
 */
var express = require('express');
var router = express.Router();
// All possible mongo db objects 
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');
var avaiable = false ; 

// Index list out all the courses 
router.get('/', function (req, res, next) {
    var db = new Db('AlphaLearning', new Server('localhost', 27017));
    db.open(function (err, db) {
        var cursor = db.collection('Courses').find().toArray(function(err, documents) {
        //assert.equal(1, documents.length);
        db.close();
        res.render('courses', { title: 'Course Page',Courses:documents });
      });
    });
});

// Show Course page 
router.get('/:CourseName', function (req, res, next) {
    var CourseName = req.params.CourseName;
    var db = new Db('AlphaLearning', new Server('localhost', 27017));
    db.open(function (err, db) {
        // Get Course object, This features will be removed once the sessions feature is added
        db.collection('Courses').findOne({ path: CourseName }, function (err, doc) {
            assert.equal(null, err);
            if (doc != null) {
                avaiable = true ; 
                var Posts = doc.Posts;
                var keys = doc.keys; 
                console.log("Found");
                // Check if the Couse is prive
                if(doc.Private){
                    var unlock = keys.indexOf(parseInt(req.session.userId));
                    console.log(unlock); 
                    if(unlock == null || unlock < 0){
                        db.close(); 
                        console.log("Not allowed"); 
                        res.render('private', { title: 'Error Page', message:CourseName });
                    }
                }
                // Fix middleware not being faster enough
                if (!res.headersSent){
                    res.render('course', { title: 'Course Page', CourseName: CourseName, Course:doc });
                    db.close(); 
                }
            // The Course does not exist
            }else {
                if (!res.headersSent){
                    res.render('fourOfour', { title: 'Error Page', message:CourseName });
                    db.close(); 
                }
            }
        });
    });
});

// Could change to '/:CourseName/post/:PostName', if i want to to restrict the route folder 
router.get('/:CourseName/:PostName', function (req, res, next) {

});

// Test out quiz pages
router.get('/:CourseName/Quiz/:QuizName',function(req,res,next){
  res.render('quiz',{title:"Quiz "}); 
  
});

router.get('/fourOfour', function (req, res, next) {
    res.render('fourOfour', { title: 'style test' });
});

router.get('/error', function (req, res, next) {
    res.render('error.jade', { title: 'Error Page' });
});


module.exports = router;
