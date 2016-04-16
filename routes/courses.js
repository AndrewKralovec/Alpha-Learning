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

// Will add :CourseName
router.get('/:CourseName', function (req, res, next) {
    var CourseName = req.params.CourseName;
    var db = new Db('AlphaLearning', new Server('localhost', 27017));
    db.open(function (err, db) {
        // Get user object, This features will be removed once the sessions feature is added
        db.collection('Courses').findOne({ path: CourseName }, function (err, doc) {
            assert.equal(null, err);
            if (doc != null) {
                var Posts = doc.Posts;
                var keys = doc.keys; 
                console.log("Found");
                if(doc.Private){
                    var unlock = keys.indexOf(parseInt(req.session.userId));
                    console.log(unlock); 
                    if(unlock != null && unlock > -1){
                        console.log("allowed"); 
                        res.render('course', { title: 'Course Page', CourseName: CourseName, Posts: Posts });
                        db.close(); 
                    }else{
                        console.log("Not allowed"); 
                        res.render('fourOfour', { title: 'Error Page', message:CourseName });
                        db.close(); 
                    }
                }else {
                    console.log("Not private"); 
                    res.render('course', { title: 'Course Page', CourseName: CourseName, Posts: Posts });
                    db.close(); 
                }
            }else {
                console.log("404"); 
                res.render('fourOfour', { title: 'Error Page', message:CourseName });
                db.close(); 
            }
        });
    });
});

router.get('/:CourseName/post', function (req, res, next) {
    res.render('post', { title: 'Post Page' });
});

router.get('/fourOfour', function (req, res, next) {
    res.render('fourOfour', { title: 'style test' });
});

router.get('/error', function (req, res, next) {
    res.render('error.jade', { title: 'Error Page' });
});


module.exports = router;
