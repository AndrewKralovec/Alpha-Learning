/* Define dependencies */
var express = require('express')
var multer = require('multer')

/* Configure the app */
var app = express()
var upload = multer({
    dest: './uploads/',
    limits: {fileSize:500000}})

/* Handling routes */
app.get('/', function (req, res) {
  res.sendfile('index.html')
})

app.post('/api/files', upload.single('userFile'), function (req, res) {
  console.log(req.file)
  res.sendfile('index2.html')
})

/* Run the server */
app.listen(3000, function () {
    console.log('Listening on port 3000')
})