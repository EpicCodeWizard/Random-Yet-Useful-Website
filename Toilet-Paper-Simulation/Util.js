var CookieUtil = {};
CookieUtil.setCookie = function(name, value, expiration) {
	var expString = "";
	if (expiration > 0) {
		var expDate = new Date(Date.now());
		expString = "; expires=" + expDate.toGMTString();
	}
	document.cookie = name + "=" + value + expString;
};
CookieUtil.getCookie = function(name) {
	name = name + "=";
	var all = document.cookie.split(';');
	for (var i = 0; i < all.length; i++) {
		var cookie = all[i].trim();
		if (cookie.indexOf(name) === 0) return cookie.substring(name.length, cookie.length);
	}
	return null;
};
CookieUtil.deleteCookie = function(name) {
	CookieUtil.setCookie(name, "", -1);
}