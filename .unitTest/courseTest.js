var expect    = require("chai").expect;
var app = require("./app");
var Db = require('mongodb').Db ; 
var collection = 'Courses', datatbase =  'AlphaLearning' ; 
var db = new Db(datatbase, new Server('localhost', 27017));

describe('coursepage', function(){
  it('should respond to GET',function(){
    superagent
      .get('http://localhost:3000/Courses/')
      .end(function(res){
        expect(res.status).to.equal(200);
        done();
    });
  }); 
});

describe("#findCourse", function(){  
  it("retrieves by Course name", function(done){    
    db.collection(collection).findOne('testName', function(doc){      
      doc.name.should.equal('testName');       
      done();    
    });  
  });
});