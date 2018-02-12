var express = require('express');
var app = express();


// root, show welcome page / docs
app.get("/", function (request, response) {

  response.sendFile(__dirname + '/views/index.html');
});

// Build the Files Route
app.post("/api/files/", function (request, response) { 
  response.status(500).json({error: "Server Error"}); 
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
