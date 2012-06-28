"use strict";

//var globip = '212.232.36.93';
var globip = 'chat.scav.c9.io';

//Only for static code analyzer:
var io;
var Ext;
var initSocketEvents;
var createLoginWindow;
//

//var socket = io.connect('http://' + globip + '/login');
var socket = io.connectWithSession();

initSocketEvents(socket);

Ext.require([
    'Ext.window.Window',
	'Ext.tab.*',
	'Ext.toolbar.Spacer',
	'Ext.layout.container.Card',
	'Ext.layout.container.Border'
]);

Ext.onReady(function () {

	//Ext.QuickTips.init();
    //Ext.tip.QuickTipManager.init();

	var loginWindow = Ext.getCmp('loginWindow');

	if (!loginWindow) {
		loginWindow = createLoginWindow();
	}

     loginWindow.center();
     loginWindow.show();
});