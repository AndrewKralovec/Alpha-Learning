var model = module.exports = {};
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

// Find datat in database 
model.find = function (db, collection, callback) {
    var cursor = db.collection(collection).find();
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc !== null) {
            return doc;
        } else {
            callback();
        }
    });
};

// Find datat in database 
model.findOne = function (db, collection, data, callback) {
    db.collection(collection).findOne(data, function (err, doc) {
        assert.equal(err, null);
        if (doc !== null) {
            return doc;
        } else {
            callback();
        }
    });
};

// Insert data into database
model.insert = function (db, collection, data, callback) {
    // Insert a document in the capped collection
    db.collection(collection).insert(data, {
        w: 1
    }, function (err, result) {
        assert.equal(err, null);
        if (result !== null) {
            return true;
        } else {
            callback();
        }
    });
};

// Remove all matched
model.remove = function(db,collection,field, data, callback) {
   db.collection(collection).deleteMany(
      { field: data},
      function(err, results) {
         console.log(results);
         callback();
      }
   );
};

// Remove single match
model.removeOne = function(db,collection,field, data, callback) {
   db.collection(collection).deleteOne(
      { field: data},
      function(err, results) {
         console.log(results);
         callback();
      }
   );
};

// Aggregate 
model.aggregate = function(db, callback) {
   db.collection(collection).aggregate(
     [
       { $group: { "_id": "$borough", "count": { $sum: 1 } } }
     ]).toArray(function(err, result) {
     assert.equal(err, null);
     console.log(result);
     callback(result);
   });
};

// Create an ascending index
model.indexOne = function(db, collection,data, callback) {
   db.collection(collection).createIndex(
      data,
      null,
      function(err, results) {
         console.log(results);
         callback();
      }
   );
};

module.exports = model; 