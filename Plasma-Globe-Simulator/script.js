var active = true;
var sparks = new Array();
var GlobeRad = 200;
var BallRad = Math.floor(GlobeRad / 6);
var Glow1Rad = Math.floor(GlobeRad / 20);
var Glow2Rad = Math.floor(GlobeRad / 15);
var ctx = null;
var cnv = document.getElementById("myCanvas");
cnv.width = 2 * GlobeRad;
cnv.height = 2 * GlobeRad;
ctx = cnv.getContext("2d");
var sparkcnv = document.createElement("canvas");
var spark2cnv = document.createElement("canvas");
var clipcnv = document.createElement("canvas");
var glow1cnv = document.createElement("canvas");
var glow2cnv = document.createElement("canvas");
var bgdata = null;
var glow1ctx = null;
var glow2ctx = null;
var sparkctx = null;
var spark2ctx = null;
var clipctx = null;
var r0 = 5,
	g0 = 10,
	b0 = 30;
var r2 = 100,
	g2 = 0,
	b2 = 10;
var touches = 0;
var touchX = [0],
	touchY = [0];
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function( /* function */ callback, /* DOMElement */ element) {
		return window.setTimeout(callback, 1000 / 60);
	};
})();
window.cancelRequestAnimFrame = (function() {
	return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
})();

function setbackground() {
	sparkcnv.width = GlobeRad * 2;
	sparkcnv.height = GlobeRad * 2;
	sparkctx = sparkcnv.getContext("2d");
	spark2cnv.width = GlobeRad * 2;
	spark2cnv.height = GlobeRad * 2;
	spark2ctx = spark2cnv.getContext("2d");
	clipcnv.width = GlobeRad * 2;
	clipcnv.height = GlobeRad * 2;
	clipctx = clipcnv.getContext("2d");
	clipctx.fillStyle = "#000000";
	clipctx.fillRect(0, 0, GlobeRad * 2, GlobeRad * 2);
	clipctx.globalCompositeOperation = "destination-out";
	clipctx.beginPath();
	clipctx.arc(GlobeRad, GlobeRad, GlobeRad, 0, 2 * Math.PI);
	clipctx.closePath();
	clipctx.fill();
	globe(GlobeRad, GlobeRad, GlobeRad);
	bgdata = ctx.getImageData(0, 0, cnv.width, cnv.height);
	glow1cnv.width = Glow1Rad * 2;
	glow1cnv.height = Glow1Rad * 2;
	glow1ctx = glow1cnv.getContext("2d");
	glow1ctx.clearRect(0, 0, Glow1Rad * 2, Glow1Rad * 2);
	glow1ctx.beginPath();
	var x = Glow1Rad,
		y = Glow1Rad;
	var gradient2 = glow1ctx.createRadialGradient(x, y, 0, x, y, Glow1Rad);
	gradient2.addColorStop("0", "rgb(" + r2 + "," + g2 + "," + b2 + ")");
	gradient2.addColorStop("1", "rgba(" + r2 + "," + g2 + "," + b2 + ",0)");
	glow1ctx.fillStyle = gradient2;
	glow1ctx.arc(x, y, Glow1Rad, 0, 2 * Math.PI);
	glow1ctx.fill();
	glow2cnv.width = Glow2Rad * 2;
	glow2cnv.height = Glow2Rad * 2;
	glow2ctx = glow2cnv.getContext("2d");
	glow2ctx.globalCompositeOperation = "lighter";
	glow2ctx.clearRect(0, 0, Glow2Rad * 2, Glow2Rad * 2);
	glow2ctx.beginPath();
	var x = Glow2Rad,
		y = Glow2Rad;
	var gradient2 = glow2ctx.createRadialGradient(x, y, 0, x, y, Glow2Rad);
	gradient2.addColorStop("0", "rgb(" + r2 + "," + g2 + "," + b2 + ")");
	gradient2.addColorStop("0.1", "rgb(" + r2 + "," + g2 + "," + b2 + ")");
	gradient2.addColorStop("0.5", "rgba(" + r2 + "," + g2 + "," + b2 + ",0.2)");
	gradient2.addColorStop("1", "rgba(" + r2 + "," + g2 + "," + b2 + ",0)");
	glow2ctx.fillStyle = gradient2;
	glow2ctx.arc(x, y, Glow2Rad, 0, 2 * Math.PI);
	glow2ctx.fill();
	glow2ctx.fill();
}

