/**
 * Created by tyler on 4/13/2016.
 */
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("espress");
var cors = require("cors");
var app = espress();

app.use(cors());
app.use(bodyParser());

mongoose.connect('mongodb://localhost/things');

var thingModel = mongoose.model('Thing', {thing: String});

app.get("/", function (req, res) {
   thingModel.find(function(err , things) {
       var lastthing = things.pop();
       res.send(things);
   }) ;
});

app.post("/add", function(req,res) {
    var thing = req.body.thing;
    var thingDoc = new thingModel({thing: thing});
    thing.Doc.save(function() {
        res.send();
    })
})

app.listen(3000);