"use strict";

exports.dbTempl = function dbTempl(name) {
    switch (name) {

        case 'user':
            return {
                name: String,
                login: { type: String, lowercase: true },
                password: String,
                email: { type: String, lowercase: true }
            };

        case 'message':
            return {
                date: Date,
                sname: String,
                sender: { type: String, lowercase: true },
                text: String
            };

        default:
            return {
                error: String,
                InvalidTemplate: Boolean
            };

    }
};

exports.filesMap = function fileMap(name) {
     switch (name) {

        case 'login':
            return [
                { url: '', file: '/index.html'},
                { url: '/index.js', file: '/index.js'},
                { url: '/login.js', file: '/login.js'}
            ];

        case 'chat':
            return [
                { url: '', file: '/index.html'},
                { url: '/index.js', file: '/index.js'}
            ];

        default:
            return [

            ];

    }
};

exports.checkPattern = function (name, data) {
    if (!checkPattern[name])
        return 0;
    return checkPattern[name](data);
}

var checkPattern = [];

checkPattern['user'] = function (data) {
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

