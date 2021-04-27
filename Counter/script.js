function toggleDiv() {
	var x = document.getElementById("myDIV");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}
var tallyDisplay = document.getElementById('tally');
var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)myTally\s*\=\s*([^;]*).*$)|^.*$/, "$1");
if (cookieValue != "") {
	var currentTally = parseInt(cookieValue);
} else {
	var currentTally = 0;
}
tallyDisplay.innerHTML = currentTally;
document.addEventListener('keyup', function(event) {
	if (event.which === 32) {
		currentTally++;
		tallyDisplay.innerHTML = currentTally;
	}
});
document.getElementById('resetBtn').addEventListener('click', function(event) {
	currentTally = 0;
	tallyDisplay.innerHTML = currentTally;
	document.cookie = "myTally=" + currentTally;
	gtag('event', 'Clear Counter Click', {
		'event_category': 'User Interaction'
	});
});
document.getElementById('plusBtn').addEventListener('click', function(event) {
	currentTally++;
	tallyDisplay.innerHTML = currentTally;
	document.cookie = "myTally=" + currentTally;
	setCookie('myTally', currentTally, 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999);
});
document.getElementById('minusBtn').addEventListener('click', function(event) {
	currentTally--;
	tallyDisplay.innerHTML = currentTally;
	document.cookie = "myTally=" + currentTally;
	setCookie('myTally', currentTally, 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999);
});

function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}