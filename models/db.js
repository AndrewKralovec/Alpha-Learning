// Reduce hidden class creation in V8 for code optimization
var model = {
    sum : function (db, collection, callback) {
        // Count the number of documents (should not include the duplicates)
        db.collection(collection).count(function (err, count) {
            console.log(count);
            callback(count);
        });
    },

    count : function (db, collection, search, callback) {
        // Peform a partial account for search data
        db.collection(collection).count(search, function (err, count) {
            assert.equal(null, err);
            callback(count);
        });
    },
    
    // Find data in database 
    find : function (db, collection, callback) {
        db.collection(collection).find().toArray(function (err, documents) {
            assert.equal(err, null);
            callback(documents);
        });
    },

    // Search database for matched document
    findOne : function (db, collection, search, callback) {
        db.collection(collection).findOne(search, function (err, doc) {
            if (doc !== null) {
                callback(null, doc);
            } else {
                callback("File not found", null);
            }
        });
    },

    // Insert data into database
    insert : function (db, collection, data, callback) {
        // Insert a document in the capped collection
        db.collection(collection).insert(data, {
            w: 1
        }, function (err, result) {
            if (result !== null)
                console.log("Data inserted");
            callback(err);
        });
    },

    // Remove all matched
    remove : function (db, collection, data, callback) {
        db.collection(collection).deleteMany(
            data,
            function (err, results) {
                callback();
            }
        );
    },

    // Remove single match
    removeOne : function (db, collection, data, callback) {
        db.collection(collection).deleteOne(
            data,
            function (err, results) {
                callback(err);
            }
        );
    },

    // Update document in database
    update : function (db, collection, search, data, callback) {
        db.collection(collection).updateOne(
            search,
            {
                $set: data,
                $currentDate: { "lastModified": true }
            }, function (err, results) {
                console.log("Data updated");
                callback(err);
            });
    },

    // Insert a document in the capped collection
    push : function (db, collection, search, data, callback) {
        db.collection(collection).update(
            search, {
                $push: data
            }, function (err, result) {
                console.log("New object pushed");
                callback(err);
            });
    },

    // Insert a doucment into a nested array 
    nestedPush : function (db, collection, search, path, data, callback) {
        db.collection(collection).update(
            search, {
                $push: {
                    path: data
                }
            }, function (err, result) {
                console.log("New object pushed");
                callback(err);
            });
    },

    // Aggregate documents
    aggregate : function (db, callback) {
        db.collection(collection).aggregate(
            [
                { $group: { "_id": "$borough", "count": { $sum: 1 } } }
            ]).toArray(function (err, result) {
                assert.equal(err, null);
                console.log("Aggregate");
                callback(result);
            });
    },

    // Create an ascending index
    indexOne : function (db, collection, data, callback) {
        db.collection(collection).createIndex(
            data,
            null,
            function (err, results) {
                console.log("Index set");
                callback();
            }
        );
    }
}; 
module.exports = model; 