/**
 * Created by Andrew Kralovec 
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var dir = './uploads';
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({
    storage: storage
}).single('file');
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

// Will add :username
router.get('/', function(req, res, next) {
    res.render('upload', {
        title: 'upload Page',
        message: 'Message'
    });
});

router.get('/error', function(req, res, next) {
    res.render('error.jade', {
        title: 'Error Page'
    });
});

// Listen for Upload file 
router.post('/uploadFile', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            console.log("Error uploading file");
        } else {
            //var databaseName = "E-learn", collection = "Accounts";
            var username = req.body.username;
            var filename = req.file.originalname;
            var savename = req.file.filename;
            var filePath = req.file.path;
            var filetype = req.file.mimetype;
            console.log("GET username " + username);
            console.log("GET fieldname " + req.file.fieldname);
            console.log("GET filename " + filename);
            console.log("GET orignal name " + savename);
            console.log("GET path " + filePath);
            console.log("GET filetype " + filetype);
            var db = new Db('AlphaLearning', new Server('localhost', 27017));
            db.open(function(err, db) {
                // Get user object 
                db.collection('Accounts').findOne({
                    username: username
                }, function(err, doc) {
                    assert.equal(null, err);
                    if (doc != null) {
                        console.log("Found");
                        db.close();
                    }
                });
            });
        }
    });
});

// Load Course page 
router.get('/CreateFolder/:folder', function(req, res) {
    var folder = req.params.folder;
    if (!fs.existsSync('./uploads/test')) {
        fs.mkdir('./uploads/test', function(err) {
            if (err)
                throw console.error(err);
            console.log("Directory created successfully!");
        });
    }
});

function makeDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdir(dir, function(err) {
            if (err)
                throw console.error(err);
            console.log("Directory created successfully!");
            return true;
        });
    } else {
        console.log("Directory already exists");
        return false;
    }
}
module.exports = router;