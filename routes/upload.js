// Im moving upload route under the index section. 

/* Define dependencies */
var express = require('express'); // ; 
var multer = require('multer'); // ; 
// Allow Multer callbacks with configuring storage 
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
// Multer accepts an options object 
var upload = multer({ storage: storage }).single('file');


/* Configure the app */
var app = express(); 
var upload = multer({
    dest: './uploads/',
    limits: {fileSize:500000}}); 

/* Handling routes */
app.get('/', function (req, res) {
  res.sendfile('index.html')
}); 

app.post('/api/files', upload.single('userFile'), function (req, res) {
  console.log(req.file)
  res.sendfile('index2.html')
}); 

// Listen for Upload file 
router.post('/uploadFile', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log("Error uploading file");
        } else {
            //var databaseName = "Alphalearn", collection = "Accounts";
            var username = req.body.username ; 
            var filename = req.file.originalname ; 
            var savename = req.file.filename ; 
            var filePath = req.file.path ; 
            var filetype = req.file.mimetype ; 
            console.log("GET username " + username);
            console.log("GET fieldname " + req.file.fieldname);
            console.log("GET filename " + filename);
            console.log("GET orignal name " + savename);
            console.log("GET path " + filePath);
            console.log("GET filetype " + filetype);
            var db = new Db('Alphalearn', new Server('localhost', 27017));
            db.open(function (err, db) {
                // Get user object 
                db.collection('Accounts').findOne({username:username}, function (err, doc) {
                    assert.equal(null, err);
                    if (doc != null) {
                        console.log("Found");
                          var docCount = doc.Documents.length ; 
                          // overwrite MONGO set 
                          var userMod = {"username":username} ; 
                          var setModify = {$set:{}};
                          setModify.$set["Documents."+docCount]={id:docCount, filename:filename, path:filePath, savename:savename, filetype:filetype} ; 
                          db.collection('Accounts').update(userMod,setModify,function(err,newdoc){
                              console.log("Updated"); 
                              db.close();
                          });
                    } else {
                        console.log("Not Found");
                        res.json("Failed");
                    }
                });
            });
        }
    });
});

/* Run the server */
app.listen(3000, function () {
    console.log('Listening on port 3000')
}); 