function setcanvassize() {
	if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
	}
	if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
		winW = document.documentElement.offsetWidth;
		winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
		winW = window.innerWidth;
		winH = window.innerHeight;
	}
	var mn = winH - 80;
	if (winW < mn) mn = winW;
	if (mn > 400) mn = 400;
	var pr = GlobeRad;
	GlobeRad = Math.floor(mn / 2);
	BallRad = Math.floor(GlobeRad / 6);
	Glow1Rad = Math.floor(GlobeRad / 20);
	Glow2Rad = Math.floor(GlobeRad / 15);
	cnv.width = GlobeRad * 2;
	cnv.height = GlobeRad * 2;
	cnv.style.left = Math.floor((winW - cnv.width) / 2) + "px";
	cnv.style.top = Math.floor((winH - cnv.height) / 2) + "px";
	setbackground();
	if (pr != GlobeRad) {
		var f = GlobeRad / pr;
		for (var s = 0; s < sparks.length; s++) {
			var spark = sparks[s];
			for (var i = 0; i < spark.to.length; i++) {
				spark.from[i].x *= f;
				spark.from[i].y *= f;
				spark.to[i].x *= f;
				spark.to[i].y *= f;
			}
		}
	}
	if (!active) {
		tlast = 0;
		drawarcs();
	}
}
var frametime = new Array();
var nframetimes = 10;
var temparc = newarc(0, 1);

function GetObject(name) {
	var o = null;
	if (document.getElementById) o = document.getElementById(name);
	else if (document.all) o = document.all.item(name);
	else if (document.layers) o = document.layers[name];
	return o;
}

function globe(x, y, r) {
	var grd = ctx.createRadialGradient(x, y, 0, x, y, r);
	grd.addColorStop(0, "rgb(20,2,2)");
	grd.addColorStop(BallRad / GlobeRad, "rgb(100,10,10)");
	grd.addColorStop(BallRad / GlobeRad + 0.01, "black");
	grd.addColorStop(0.7, "rgb(0,15,20)");
	grd.addColorStop(0.80, "rgb(0,20,30)");
	grd.addColorStop(0.98, "rgb(50,15,60)");
	grd.addColorStop(0.99, "rgb(60,10,100)");
	grd.addColorStop(1.00, "rgb(80,60,100)");
	ctx.fillStyle = grd;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.fill();
}

function fps() {
	for (var i = nframetimes - 1; i > 0; i -= 1) frametime[i] = frametime[i - 1];
	frametime[0] = (new Date()).getTime();
	var f = (frametime[0] - frametime[nframetimes - 1]) / nframetimes;
	f = Math.floor(10000 / f) / 10;
}

function clear() {
	ctx.putImageData(bgdata, 0, 0);
	sparkctx.clearRect(0, 0, GlobeRad * 2, GlobeRad * 2);
	spark2ctx.clearRect(0, 0, GlobeRad * 2, GlobeRad * 2);
}
var tlast = 0;
var XX = 0;

