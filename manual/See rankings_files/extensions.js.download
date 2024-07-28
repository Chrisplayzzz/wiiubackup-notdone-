// PCとwiiuで使える処理を使い分けるためのスクリプト
// 全てのhtmlで自作scriptの前に読み込んでください

//method extension

var isWiiU;

if (typeof wiiuSystemSetting !== 'undefined') {

	isWiiU = true;

	// wrapper for wiiu
	jQuery.extend({
		print : function(message) {
			if (typeof wiiuDebug !== 'undefined') {
				wiiuDebug.print(message);
			}
		},
		alert : function(message, buttonText) {
			if (buttonText != null) {
				wiiuDialog.alert(message, buttonText);
			} else {
				wiiuDialog.alert(message, 'OK');
			}
		},
		confirm : function(message, lButtonText, rButtonText) {
			if (lButtonText != null && rButtonText != null) {
				return wiiuDialog.confirm(message, lButtonText, rButtonText);
			} else {
				return wiiuDialog.confirm(message, 'Cancel', 'OK');
			}
		},
		sessionStorage : function() {
			return wiiuSessionStorage;
		},
		localStorage : function() {
			return wiiuLocalStorage;
		},
		save : function() {
            wiiuBrowser.lockHomeButtonMenu(true);
            wiiuBrowser.lockPowerButton(true);

			wiiuLocalStorage.write();

            wiiuBrowser.lockHomeButtonMenu(false);
            wiiuBrowser.lockPowerButton(false);
		},
		showError : function(errorCode, errorMessage) {
			var code;
			if (typeof errorCode === 'string') {
				code = parseInt(errorCode);
			} else {
				code = errorCode;
			}
			Wood.Analytics.sendError(code);
			if (errorMessage != null) {
				wiiuErrorViewer.openByCodeAndMessage(code, errorMessage);
			} else {
				wiiuErrorViewer.openByCode(code);
			}
		}
	});

} else {

	isWiiU = false;

	// wrapper for PC
	jQuery.extend({
		print : function(message) {
			if (typeof console !== 'undefined') {
				console.log(message);
			}
		},
		alert : function(message, buttonText) {
			var text = message;
			if (buttonText != null) {
				text = text + "\n\nButton: " + buttonText;
			}
			window.alert(text);
		},
		confirm : function(message, lButtonText, rButtonText) {
			var text = message;
			if (lButtonText != null && rButtonText != null) {
				text = text + "\n\nLeft Button: " + lButtonText;
			}
			return window.confirm(text);
		},
		sessionStorage : function() {
			if (typeof sessionStorage !== 'undefined') {
				return sessionStorage;
			}
		},
		localStorage : function() {
			if (typeof localStorage !== 'undefined') {
				return localStorage;
			}
		},
		save : function() {
		},
		showError : function(errorCode, errorMessage) {
			if (errorMessage != null) {
				window.alert(errorCode + "\n\n" + errorMessage);
			} else {
				window.alert(errorCode)
			}
		}
	});

}

//button extension

// A -> click
var BUTTON_A = 13;

// assignable
var BUTTON_B = 27;
var BUTTON_X = 88;
var BUTTON_Y = 89;
var BUTTON_L = 76;
var BUTTON_R = 82;
var BUTTON_PLUS = 80;
var BUTTON_MINUS = 77;

// var BUTTON_ZL = 8;
// var BUTTON_ZR = 34;
// var BUTTON_HOME = 36;
// var BUTTON_LEFT = 37;
// var BUTTON_UP = 38;
// var BUTTON_RIGHT = 39;
// var BUTTON_DOWN = 40;

jQuery.fn.extend({

	buttonB : function(callback) {
		jQuery(this).keydown(function(e) {
			if (e.keyCode == BUTTON_B) {
				return callback();
			}
		});
		return this;
	},
	buttonX : function(callback) {
		jQuery(this).keydown(function(e) {
			if (e.keyCode == BUTTON_X) {
				return callback();
			}
		});
		return this;
	},
	buttonY : function(callback) {
		jQuery(this).keydown(function(e) {
			if (e.keyCode == BUTTON_Y) {
				return callback();
			}
		});
		return this;
	},
	buttonR : function(callback) {
		jQuery(this).keydown(function(e) {
			if (e.keyCode == BUTTON_R) {
				return callback();
			}
		});
		return this;
	},
	buttonL : function(callback) {
		jQuery(this).keydown(function(e) {
			if (e.keyCode == BUTTON_L) {
				return callback();
			}
		});
		return this;
	},
	buttonPlus : function(callback) {
		jQuery(this).keydown(function(e) {
			if (e.keyCode == BUTTON_PLUS) {
				return callback();
			}
		});
		return this;
	},
	buttonMinus : function(callback) {
		jQuery(this).keydown(function(e) {
			if (e.keyCode == BUTTON_MINUS) {
				return callback();
			}
		});
		return this;
	},
	buttonAClick : function() {
		jQuery(this).keydown(function(e) {
			if (e.keyCode == BUTTON_A && !$(e.target).is('a')) {
				jQuery(this).click();
				return false;
			}
		});
		return this;
	}

});
