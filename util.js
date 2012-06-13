"use strict";

exports.dbInit = function dbInit(db, url, modelname, template) {

    var userBase = db.createConnection(url);
    userBase.model(modelname, new db.Schema(template));

    return userBase;
};

exports.staticInit = function staticInit(app, sdir, surl, map) {

    function setFile(suburl, subfile) {
        app.get(surl + suburl, function(req, res) {
            res.sendfile(sdir + subfile);
        });
    }

    var i;

    for (i = 0; i < map.length; ++i) {
        setFile(map[i].url, map[i].file);
    }
};

exports.getSid = function getSid() {
    return randomString(30);
};

function randomString(length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var randomString = '';

    for (var i = 0; i < length; ++i) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(rnum, rnum + 1);
    }
    return randomString;
}
