var expect    = require("chai").expect;
var db = require('.././models/db');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
var collection = 'Courses', datatbase =  'AlphaLearning' ; 

describe('Database Model', function(){
  describe('Module db', function(){
    it('should have a getChange Method', function(){
      assert.equal(typeof db, 'object');
      assert.equal(typeof db.findOne, 'function');
    });
  });
}); 