"use strict";
var util = require('./util');
var tmpl = require('./templates');

exports.init = function init(app, socks, db){
    var dir = __dirname + '/public/chat';

    util.staticInit(app, dir, '/chat', tmpl.filesMap('chat'));

    var mongourl = 'mongodb://user:password@ds033897.mongolab.com:33897/userbase';
    var userBase = util.dbInit(db, mongourl, 'message', tmpl.dbTempl('message'));
	socketInit(socks, userBase);
};

function socketInit(socks, db) {
	socks.of('/chat').on('connection', socksEventsHandler);

	function socksEventsHandler(socket) {


	}
}

