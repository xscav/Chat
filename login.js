exports.init = function init(app, socks, db){
    staticInit(app);
	var User = dbInit(db);
	socketInit(socks, User);
};

function dbInit(db) {

	var User = db.model('user', new db.Schema({
        name: { type: String, lowercase: false },
		login: { type: String, lowercase: true },
		password: String,
		email: { type: String, lowercase: true }
	}));
	return User;
}

function staticInit(app) {

	app.get('/', function(req, res) {
		res.redirect('/login');
	});

	app.get('/login', function(req, res) {
		res.sendfile(__dirname + '/public/login.html');
	});

	app.get('/login.js', function(req, res) {
		res.sendfile(__dirname + '/public/login.js');
	});

	app.get('/_login.js', function(req, res) {
		res.sendfile(__dirname + '/public/_login.js');
	});
}

function socketInit(socks, User) {
	socks.of('/login').on('connection', socksEventsHandler);

	function socksEventsHandler(socket) {

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

				socket.emit('user_register_successfull');
			});

		}

		//User Register

		socket.on('user_register', function(data) {
			var finded = 0, called = 0;

			function findComplete(err, count) {
				console.log('[login]: [find]: end(' + called + '/2)!');
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

			var valid = checkFields(data);
			console.log('[chat]: [user]: valid:' + valid);

			if (valid) {
				if (!data.email) called++; //E-mail is not required field
				else User.count({email : data.email}, findComplete);

						User.count({login : data.login}, findComplete);
			} else {
				socket.emit('user_fields_error');
				return;
			}

		}); //on:user_register


		//User Login

		socket.on('user_login', function(data) {

			function findComplete(err, user) {
				console.log('[login]: [find]: end!');

				if (err || !user) {
					socket.emit('user_login_doesnt_exits');
					return;
				}

				if (user.password == data.password) {
					socket.emit('user_login_successfull');
					return;
				}

				socket.emit('user_login_error');
			}

			if (checkFields(data)) {
				User.findOne({login : data.login}, findComplete);
			} else {
				socket.emit('user_fields_error');
			}

		}); //on:user_login
	}
}

function checkFields(data) {

	if (!data)
		return 0;

	if (!data.login || !data.password)
		return 0;

	if (data.login.length < 4 || data.login.length > 20)
		return 0;

	if (data.password.length < 6 || data.password.length > 30)
		return 0;

	if (data.register && data.password != data.password2)
		return 0;

	return 1;
}

