var express = require('express');
var app = express();

app.use(express.logger());
app.use(express.static(__dirname + '/dist'));

app.use(express.bodyParser());

app.post('/feedback', function(req, res, next) {
  console.log(req.body);
  return res.send(201, { message: "Thank you for the feedback" });
});

module.exports = app;
