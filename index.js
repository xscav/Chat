"use strict";

//var locip = '192.168.1.40';
//var port = 80;
console.log('netbook');

var locip = process.env.IP;
var port = process.env.PORT;

var mongo = require('mongoose');

var express = require('express');
var app = express.createServer();
var sessionStore = new express.session.MemoryStore();

app.listen(port, locip);

app.get('/', function(req, res) {
	res.redirect('/login');
});
/*
var io = require('socket.io');
var sio = require('socket.io-sessions');

var socks = sio.enable({
  socket: io.listen(app),
  store:  sessionStore,
  parser: app.cookieParser()
});

var login = require('./login');
login.init(app, socks, mongo);

//var chat = require('./chat');
//chat.init(app, socks, mongo);
*/
console.log('EOI');