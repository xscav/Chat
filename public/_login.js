
//-------------FUNCTIONS--------------------
var socket;
var Ext;

function register() {
    socket.emit('user_register', {
		register: true,
		login: Ext.getCmp('loginField').getValue(),
		password: Ext.getCmp('passwordField').getValue(),
		password2: Ext.getCmp('password2Field').getValue(),
		email: Ext.getCmp('emailField').getValue()
	});
}

function login() {
	socket.emit('user_login', {
		login: Ext.getCmp('loginField').getValue(),
		password: Ext.getCmp('passwordField').getValue()
	});
}

function clear() {
	var loginWindow = Ext.getCmp('loginWindow');
	if (loginWindow)
			loginWindow.destroy();
}

function regButtonSwitcher(box) {
	var obj = Ext.getCmp;
	refreshAcceptButton();

	if (box.checked) {
		obj('emailField').show();
		obj('password2Field').show();
		obj('acceptButton').setText(obj('acceptButton').text2);
	} else {
		obj('emailField').hide();
		obj('password2Field').hide();
		obj('acceptButton').setText(obj('acceptButton').text1);
	}
}

function accept() {
	if (Ext.getCmp('regCheckbox').checked) {
		register();
	} else {
		login();
	}
}

function password2Validator(value) {
	if (value != Ext.getCmp('passwordField').getValue())
		return false;
	return true;
}

function refreshAcceptButton() {
	var obj = Ext.getCmp;

	var login = obj('loginField');
	var password = obj('passwordField');
	var accept = obj('acceptButton');

	if (!login.isValid() || !password.isValid()) {
		accept.setDisabled(true);
		return;
	}

	var register = obj('regCheckbox').checked;

	if (!register) {
		accept.setDisabled(false);
		return;
	}

	var password2 = obj('password2Field');
	var email = obj('emailField');

	var validmail = email.isValid() || !email.getValue();

	if (!password2.isValid() || !validmail) {
		accept.setDisabled(true);
		return;
	}

	accept.setDisabled(false);
}

function initSocketEvents(socket) {

	socket.on('user_login_successfull', function () {
		Ext.MessageBox.alert('Login Successfull:',
			'Login successfull!' +
		'');
		clear();
	});

	socket.on('user_login_doesnt_exits', function () {
		Ext.MessageBox.alert('Login Failed:',
			'User doesn\'t exist.\n' +
			'Please try another login,\n' +
			'or register.' +
		'');
	});

	socket.on('user_login_error', function () {
		Ext.MessageBox.alert('Login Failed:',
			'Invalid password!' +
			'Please try again,\n' +
			'or register.' +
		'');
	});

	socket.on('user_register_already_exist', function () {
		Ext.MessageBox.alert('Registration Failed:',
			'User with the same login or E-mail\n' +
			' is already exist.' +
		'');
	});

	socket.on('user_register_successfull', function () {
		Ext.MessageBox.alert('Registration Successfull:',
			'User registered!\n' +
		'');
		clear();
	});

	socket.on('user_fields_error', function () {
		 Ext.MessageBox.alert('Failed:',
			'Check all fields!' +
		'');
	});

    socket.on('user_server_error', function () {
    	 Ext.MessageBox.alert('Failed:',
			'Database/server error!' +
		'');
	});
}

function createLoginWindow() {

	var required = '<span style="color:red;' +
		'font-weight:bold" data-qtip="Required">*</span>';

return  Ext.create('Ext.Window', {
		id: 'loginWindow',
		title: 'Authentification',
		closable: false,
		bodyPadding: 10,
		layout: 'fit',
		minWidth: 350,

		items: [
			{
				id: 'userForm',
				xtype: 'form',
				bodyPadding: 10,
				layout: { type: 'vbox', align: 'stretch', defaultMargins: 5 },
				defaultType: 'textfield',

				defaults: {
					enableKeyEvents: true,
					listeners:	{keyup: refreshAcceptButton},
				},

				items: [
					{
						id: 'loginField',
						fieldLabel: 'Login',
						emptyText: 'Login: 4 - 20 characters',
						vtype: 'alphanum',
						afterLabelTextTpl: required,
						allowBlank: false,
						minLength: 4,
						maxLength: 20,
					},	//loginField
					{
						id: 'passwordField',
						fieldLabel: 'Password',
						emptyText: 'Pass: 6 - 30 characters',
						afterLabelTextTpl: required,
						allowBlank: false,
						inputType: 'password',
						minLength: 6,
						maxLength: 30
					},	//passwordField
					{
						id: 'password2Field',
						fieldLabel: 'Confirm',
						emptyText: 'Type your pass again',
						afterLabelTextTpl: required,
						allowBlank: false,
						inputType: 'password',
						minLength: 6,
						maxLength: 30,
						hidden: true,
						validator: password2Validator,
					},  //password2Field
					{
						id: 'emailField',
						fieldLabel: 'E-mail',
						emptyText: 'E-mail',
						allowBlank: true,
						vtype: 'email',
						hidden: true
					} //emailField
				],	//userForm:items

				buttons: [
					{
						xtype: 'checkbox',
						id: 'regCheckbox',
						boxLabel: 'Register',
						checked: false,
						handler: regButtonSwitcher
					}  //regCheckbox
				]
			}	//userForm
		],

		buttons: [
			{
				id: 'acceptButton',
				text: 'Login',
				text1: 'Login',
				text2: 'Register',
				handler: accept,
				disabled: true,
			}  //acceptButton
		]	//loginWindow:buttons

	});	//loginWindow;
}
