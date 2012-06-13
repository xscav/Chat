"use strict";

//var globip = '212.232.36.93';
var globip = 'chat.scav.c9.io';

//Only for static code analyzer:
var io;
var Ext;
//

var socket = io.connect('http://' + globip + '/chat');

function socksInit(sock) {


}

Ext.require([
    'Ext.window.Window',
	'Ext.tab.*',
	'Ext.toolbar.Spacer',
	'Ext.layout.container.Card',
	'Ext.layout.container.Border'
]);

Ext.onReady(function () {
    socksInit(socket);
});