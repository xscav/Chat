"use strict";
var util = require('./util');
var tmpl = require('./templates');

exports.init = function init(app, socks, db){
    var dir = __dirname + '/public/login';

    util.staticInit(app, dir, '/login', tmpl.filesMap('login'));

    var mongourl = 'mongodb://user:password@ds033897.mongolab.com:33897/userbase';
	var userBase = util.dbInit(db, mongourl, 'user', tmpl.dbTempl('user'));

	socketInit(app, socks, userBase);
};

function socketInit(app, socks, db) {
	socks.of('/login').on('connection', socksEventsHandler);

//User Register
	function socksEventsHandler(socket) {
        var User = db.model('user');

		function saveUser(data) {

			var user = new User({
                name: data.login,
				login: data.login,
				password: data.password,
				email: data.email
			});

			user.save(function(err) {
				if (err) {
					socket.emit('user_server_error');
					return;
				}

				socket.emit('user_register_successfull', util.getSid());
			});

		}

		socket.on('user_register', function(data) {
			var finded = 0, called = 0;

			function findComplete(err, count) {
				called++;
				if (!err && count)
						finded = 1;

					if (called >= 2) {
						if (finded)
							socket.emit('user_register_already_exist');
						else
							saveUser(data);
						}
			}

			var valid = tmpl.checkPattern('user', data);
			console.log('[chat]: [user]: valid:' + valid);

			if (valid) {
				if (!data.email) called++; //E-mail is not required field
				else User.count({email : data.email.toLowerCase()}, findComplete);

				User.count({login : data.login.toLowerCase()}, findComplete);
			} else {
				socket.emit('user_fields_error');
				return;
			}

		}); //on:user_register


		//User Login

		socket.on('user_login', function(data) {

			function findComplete(err, user) {

				if (err || !user) {
					socket.emit('user_login_doesnt_exits');
					return;
				}

				if (user.password == data.password) {
                    socket.emit('user_login_successfull', util.getSid());
					return;
				}

				socket.emit('user_login_error');
			}

			if (tmpl.checkPattern('user', data)) {
				User.findOne({login : data.login.toLowerCase()}, findComplete);
			} else {
				socket.emit('user_fields_error');
			}

		}); //on:user_login
	}
}

