"use strict";
var util = require('./util');
var tmpl = require('./templates');
var url = require('url');
var parseCookie = require('connect').utils.parseSignedCookie;

exports.init = function init(app, socks, db){
    var dir = __dirname + '/public/chat';

    util.staticInit(app, dir, '/chat', tmpl.filesMap('chat'));

    var mongourl = 'mongodb://user:password@ds033897.mongolab.com:33897/userbase';
    var userBase = util.dbInit(db, mongourl, 'message', tmpl.dbTempl('message'));
	socketInit(app, socks, userBase);
};

function socketInit(app, socks, db) {

	socks.of('/chat')
        .authorization(socksAuthorize)
        .on('connection', socksEventsHandler);

    function socksAuthorize(handshake, accept) {
        console.log('authorizing...');
        if (handshake.headers.cookie) {

            var cookies = parseCookie('sid=sjdfhnskejf');
            console.log('[COOKIES]: ' + cookies);

        } else {
            accept('No cookie transmited.', false);
        }
    }
	function socksEventsHandler(socket) {
        console.log('sessionID: ', socket.handshake.sessionID);
        socket.set('sessionID', socket.handshake.sessionID);
	}
}

