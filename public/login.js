//var globip = '212.232.36.93';
//var port = 80;
var globip = 'chat.scav.c9.io';
//var port = 800;

var socket = io.connect('http://' + globip + '/login');

initSocketEvents(socket);

Ext.require([
    'Ext.window.Window',
	'Ext.tab.*',
	'Ext.toolbar.Spacer',
	'Ext.layout.container.Card',
	'Ext.layout.container.Border'
]);

Ext.onReady(function () {

    Ext.tip.QuickTipManager.init();
	var loginWindow = Ext.getCmp('loginWindow');

	if (!loginWindow) {
		loginWindow = createLoginWindow();
	}

     loginWindow.center();
     loginWindow.show();
});