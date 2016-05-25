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
    // Count the number of documents (should not include the duplicates)
    db.collection(collection).count(function(err, count) {
        console.log(count); 
        callback(count); 
    });
};

model.count = function(db, collection, search, callback){
    // Peform a partial account for search data
    db.collection(collection).count(search, function(err, count) {
        assert.equal(null, err);
        callback(count); 
    });
};

// Find data in database 
model.find = function (db, collection, callback) {
    var cursor = db.collection(collection).find();
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        callback(doc);
    });
};

// Search database for matched document
model.findOne = function (db, collection, search, callback) {
    db.collection(collection).findOne(search, function (err, doc) {
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
        if (result !== null)
            console.log("Data inserted"); 
        callback(err);
    });
};

// Remove all matched
model.remove = function(db,collection, data, callback) {
   db.collection(collection).deleteMany(
      data,
      function(err, results) {
         callback();
      }
   );
};

// Remove single match
model.removeOne = function(db,collection, data, callback) {
   db.collection(collection).deleteOne(
      data,
      function(err, results) {
         callback(err);
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
      console.log("Data updated");
      callback(err);
   });
};

// Insert a document in the capped collection
model.push = function(db,collection,search,data, callback){
    db.collection(collection).update(
        search, {
        $push: data
    }, function(err, result) {
        console.log("New object pushed");
        callback(err);
    });
};

// Aggregate documents
model.aggregate = function(db, callback) {
   db.collection(collection).aggregate(
     [
       { $group: { "_id": "$borough", "count": { $sum: 1 } } }
     ]).toArray(function(err, result) {
     assert.equal(err, null);
     console.log("Aggregate");
     callback(result);
   });
};

// Create an ascending index
model.indexOne = function(db, collection,data, callback) {
   db.collection(collection).createIndex(
      data,
      null,
      function(err, results) {
         console.log("Index set");
         callback();
      }
   );
};

module.exports = model; 