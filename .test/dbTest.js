var expect = require("chai").expect;
var database = require('.././models/db');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
var collection = 'Courses', datatbase = 'AlphaLearning';

describe('Database Model', function () {
  describe('Module db', function () {
    it('should find the where feild is x and key is false', function () {
      MongoClient.connect(url, function (err, db) {
        database.findOne(db, 'Accounts', { x: false }, function (err, result) {
          assert.equal(err, null);
          // Should have found just one
          assert.equal(1, result);
          db.close();
        });
      });
    });
    it('should insert a vaid JSON object', function () {
      MongoClient.connect(url, function (err, db) {
        database.insert(db, 'Accounts', { name: 'Andrew' }, function() {
          assert.equal(err, null);
          db.close();
        });
      });
    });
  });
}); 