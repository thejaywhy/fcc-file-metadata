var express = require('express');
var app = express();
var multer  = require('multer')

// don't give  destination
// multer will keep the files in memory
var storage = multer.memoryStorage()
var upload = multer({ storage: storage }).single('file')

// root, show welcome page / docs
app.get("/", function (request, response) {

  response.sendFile(__dirname + '/views/index.html');
});

// Build the Files Route
app.post("/api/files/", function (request, response) { 
  upload(request, response, function (err) {
    if (err) {
      // An error occurred when uploading 
      // return the multer error for now
      response.status(400).json({error: err});
      return
    }  
    response.status(200).json({size: request.file.size});
  });
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
