var expect = require("chai").expect;
var database = require('.././models/db');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
var search = { default: true } ; 

describe('Database Model', function () {
  describe('db Module function testing', function () {
    it('should find the where feild is x and key is false', function () {
      MongoClient.connect(url, function (err, db) {
        database.findOne(db, 'Accounts', search, function (err, result) {
          assert.equal(err, null);
          // Should have found just one
          assert.ok(result);
          db.close();
        });
      });
    });
    it('should insert a vaid JSON object', function () {
      MongoClient.connect(url, function (err, db) {
        database.insert(db, 'Accounts', { name: 'Andrew' }, function(error) {
          assert.equal(error, null);
          db.close();
        });
      });
    });
    it('should search and update the correct query', function () {
      MongoClient.connect(url, function (err, db) {
        database.update(db, 'Accounts', { name: 'Andrew' },{name:'Kralovec'}, function(error) {
          assert.equal(error, null);
          db.close();
        });
      });
    });
    it('should remove a single JSON object', function () {
      MongoClient.connect(url, function (err, db) {
        database.removeOne(db, 'Accounts', { name: 'Kralovec' }, function(error) {
          assert.equal(error, null);
          db.close();
        });
      });
    });
    it('should puse new item to the array ', function () {
      MongoClient.connect(url, function (err, db) {
        database.push(db, 'Accounts', search,{array:{name:'new'}},function(error) {
          assert.equal(error, null);
          db.close();
        });
      });
    });
    it('should return the count of the collection', function () {
      MongoClient.connect(url, function (err, db) {
        database.sum(db, 'Accounts', function(count) {
          // Should have found 2 in the test collection [x:flase,name:Andrew]
          assert.equal(count, 2);
          db.close();
          done();
        });
      });
    });
  });
}); 