var express = require('express');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.json());
var port = 3090;

app.listen(port, function () {
  console.log('Server is running on port 3000');
});