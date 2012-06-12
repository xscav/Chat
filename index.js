//var locip = '192.168.1.40';
//var port = 80;

var locip = '0.0.0.0';
var port = process.env.C9_PORT;

var db = require('mongoose');
db.connect('mongodb://user:password@ds033897.mongolab.com:33897/userbase');

var app = require('express').createServer();
app.listen(port, locip);

var socks = require('socket.io').listen(app);

var login = require('./login');
login.init(app, socks, db);