function drawarcs() {
	if (active) afrequest = requestAnimFrame(drawarcs);
	fps();
	clear();
	ctx.globalCompositeOperation = "lighter";
	sparkctx.globalCompositeOperation = "lighter";
	//  sparkctx.lineCap="round";
	spark2ctx.globalCompositeOperation = "lighter";
	var gradient0 = sparkctx.createRadialGradient(GlobeRad, GlobeRad, 0, GlobeRad, GlobeRad, GlobeRad);
	gradient0.addColorStop("0", "rgb(" + r2 + "," + g2 + "," + b2 + ")");
	gradient0.addColorStop("0.1", "rgb(" + r0 + "," + g0 + "," + b0 + ")");
	gradient0.addColorStop("0.8", "rgba(" + r0 + "," + g0 + "," + b0 + ",0.3)");
	//  gradient0.addColorStop("0.8","rgba("+r0+","+g0+","+b0+",1)");
	gradient0.addColorStop("1.0", "rgb(" + r2 + "," + g2 + "," + b2 + ")");
	var tnow = (new Date()).getTime();
	if (tlast == 0) tlast = tnow;
	var tdelta = tnow - tlast;
	tlast = tnow;
	if (tdelta > 100) tdelta = 100;
	for (var s = 0; s < sparks.length; s++) {
		var spark = sparks[s];
		var x, y, x1, y1, x2, y2;
		for (var i = 0; i < spark.to.length; i++) {
			var x = spark.from[i].x + (spark.to[i].x - spark.from[i].x) * spark.phase;
			var y = spark.from[i].y + (spark.to[i].y - spark.from[i].y) * spark.phase;
			temparc[i].x = x;
			temparc[i].y = y;
		}
		x = temparc[0].x;
		y = temparc[0].y;
		ctx.drawImage(glow1cnv, x - Glow1Rad, y - Glow1Rad);
		//      sparkctx.lineWidth=1;
		sparkctx.lineWidth = 1.01;
		sparkctx.strokeStyle = gradient0;
		sparkctx.beginPath();
		x = temparc[0].x;
		y = temparc[0].y;
		sparkctx.moveTo(x, y);
		var i = 1;
		for (var i = 3; i < spark.to.length; i += 2) {
			x1 = temparc[i - 1].x;
			y1 = temparc[i - 1].y;
			x2 = temparc[i + 1].x;
			y2 = temparc[i + 1].y;
			x = temparc[i].x;
			y = temparc[i].y;
			x2 = x - (x2 - x);
			y2 = y - (y2 - y);
			sparkctx.bezierCurveTo(x1, y1, x2, y2, x, y);
		}
		x = x - (x2 - x);
		y = y - (y2 - y);
		sparkctx.lineTo(x, y);
		sparkctx.stroke();
		ctx.drawImage(glow2cnv, x - Glow2Rad, y - Glow2Rad);
		sparks[s].phase += (0.025 + (s * 0.0005)) * tdelta / 33;
		if (touches && sparks[s].captive) {
			var dmin = 500;
			for (var t = 0; t < touches; t++) {
				var d = Math.abs(x - touchX[t]) + Math.abs(y - touchY[t]);
				if (d < dmin) dmin = d;
			}
			if (dmin > 20) {
				sparks[s].phase = 1;
			}
		}
		if (sparks[s].phase >= 1) {
			if (Math.random() < 0.1 || (touches && Math.random() < 0.5) || (touches == 0 && sparks[s].captive)) newspark(s);
			else {
				sparks[s].phase = 0;
				sparks[s].from = sparks[s].to;
				sparks[s].th += sparks[s].dth;
				if (Math.random() < 0.5) sparks[s].from = newarc(sparks[s].th, sparks[s].f);
				sparks[s].to = newarc(sparks[s].th, sparks[s].f);
			}
		}
	}
	var linwid = 5;
	var alp = [1, 1, 1, 0.3, 0.3, 0.3];
	for (var y = -linwid; y <= linwid; y++) {
		spark2ctx.globalAlpha = alp[Math.abs(y)];
		spark2ctx.drawImage(sparkcnv, 0, y);
	}
	for (var x = -linwid; x <= linwid; x++) {
		ctx.globalAlpha = alp[Math.abs(x)];
		ctx.drawImage(spark2cnv, x, 0);
	}
	ctx.globalCompositeOperation = "lighter";
	ctx.globalAlpha = 1;
	ctx.drawImage(sparkcnv, 0, 0);
	ctx.drawImage(sparkcnv, 0, 0);
	ctx.globalCompositeOperation = "source-over";
	ctx.drawImage(clipcnv, 0, 0);
}

function newarc(th, f) {
	var x1 = GlobeRad + BallRad * Math.cos(th);
	var y1 = GlobeRad + BallRad * Math.sin(th);
	var x2 = GlobeRad + GlobeRad * Math.cos(th);
	var y2 = GlobeRad + GlobeRad * Math.sin(th);
	x1 = GlobeRad + f * (x1 - GlobeRad);
	y1 = GlobeRad + f * (y1 - GlobeRad);
	x2 = GlobeRad + f * (x2 - GlobeRad);
	y2 = GlobeRad + f * (y2 - GlobeRad);
	var NS = 3;
	var FRAC = GlobeRad * 0.8 / (1 << NS);
	var spark = new Array();
	for (var i = 0; i <= (1 << NS); i++) spark[i] = new Object();
	spark[0].x = x1;
	spark[0].y = y1;
	spark[(1 << NS)].x = x2;
	spark[(1 << NS)].y = y2;
	for (var s = NS - 1; s >= 0; s -= 1) {
		var step = 1 << s;
		for (var i = step; i < (1 << NS); i += step * 2) {
			var i1 = i - step;
			var i2 = i + step;
			var x = spark[i1].x + spark[i2].x;
			var y = spark[i1].y + spark[i2].y;
			spark[i].x = x * 0.5 + FRAC * (Math.random() * step - step * 0.5)
			spark[i].y = y * 0.5 + FRAC * (Math.random() * step - step * 0.5)
		}
	}
	return spark;
}

function newspark(s) {
	sparks[s] = new Object;
	var th = Math.random() * 2 * Math.PI;
	var f = Math.random();
	f = 1 - f * f * f * f * f;
	var dth = (Math.random() - 0.5) * 0.75;
	sparks[s].captive = false;
	if (touches && Math.random() < 0.8) {
		var t = Math.floor(Math.random() * touches);
		var d = (touchX[t] - GlobeRad) * (touchX[t] - GlobeRad) + (touchY[t] - GlobeRad) * (touchY[t] - GlobeRad);
		d = Math.sqrt(d);
		d = d / GlobeRad;
		if (d <= 1) {
			th = Math.atan2(touchY[t] - GlobeRad, touchX[t] - GlobeRad);
			f = d;
			dth *= 0.2;
			sparks[s].captive = true;
		}
	}
	sparks[s].from = newarc(th, f);
	th += dth;
	sparks[s].to = newarc(th, f);
	sparks[s].phase = Math.random();
	sparks[s].th = th;
	sparks[s].dth = dth;
	sparks[s].f = f;
}

