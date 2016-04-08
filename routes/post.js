/**
 * Created by Doug on 4/8/2016.
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
    res.render('post', { title: 'Create Post Page', message :'Message'});
});

module.exports = router;