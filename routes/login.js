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

// GET login page. 
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Login page' });
});

/*app.use(session({
    secret: "somescretkeyhere",
    resave: true,
    saveUnitializaed: true,
    store: new MongoStore({
        url: 'mongodb://localhost/AlphaLearning/Accounts',
        touchAfter: 24 * 3600
    })
}));*/

// Listen for Seach collection request
router.post('/loginRequest', function (req, res, next) {
    var databaseName = "AlphaLearning", collection = "Accounts";
    var username = req.session.body.username, password = req.body.password;
    console.log("username: " + username + " password: " + password);
    var db = new Db(databaseName, new Server('localhost', 27017));
    db.open(function (err, db) {
        console.log(databaseName + ": opened");
        //var cursor = db.collection(collection).find( { "username":username,"password": password } );
        // cannot apply cursor methods to the result of findOne() because a single document is returned. 
        db.collection(collection).findOne({ "username": username, "password": password }, function (err, doc) {
            assert.equal(null, err);
            if (doc != null) {
                console.log("Found");
                var address = "/home/"+username
                res.json({address:address});
            }else {
                res.status(400).json();
            }
            db.close();
        });
    });
});

module.exports = router;
