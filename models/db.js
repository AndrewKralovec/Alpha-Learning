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
    
model.sum = function(db, collection, callback){
    // Perform a total count command
    db.collection(collection).count(function(err, count) {
        assert.equal(null, err);
        callback(count); 
    });
};

model.count = function(db, collection, search, callback){
    // Peform a partial account where b=1
    db.collection(collection).count(search, function(err, count) {
        assert.equal(null, err);
        callback(count); 
    });
};

// Find datat in database 
model.find = function (db, collection, callback) {
    var cursor = db.collection(collection).find();
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        callback(doc);
    });
};

// Find document in database 
model.findOne = function (db, collection, search, callback) {
    db.collection(collection).findOne(search, function (err, doc) {
        assert.equal(err, null);
        if (doc !== null) {
            callback(null,doc);
        } else {
            callback("File not found",null);
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
        if (result !== null)
            console.log("Data inserted"); 
        callback();
    });
};

// Remove all matched
model.remove = function(db,collection, data, callback) {
   db.collection(collection).deleteMany(
      data,
      function(err, results) {
         console.log(results);
         callback();
      }
   );
};

// Remove single match
model.removeOne = function(db,collection, data, callback) {
   db.collection(collection).deleteOne(
      data,
      function(err, results) {
         console.log(results);
         callback();
      }
   );
};

// Update document in database
model.update = function(db,collection,search,data, callback) {
   db.collection(collection).updateOne(
      search,
      {
        $set: data,
        $currentDate: { "lastModified": true }
      }, function(err, results) {
      console.log(results);
      callback();
   });
};

// Insert a document in the capped collection
model.push = function(db,collection,search,data, callback){
    db.collection(collection).update(
        search, {
        $push: data
    }, function(err, result) {
        assert.equal(null, err);
        console.log("New Post added");
        callback();
    });
};

// Aggregate documents
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