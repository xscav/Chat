"use strict";

//var locip = '192.168.1.40';
//var port = 80;

var locip = '0.0.0.0';
var port = process.env.C9_PORT;

var mongo = require('mongoose');

var app = require('express').createServer();
app.listen(port, locip);
app.get('/', function(req, res) {
	res.redirect('/login');
});
var socks = require('socket.io').listen(app);

var login = require('./login');
login.init(app, socks, mongo);

var chat = require('./chat');
chat.init(app, socks, mongo);