function createarcs() {
	for (var sp = 0; sp < 25; sp++) {
		newspark(sp);
	}
}

function addsparks(n) {
	if (n > 0 && sparks.length < 50) {
		for (var i = 0; i < n; i++) newspark(sparks.length);
	}
	if (n < 0 && sparks.length >= 10) {
		var d = -n;
		sparks.splice(sparks.length - d, d);
	}
}

function mdown(e) {
	if (touches == 0) touches = 1;
	if (e.offsetX) {
		touchX[0] = e.offsetX;
		touchY[0] = e.offsetY;
	} else if (e.layerX) {
		touchX[0] = e.layerX;
		touchY[0] = e.layerY;
	}
}

function mup(e) {
	touches = 0;
}

function mmove(e) {
	if (touches == 0) return;
	if (e.offsetX) {
		touchX[0] = e.offsetX;
		touchY[0] = e.offsetY;
	} else if (e.layerX) {
		touchX[0] = e.layerX;
		touchY[0] = e.layerY;
	}
}

function tdown(e) {
	touches = e.targetTouches.length;
	for (var i = 0; i < touches; i++) {
		var touch = e.targetTouches[i];
		var xo = 0,
			yo = 0;
		var o = cnv;
		do {
			xo += o.offsetLeft;
			yo += o.offsetTop;
		} while (o = o.offsetParent);
		touchX[i] = touch.pageX - xo;
		touchY[i] = touch.pageY - yo;
	}
}

function tup(e) {
	touches = e.targetTouches.length;
	for (var i = 0; i < touches; i++) {
		var touch = e.targetTouches[i];
		var xo = 0,
			yo = 0;
		var o = cnv;
		do {
			xo += o.offsetLeft;
			yo += o.offsetTop;
		} while (o = o.offsetParent);
		touchX[i] = touch.pageX - xo;
		touchY[i] = touch.pageY - yo;
	}
}

function tmove(e) {
	if (touches == 0) return;
	touches = e.targetTouches.length;
	for (var i = 0; i < touches; i++) {
		var touch = e.targetTouches[i];
		var xo = 0,
			yo = 0;
		var o = cnv;
		do {
			xo += o.offsetLeft;
			yo += o.offsetTop;
		} while (o = o.offsetParent);
		touchX[i] = touch.pageX - xo;
		touchY[i] = touch.pageY - yo;
	}
}
var afrequest = null;

function go() {
	window.onresize = setcanvassize;
	cnv.addEventListener("mousedown", mdown);
	cnv.addEventListener("mouseup", mup);
	cnv.addEventListener("mouseout", mup);
	cnv.addEventListener("mousemove", mmove);
	cnv.addEventListener("touchstart", tdown);
	cnv.addEventListener("touchend", tup);
	cnv.addEventListener("touchmove", tmove);
	document.body.addEventListener('touchmove', function(event) {
		event.preventDefault();
	}, false);
	setcanvassize();
	createarcs();
	drawarcs();
}

function activate() {
	active = !active;
	var o = GetObject("play");
	cancelRequestAnimFrame(afrequest);
	afrequest = null;
	if (active) {
		o.innerText = "Pause";
		drawarcs();
	} else {
		o.innerText = "Play";
	}
}
var menuvis = 5;
var menuvistarget = 0;
var mvtmo = null;

function menufade(target) {
	if (arguments.length > 0) menuvistarget = target;
	if (menuvis != menuvistarget) {
		clearTimeout(mvtmo);
		mvtmo = null;
		if (menuvis < menuvistarget) {
			menuvis += 0.1;
			if (menuvis > menuvistarget) menuvis = menuvistarget;
		} else {
			menuvis -= 0.1;
			if (menuvis < menuvistarget) menuvis = menuvistarget;
		}
		var o = GetObject("menudiv");
		o.style.opacity = menuvis > 1 ? 1 : menuvis;
		var o2 = GetObject("menudiv2");
		o2.style.zIndex = (menuvis >= 1) ? "0" : "2";
		if (menuvis != menuvistarget) setTimeout("menufade()", 20);
	}
}

function visit(u) {
	if (menuvis > 0.5) {
		if (active) activate();
		window.open(u, "_blank");
	}
}
go();
menufade(0);