/*
 * Created by Andrew Kralovec 
 */
var express = require('express');
var router = express.Router();
var fs = require('fs'); // Node file system

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
var avaiable = false;

// Index, list out all the courses 
router.get('/', function(req, res, next) {
    var db = new Db('AlphaLearning', new Server('localhost', 27017));
    db.open(function(err, db) {
        var cursor = db.collection('Courses').find().toArray(function(err, documents) {
            //assert.equal(1, documents.length);
            db.close();
            res.render('courses', {
                title: 'Course Page',
                Courses: documents
            });
        });
    });
});

// Load Course page 
router.get('/CreateCourse', function (req, res, next) {
    res.render('createCourse', {
        title: 'Course Creation page'
    });
}); 

// Post Course to database 
router.post('/CreateCourseReqest', function (req, res) {
    var course = req.body;
    var db = new Db('AlphaLearning', new Server('localhost', 27017));
    db.open(function (err, db) {
        // Insert a document in the capped collection
        db.collection('Courses').insert(course, { w: 1 }, function (err, result) {
            assert.equal(null, err);
            console.log("New Course added "+course);
            //res.json("Course Created");
            db.close();
        });
    });
}); 
// Load Course page 
router.get('/:CourseName', function(req, res, next) {
    var CourseName = req.params.CourseName;
    var db = new Db('AlphaLearning', new Server('localhost', 27017));
    db.open(function(err, db) {
        // Get Course object, This features will be removed once the sessions feature is added
        db.collection('Courses').findOne({
            path: CourseName
        }, function(err, doc) {
            assert.equal(null, err);
            if (doc != null) {
                avaiable = true;
                var Posts = doc.Posts;
                var keys = doc.keys;
                console.log("Found");
                // Check if the Couse is prive
                if (doc.Private) {
                    var unlock = keys.indexOf(parseInt(req.session.userId));
                    console.log("Key Request: " + unlock);
                    // Check to see if current user is apart of the class
                    if (unlock == null || unlock < 0) {
                        db.close();
                        console.log("Not allowed");
                        res.render('private', {
                            title: 'Error Page',
                            message: CourseName
                        });
                    }
                }
                // Fix middleware not being fast enough
                if (!res.headersSent) {
                    res.render('course', {
                        title: 'Course Page',
                        CourseName: CourseName,
                        Course: doc
                    });
                    db.close();
                }
                // The Course does not exist
            } else {
                if (!res.headersSent) {
                    res.render('fourOfour', {
                        title: 'Error Page',
                        message: CourseName
                    });
                    db.close();
                }
            }
        });
    });
});

// Load post page 
router.get('/:CourseName/:PostName', function(req, res, next) {
    var path = req.params.PostName;
    var db = new Db('AlphaLearning', new Server('localhost', 27017));
    db.open(function(err, db) {
        // Pagnate to course
        db.collection('Courses').findOne({
                name: "AngularJS"
            },
            // Find the matching element post 
            {
                Posts: {
                    $elemMatch: {
                        path: path
                    }
                }
            },
            // Render post object to page 
            function(err, doc) {
                if(doc == null){
                    res.render('error', {
                        title: "Post not found"
                    });
                }
                if (err)
                    throw err;
                var result = doc.Posts[0] ; 
                res.render('post', {
                    title: "Post Page ",
                    Post: result
                });
            });
    });
});

// Test out quiz pages
router.get('/:CourseName/Quiz/:QuizName', function(req, res, next) {
    // Render quiz page 
    res.render('quiz', {
        title: "Quiz "
    });

});

// Special 404 page for courses
router.get('/fourOfour', function(req, res, next) {
    res.render('fourOfour', {
        title: 'style test'
    });
});

// Default 404 page 
router.get('/error', function(req, res, next) {
    res.render('error.jade', {
        title: 'Error Page'
    });
});

module.exports = router;