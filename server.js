var express = require('express');
var path = require('path');
var http = require('http');
const { BACKEND_HOST, BACKEND_PORT } = require('./constants');

var apiRouter = require('./routes/api');

var port = BACKEND_PORT;

var app = express();
app.set('port', port);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

var server = http.createServer(app);  

server.listen(port,BACKEND_HOST);