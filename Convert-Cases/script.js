var copied="Text copied to clipboard!",manual_copy="Press Ctrl+C to copy text",downloaded="Text downloaded!",no_text="Please enter some text first!",file_name="CorrectCaseText.txt"

function Ce(a) {
	a = a.toLowerCase();
	for (var b = !0, c = "", d = 0; d < a.length; d++) {
		var e = a.charAt(d);
		/\.|\!|\?|\n|\r/.test(e) ? b = !0 : "" != e.trim() && 1 == b && (e = e.toUpperCase(), b = !1), c += e
	}
	return "/" == window.location.pathname && -1 == window.location.search.indexOf("skip=i") && (c = c.replace(/\bi\b/g, "I")), c = _(c)
}

function Le(a) {
	a = a.toLowerCase();
	for (var b = "", c = 0; c < a.length; c++) {
		var d = a.charAt(c);
		b += c % 2 ? d.toUpperCase() : d
	}
	return b
}

function Se(a) {
	return c = a.toLowerCase(), c = (c + "").replace(/^(\S)|\s+(\S)/g, function(a) {
		return a.toUpperCase()
	}), c = _(c), c = c.replace(/\(([A-Za-z])/g, function(a) {
		return a.toUpperCase()
	}), c
}

function _(c) {
	return c = c.replace(/\"([A-Za-z])/g, function(a) {
		return a.toUpperCase()
	})
}

function Le(a) {
	a = a.toLowerCase();
	for (var b = "", c = 0; c < a.length; c++) {
		var d = a.charAt(c);
		b += c % 2 ? d.toUpperCase() : d
	}
	return b
}

function Te(a) {
	for (var s = "", i = 0; i < a.length; i++) {
		var n = a.charAt(i);
		s += n == n.toUpperCase() ? n.toLowerCase() : n.toUpperCase()
	}
	return s
}

function ke(a) {
	return a = (a = (a = Se(a)).replace(/\b(A|An|And|As|At|But|By|En|For|If|In|Of|On|Or|The|To|Vs?\\.?|Via)\b/g, function(_) {
		return _.toLowerCase()
	})).replace(/(?:([\.\?!] |\n|^))(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\\.?|via)/g, function(_) {
		return Se(_)
	})
}

function Be(_, $, ee) {
	for (var te = "", c = 0; c < _.length; c++) {
		var ne = _.charAt(c),
			re = ne;
		if (ee) re = ne.toLowerCase();
		$[re] ? te += $[re] : te += ne
	}
	return te = te.replace(/\n/g, "<br>")
}

function Ie(_, ee) {
	var $ = _.split("").reduce(function(_, $) {
		return _ + $ + ee
	}, "");
	return $ = $.replace(/\n/g, "<br>")
}

function xe(_) {
	-1 < window.location.search.indexOf("hyphenate=true") && (_.value = _.value.replace(/ /g, "-"), _.placeholder = _.placeholder.replace(/ /g, "-")), -1 < window.location.search.indexOf("stripdashes=true") && (_.value = _.value.replace(/-/g, " "), _.placeholder = _.placeholder.replace(/-/g, " ")), -1 < window.location.search.indexOf("stripspaces=true") && (_.value = _.value.replace(/ /g, ""), _.placeholder = _.placeholder.replace(/ /g, ""))
}

function Me(_, $) {
	"undefined" != typeof gtag && gtag("event", $, {
		event_category: _,
		value: parseInt(document.getElementById("word_count").innerHTML)
	})
}

function Ae(_) {
	document.getElementById("char_count").innerHTML = _.value.length;
	var $ = 0,
		ee = _.value.trim().replace(/\s+/gi, " ");
	0 < ee.length && ($ = ee.split(" ").length), document.getElementById("word_count").innerHTML = $;
	var te = 0;
	0 < _.value.length && (te = _.value.split(/\r*\n/).length), document.getElementById("line_count").innerHTML = te
}
var te;

function He(_, $) {
	clearTimeout(te);
	var ee = document.querySelector(".messages");
	ee.innerHTML = '<div class="message ' + $ + '">' + _ + "</div>", te = setTimeout(function() {
		ee.innerHTML = ""
	}, 3e3)
}
var $ = Date.now();

function Oe() {
	$ + 5e3 < Date.now() && ((window.aaw = window.aaw || {
		cmd: []
	}).cmd.push(function() {
		window.aaw.refreshAdunits(["/153247860/ConvertCase_728x90_ATF", "/153247860/ConvertCase_300x250_Belowtxtbox_1", "/153247860/ConvertCase_300x250_Belowtxtbox_2", "/153247860/ConvertCase_728x90_BTF"])
	}), $ = Date.now())
}

function je(_, ee) {
	return _.replace(/[\s\S]/g, function(_) {
		var $;
		return $ = _.charCodeAt().toString(2), _ = "00000000".slice(String($).length) + $, 0 == ee ? _ : _ + " "
	})
}

function _e(_) {
	var $ = (_ = (_ = _.replace(/\s+/g, "")).match(/.{1,8}/g).join(" ")).split(" "),
		ee = [];
	for (i = 0; i < $.length; i++) ee.push(String.fromCharCode(parseInt($[i], 2)));
	return ee.join("")
}
var t, e, a, b, Re = {
		0: "???",
		1: "??",
		2: "??",
		3: "??",
		4: "???",
		5: "???",
		6: "???",
		7: "???",
		8: "???",
		9: "???",
		"+": "???",
		"-": "???",
		"=": "???",
		"(": "???",
		")": "???",
		a: "???",
		b: "???",
		c: "???",
		d: "???",
		e: "???",
		f: "???",
		g: "???",
		h: "??",
		i: "???",
		j: "??",
		k: "???",
		l: "??",
		m: "???",
		n: "???",
		o: "???",
		p: "???",
		q: "???",
		r: "??",
		s: "??",
		t: "???",
		u: "???",
		v: "???",
		w: "??",
		x: "??",
		y: "??",
		z: "???"
	},
	Ue = {
		a: "???",
		b: "??",
		c: "???",
		d: "???",
		e: "???",
		f: "???",
		g: "??",
		h: "??",
		i: "??",
		j: "???",
		k: "???",
		l: "??",
		m: "???",
		n: "??",
		o: "???",
		p: "???",
		r: "??",
		s: "???",
		t: "???",
		u: "???",
		v: "???",
		w: "???",
		y: "??",
		z: "???"
	},
	qe = {
		" ": "???",
		0: "???",
		1: "???",
		2: "???",
		3: "???",
		4: "???",
		5: "???",
		6: "???",
		7: "???",
		8: "???",
		9: "???",
		a: "???",
		b: "???",
		c: "???",
		d: "???",
		e: "???",
		f: "???",
		g: "???",
		h: "???",
		i: "???",
		j: "???",
		k: "???",
		l: "???",
		m: "???",
		n: "???",
		o: "???",
		p: "???",
		q: "???",
		r: "???",
		s: "???",
		t: "???",
		u: "???",
		v: "???",
		w: "???",
		x: "???",
		y: "???",
		z: "???",
		A: "???",
		B: "???",
		C: "???",
		D: "???",
		E: "???",
		F: "???",
		G: "???",
		H: "???",
		I: "???",
		J: "???",
		K: "???",
		L: "???",
		M: "???",
		N: "???",
		O: "???",
		P: "???",
		Q: "???",
		R: "???",
		S: "???",
		T: "???",
		U: "???",
		V: "???",
		W: "???",
		X: "???",
		Y: "???",
		Z: "???",
		"!": "???",
		'"': "???",
		"#": "???",
		$: "???",
		"%": "???",
		"&": "???",
		"(": "???",
		")": "???",
		"*": "???",
		"+": "???",
		",": "???",
		"-": "???",
		".": "???",
		"/": "???",
		":": "???",
		";": "???",
		"<": "???",
		"=": "???",
		">": "???",
		"?": "???",
		"@": "???",
		"[": "???",
		"'": "'",
		"]": "???",
		"^": "???",
		_: "???",
		"`": "???",
		"{": "???",
		"|": "???",
		"}": "???",
		"~": "???"
	},
	De = {
		A: "????",
		B: "????",
		C: "????",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "????",
		I: "????",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "????",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????",
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		0: "????",
		1: "????",
		2: "????",
		3: "????",
		4: "????",
		5: "????",
		6: "????",
		7: "????",
		8: "????",
		9: "????"
	},
	Fe = {
		A: "????",
		B: "????",
		C: "????",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "????",
		I: "????",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "????",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????",
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????"
	},
	Pe = {
		" ": "???",
		a: "??",
		b: "q",
		c: "??",
		d: "p",
		e: "??",
		f: "??",
		g: "??",
		h: "??",
		i: "???",
		j: "??",
		k: "??",
		l: "l",
		m: "??",
		n: "u",
		o: "o",
		p: "d",
		q: "b",
		r: "??",
		s: "s",
		t: "??",
		u: "n",
		v: "??",
		w: "??",
		x: "x",
		y: "??",
		z: "z",
		A: "???",
		B: "B",
		C: "??",
		D: "???",
		E: "??",
		F: "???",
		G: "??",
		H: "H",
		I: "I",
		J: "??",
		K: "K",
		L: "??",
		M: "W",
		N: "N",
		O: "O",
		P: "??",
		Q: "Q",
		R: "R",
		S: "S",
		T: "???",
		U: "???",
		V: "??",
		W: "M",
		X: "X",
		Y: "???",
		Z: "Z",
		0: "0",
		1: "??",
		2: "???",
		3: "??",
		4: "???",
		5: "??",
		6: "9",
		7: "???",
		8: "8",
		9: "6",
		",": "'",
		".": "??",
		"?": "??",
		"!": "??",
		'"': ",,",
		"'": ",",
		"`": ",",
		"(": ")",
		")": "(",
		"[": "]",
		"]": "[",
		"{": "}",
		"}": "{",
		"<": ">",
		">": "<",
		"&": "???",
		_: "???"
	},
	ze = {
		a: "??",
		b: "d",
		c: "??",
		d: "b",
		e: "??",
		f: "??",
		g: "??",
		h: "??",
		i: "i",
		j: "???",
		k: "??",
		l: "l",
		m: "m",
		n: "n",
		o: "o",
		p: "q",
		q: "p",
		r: "??",
		s: "??",
		t: "??",
		u: "u",
		v: "v",
		w: "w",
		x: "x",
		y: "y",
		z: "z",
		A: "A",
		B: "???",
		C: "??",
		D: "???",
		E: "??",
		F: "???",
		G: "???",
		H: "H",
		I: "I",
		J: "???",
		K: "???",
		L: "???",
		M: "M",
		N: "??",
		O: "O",
		P: "???",
		Q: "???",
		R: "??",
		S: "??",
		T: "T",
		U: "U",
		V: "V",
		W: "W",
		X: "X",
		Y: "Y",
		Z: "??",
		0: "0",
		1: "1",
		2: "2",
		3: "??",
		4: "4",
		5: "5",
		6: "6",
		7: "7",
		"?": "???",
		";": "???"
	},
	Ne = {
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		A: "????",
		B: "????",
		C: "????",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "????",
		I: "????",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "????",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????",
		0: "????",
		1: "????",
		2: "????",
		3: "????",
		4: "????",
		5: "????",
		6: "????",
		7: "????",
		8: "????",
		9: "????",
		0: "????"
	},
	Ve = {
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		A: "????",
		B: "????",
		C: "????",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "????",
		I: "????",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "????",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????"
	},
	We = {
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		A: "????",
		B: "????",
		C: "????",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "????",
		I: "????",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "????",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????",
		0: "????",
		1: "????",
		2: "????",
		3: "????",
		4: "????",
		5: "????",
		6: "????",
		7: "????",
		8: "????",
		9: "????",
		0: "????"
	},
	Xe = {
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		A: "????",
		B: "????",
		C: "????",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "????",
		I: "????",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "????",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????"
	},
	Je = {
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "???",
		f: "????",
		g: "???",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "???",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		A: "????",
		B: "???",
		C: "????",
		D: "????",
		E: "???",
		F: "???",
		G: "????",
		H: "???",
		I: "???",
		J: "????",
		K: "????",
		L: "???",
		M: "???",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "???",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????"
	},
	Ye = {
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		A: "????",
		B: "????",
		C: "????",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "????",
		I: "????",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "????",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????",
		1: "????",
		2: "????",
		3: "????",
		4: "????",
		5: "????",
		6: "????",
		7: "????",
		8: "????",
		9: "????",
		0: "????",
		"!": "???",
		"?": "???"
	},
	Ze = {
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		A: "????",
		B: "????",
		C: "???",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "???",
		I: "???",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "???",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "???"
	},
	Ge = {
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		A: "????",
		B: "????",
		C: "????",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "????",
		I: "????",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "????",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????",
		1: "????",
		2: "????",
		3: "????",
		4: "????",
		5: "????",
		6: "????",
		7: "????",
		8: "????",
		9: "????",
		0: "????",
		1: "???",
		"?": "???"
	},
	Ke = {
		a: "???",
		b: "???",
		c: "???",
		d: "???",
		e: "???",
		f: "???",
		g: "???",
		h: "???",
		i: "???",
		j: "???",
		k: "???",
		l: "???",
		m: "???",
		n: "???",
		o: "???",
		p: "???",
		q: "???",
		r: "???",
		s: "???",
		t: "???",
		u: "???",
		v: "???",
		w: "???",
		x: "???",
		y: "???",
		z: "???",
		A: "???",
		B: "???",
		C: "???",
		D: "???",
		E: "???",
		F: "???",
		G: "???",
		H: "???",
		I: "???",
		J: "???",
		K: "???",
		L: "???",
		M: "???",
		N: "???",
		O: "???",
		P: "???",
		Q: "???",
		R: "???",
		S: "???",
		T: "???",
		U: "???",
		V: "???",
		W: "???",
		X: "???",
		Y: "???",
		Z: "???",
		1: "???",
		2: "???",
		3: "???",
		4: "???",
		5: "???",
		6: "???",
		7: "???",
		8: "???",
		9: "???",
		".": "???"
	},
	Qe = {
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		A: "????",
		B: "????",
		C: "????",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "????",
		I: "????",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "????",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????",
		0: "???"
	},
	$e = {
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		A: "????",
		B: "????",
		C: "????",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "????",
		I: "????",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "????",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????",
		".": "???"
	},
	et = {
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		A: "????",
		B: "????",
		C: "????",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "????",
		I: "????",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "????",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????"
	},
	tt = {
		a: "????",
		b: "????",
		c: "????",
		d: "????",
		e: "????",
		f: "????",
		g: "????",
		h: "????",
		i: "????",
		j: "????",
		k: "????",
		l: "????",
		m: "????",
		n: "????",
		o: "????",
		p: "????",
		q: "????",
		r: "????",
		s: "????",
		t: "????",
		u: "????",
		v: "????",
		w: "????",
		x: "????",
		y: "????",
		z: "????",
		A: "????",
		B: "????",
		C: "????",
		D: "????",
		E: "????",
		F: "????",
		G: "????",
		H: "????",
		I: "????",
		J: "????",
		K: "????",
		L: "????",
		M: "????",
		N: "????",
		O: "????",
		P: "????",
		Q: "????",
		R: "????",
		S: "????",
		T: "????",
		U: "????",
		V: "????",
		W: "????",
		X: "????",
		Y: "????",
		Z: "????",
		1: "????",
		2: "????",
		3: "????",
		4: "????",
		5: "????",
		6: "????",
		7: "????",
		8: "????",
		9: "????",
		0: "????",
		"!": "???",
		"?": "???",
		".": "???"
	};
t = this, e = function() {
	return o = {}, r.m = n = [function(t, e) {
		t.exports = function(t) {
			var e;
			if ("SELECT" === t.nodeName) t.focus(), e = t.value;
			else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
				var n = t.hasAttribute("readonly");
				n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), e = t.value
			} else {
				t.hasAttribute("contenteditable") && t.focus();
				var o = window.getSelection(),
					r = document.createRange();
				r.selectNodeContents(t), o.removeAllRanges(), o.addRange(r), e = o.toString()
			}
			return e
		}
	}, function(t, e) {
		function n() {}
		n.prototype = {
			on: function(t, e, n) {
				var o = this.e || (this.e = {});
				return (o[t] || (o[t] = [])).push({
					fn: e,
					ctx: n
				}), this
			},
			once: function(t, e, n) {
				var o = this;

				function r() {
					o.off(t, r), e.apply(n, arguments)
				}
				return r._ = e, this.on(t, r, n)
			},
			emit: function(t) {
				for (var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), o = 0, r = n.length; o < r; o++) n[o].fn.apply(n[o].ctx, e);
				return this
			},
			off: function(t, e) {
				var n = this.e || (this.e = {}),
					o = n[t],
					r = [];
				if (o && e)
					for (var i = 0, a = o.length; i < a; i++) o[i].fn !== e && o[i].fn._ !== e && r.push(o[i]);
				return r.length ? n[t] = r : delete n[t], this
			}
		}, t.exports = n, t.exports.TinyEmitter = n
	}, function(t, e, n) {
		var d = n(3),
			h = n(4);
		t.exports = function(t, e, n) {
			if (!t && !e && !n) throw new Error("Missing required arguments");
			if (!d.string(e)) throw new TypeError("Second argument must be a String");
			if (!d.fn(n)) throw new TypeError("Third argument must be a Function");
			if (d.node(t)) return s = e, f = n, (u = t).addEventListener(s, f), {
				destroy: function() {
					u.removeEventListener(s, f)
				}
			};
			if (d.nodeList(t)) return a = t, c = e, l = n, Array.prototype.forEach.call(a, function(t) {
				t.addEventListener(c, l)
			}), {
				destroy: function() {
					Array.prototype.forEach.call(a, function(t) {
						t.removeEventListener(c, l)
					})
				}
			};
			if (d.string(t)) return o = t, r = e, i = n, h(document.body, o, r, i);
			throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
			var o, r, i, a, c, l, u, s, f
		}
	}, function(t, n) {
		n.node = function(t) {
			return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
		}, n.nodeList = function(t) {
			var e = Object.prototype.toString.call(t);
			return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]))
		}, n.string = function(t) {
			return "string" == typeof t || t instanceof String
		}, n.fn = function(t) {
			return "[object Function]" === Object.prototype.toString.call(t)
		}
	}, function(t, e, n) {
		var a = n(5);

		function i(t, e, n, o, r) {
			var i = function(e, n, t, o) {
				return function(t) {
					t.delegateTarget = a(t.target, n), t.delegateTarget && o.call(e, t)
				}
			}.apply(this, arguments);
			return t.addEventListener(n, i, r), {
				destroy: function() {
					t.removeEventListener(n, i, r)
				}
			}
		}
		t.exports = function(t, e, n, o, r) {
			return "function" == typeof t.addEventListener ? i.apply(null, arguments) : "function" == typeof n ? i.bind(null, document).apply(null, arguments) : ("string" == typeof t && (t = document.querySelectorAll(t)), Array.prototype.map.call(t, function(t) {
				return i(t, e, n, o, r)
			}))
		}
	}, function(t, e) {
		if ("undefined" != typeof Element && !Element.prototype.matches) {
			var n = Element.prototype;
			n.matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector
		}
		t.exports = function(t, e) {
			for (; t && 9 !== t.nodeType;) {
				if ("function" == typeof t.matches && t.matches(e)) return t;
				t = t.parentNode
			}
		}
	}, function(t, e, n) {
		"use strict";
		n.r(e);
		var o = n(0),
			r = n.n(o),
			i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
				return typeof t
			} : function(t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			};

		function a(t, e) {
			for (var n = 0; n < e.length; n++) {
				var o = e[n];
				o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
			}
		}

		function c(t) {
			! function(t, e) {
				if (!(t instanceof c)) throw new TypeError("Cannot call a class as a function")
			}(this), this.resolveOptions(t), this.initSelection()
		}
		var l = (function(t, e, n) {
				a(t.prototype, e)
			}(c, [{
				key: "resolveOptions",
				value: function(t) {
					var e = 0 < arguments.length && void 0 !== t ? t : {};
					this.action = e.action, this.container = e.container, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = ""
				}
			}, {
				key: "initSelection",
				value: function() {
					this.text ? this.selectFake() : this.target && this.selectTarget()
				}
			}, {
				key: "selectFake",
				value: function() {
					var t = this,
						e = "rtl" == document.documentElement.getAttribute("dir");
					this.removeFake(), this.fakeHandlerCallback = function() {
						return t.removeFake()
					}, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[e ? "right" : "left"] = "-9999px";
					var n = window.pageYOffset || document.documentElement.scrollTop;
					this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = r()(this.fakeElem), this.copyText()
				}
			}, {
				key: "removeFake",
				value: function() {
					this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
				}
			}, {
				key: "selectTarget",
				value: function() {
					this.selectedText = r()(this.target), this.copyText()
				}
			}, {
				key: "copyText",
				value: function() {
					var e = void 0;
					try {
						e = document.execCommand(this.action)
					} catch (t) {
						e = !1
					}
					this.handleResult(e)
				}
			}, {
				key: "handleResult",
				value: function(t) {
					this.emitter.emit(t ? "success" : "error", {
						action: this.action,
						text: this.selectedText,
						trigger: this.trigger,
						clearSelection: this.clearSelection.bind(this)
					})
				}
			}, {
				key: "clearSelection",
				value: function() {
					this.trigger && this.trigger.focus(), document.activeElement.blur(), window.getSelection().removeAllRanges()
				}
			}, {
				key: "destroy",
				value: function() {
					this.removeFake()
				}
			}, {
				key: "action",
				set: function(t) {
					var e = 0 < arguments.length && void 0 !== t ? t : "copy";
					if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
				},
				get: function() {
					return this._action
				}
			}, {
				key: "target",
				set: function(t) {
					if (void 0 !== t) {
						if (!t || "object" !== (void 0 === t ? "undefined" : i(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
						if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
						if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
						this._target = t
					}
				},
				get: function() {
					return this._target
				}
			}]), c),
			u = n(1),
			s = n.n(u),
			f = n(2),
			d = n.n(f),
			h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
				return typeof t
			} : function(t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			};

		function y(t, e) {
			for (var n = 0; n < e.length; n++) {
				var o = e[n];
				o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
			}
		}
		var m = (function(t, e) {
			if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
			t.prototype = Object.create(e && e.prototype, {
				constructor: {
					value: t,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
		}(v, s.a), function(t, e, n) {
			e && y(t.prototype, e), n && y(t, n)
		}(v, [{
			key: "resolveOptions",
			value: function(t) {
				var e = 0 < arguments.length && void 0 !== t ? t : {};
				this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === h(e.container) ? e.container : document.body
			}
		}, {
			key: "listenClick",
			value: function(t) {
				var e = this;
				this.listener = d()(t, "click", function(t) {
					return e.onClick(t)
				})
			}
		}, {
			key: "onClick",
			value: function(t) {
				var e = t.delegateTarget || t.currentTarget;
				this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l({
					action: this.action(e),
					target: this.target(e),
					text: this.text(e),
					container: this.container,
					trigger: e,
					emitter: this
				})
			}
		}, {
			key: "defaultAction",
			value: function(t) {
				return b("action", t)
			}
		}, {
			key: "defaultTarget",
			value: function(t) {
				var e = b("target", t);
				if (e) return document.querySelector(e)
			}
		}, {
			key: "defaultText",
			value: function(t) {
				return b("text", t)
			}
		}, {
			key: "destroy",
			value: function() {
				this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
			}
		}], [{
			key: "isSupported",
			value: function(t) {
				var e = 0 < arguments.length && void 0 !== t ? t : ["copy", "cut"],
					n = "string" == typeof e ? [e] : e,
					o = !!document.queryCommandSupported;
				return n.forEach(function(t) {
					o = o && !!document.queryCommandSupported(t)
				}), o
			}
		}]), v);

		function v(t, e) {
			! function(t, e) {
				if (!(t instanceof v)) throw new TypeError("Cannot call a class as a function")
			}(this);
			var n = function(t, e) {
				if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return !e || "object" != typeof e && "function" != typeof e ? t : e
			}(this, (v.__proto__ || Object.getPrototypeOf(v)).call(this));
			return n.resolveOptions(e), n.listenClick(t), n
		}

		function b(t, e) {
			var n = "data-clipboard-" + t;
			if (e.hasAttribute(n)) return e.getAttribute(n)
		}
		e.default = m
	}], r.c = o, r.d = function(t, e, n) {
		r.o(t, e) || Object.defineProperty(t, e, {
			enumerable: !0,
			get: n
		})
	}, r.r = function(t) {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(t, "__esModule", {
			value: !0
		})
	}, r.t = function(e, t) {
		if (1 & t && (e = r(e)), 8 & t) return e;
		if (4 & t && "object" == typeof e && e && e.__esModule) return e;
		var n = Object.create(null);
		if (r.r(n), Object.defineProperty(n, "default", {
				enumerable: !0,
				value: e
			}), 2 & t && "string" != typeof e)
			for (var o in e) r.d(n, o, function(t) {
				return e[t]
			}.bind(null, o));
		return n
	}, r.n = function(t) {
		var e = t && t.__esModule ? function() {
			return t.default
		} : function() {
			return t
		};
		return r.d(e, "a", e), e
	}, r.o = function(t, e) {
		return Object.prototype.hasOwnProperty.call(t, e)
	}, r.p = "", r(r.s = 6).default;

	function r(t) {
		if (o[t]) return o[t].exports;
		var e = o[t] = {
			i: t,
			l: !1,
			exports: {}
		};
		return n[t].call(e.exports, e, e.exports, r), e.l = !0, e.exports
	}
	var n, o
}, "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.ClipboardJS = e() : t.ClipboardJS = e(), a = this, b = function() {
	"use strict";

	function c(b, c, d) {
		var e = new XMLHttpRequest;
		e.open("GET", b), e.responseType = "blob", e.onload = function() {
			a(e.response, c, d)
		}, e.onerror = function() {
			console.error("could not download file")
		}, e.send()
	}

	function d(a) {
		var b = new XMLHttpRequest;
		b.open("HEAD", a, !1);
		try {
			b.send()
		} catch (a) {}
		return 200 <= b.status && b.status <= 299
	}

	function e(a) {
		try {
			a.dispatchEvent(new MouseEvent("click"))
		} catch (c) {
			var b = document.createEvent("MouseEvents");
			b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b)
		}
	}
	var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0,
		a = f.saveAs || ("object" != typeof window || window !== f ? function() {} : "download" in HTMLAnchorElement.prototype ? function(b, g, h) {
			var i = f.URL || f.webkitURL,
				j = document.createElement("a");
			g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), setTimeout(function() {
				i.revokeObjectURL(j.href)
			}, 4e4), setTimeout(function() {
				e(j)
			}, 0))
		} : "msSaveOrOpenBlob" in navigator ? function(f, g, h) {
			if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(function(a, b) {
				return void 0 === b ? b = {
					autoBom: !1
				} : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), b = {
					autoBom: !b
				}), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\ufeff", a], {
					type: a.type
				}) : a
			}(f, h), g);
			else if (d(f)) c(f, g, h);
			else {
				var i = document.createElement("a");
				i.href = f, i.target = "_blank", setTimeout(function() {
					e(i)
				})
			}
		} : function(a, b, d, e) {
			if ((e = e || open("", "_blank")) && (e.document.title = e.document.body.innerText = "downloading..."), "string" == typeof a) return c(a, b, d);
			var g = "application/octet-stream" === a.type,
				h = /constructor/i.test(f.HTMLElement) || f.safari,
				i = /CriOS\/[\d]+/.test(navigator.userAgent);
			if ((i || g && h) && "object" == typeof FileReader) {
				var j = new FileReader;
				j.onloadend = function() {
					var a = j.result;
					a = i ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), e ? e.location.href = a : location = a, e = null
				}, j.readAsDataURL(a)
			} else {
				var k = f.URL || f.webkitURL,
					l = k.createObjectURL(a);
				e ? e.location = l : location.href = l, e = null, setTimeout(function() {
					k.revokeObjectURL(l)
				}, 4e4)
			}
		});
	f.saveAs = a.saveAs = a, "undefined" != typeof module && (module.exports = a)
}, "function" == typeof define && define.amd ? define([], b) : "undefined" != typeof exports ? b() : (b(), a.FileSaver = {}), document.addEventListener("DOMContentLoaded", function() {
	var ne = document.getElementById("content");
	if (null != ne) {
		if (document.getElementById("upper") && document.getElementById("upper").addEventListener("click", function(e) {
				return e.preventDefault(), ne.value = ne.value.toUpperCase(), ne.placeholder = ne.placeholder.toUpperCase(), xe(ne), Me("Convert", "Upper"), Oe(), !1
			}), document.getElementById("lower") && document.getElementById("lower").addEventListener("click", function(e) {
				return e.preventDefault(), ne.value = ne.value.toLowerCase(), ne.placeholder = ne.placeholder.toLowerCase(), xe(ne), Me("Convert", "Lower"), Oe(), !1
			}), document.getElementById("capitalized") && document.getElementById("capitalized").addEventListener("click", function(e) {
				return e.preventDefault(), ne.value = Se(ne.value.toLowerCase()), ne.placeholder = Se(ne.placeholder.toLowerCase()), xe(ne), Me("Convert", "Capitalized"), Oe(), !1
			}), document.getElementById("sentence") && document.getElementById("sentence").addEventListener("click", function(e) {
				return e.preventDefault(), ne.value = Ce(ne.value), ne.placeholder = Ce(ne.placeholder), xe(ne), Me("Convert", "Sentence"), Oe(), !1
			}), document.getElementById("alternating") && document.getElementById("alternating").addEventListener("click", function(e) {
				return e.preventDefault(), ne.value = Le(ne.value), ne.placeholder = Le(ne.placeholder), xe(ne), Me("Convert", "Alternating"), Oe(), !1
			}), document.getElementById("inverse") && document.getElementById("inverse").addEventListener("click", function(e) {
				return e.preventDefault(), ne.value = Te(ne.value), ne.placeholder = Te(ne.placeholder), xe(ne), Me("Convert", "Inverse"), Oe(), !1
			}), document.getElementById("title") && document.getElementById("title").addEventListener("click", function(e) {
				return e.preventDefault(), ne.value = ke(ne.value), ne.placeholder = ke(ne.placeholder), xe(ne), Me("Convert", "Title"), Oe(), !1
			}), document.getElementById("clear") && document.getElementById("clear").addEventListener("click", function(e) {
				return e.preventDefault(), ne.value = "", ne.placeholder = Ce(ne.placeholder.toLowerCase()), Ae(ne), Me("Clear", "Clear"), Oe(), !1
			}), document.getElementById("smalltext")) {
			function _() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), document.getElementById("output").innerHTML = "<h3>" + smallcaps + "</h3><p>" + Be(_, Ue, !0) + "</p>", document.getElementById("output").innerHTML += "<h3>" + superscript + "</h3><p>" + Be(_, Re, !0) + "</p>"
			}
			_(), ne.addEventListener("input", function(e) {
				_(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				_(), Oe()
			})
		}
		if (document.getElementById("unicode")) {
			function $() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), document.getElementById("output").innerHTML = "<h3>" + script + "</h3><p>" + Be(_, Je, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + script_bold + "</h3><p>" + Be(_, Ye, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + fraktur + "</h3><p>" + Be(_, Ze, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + fraktur_bold + "</h3><p>" + Be(_, Ge, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + circled + "</h3><p>" + Be(_, Ke, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + circled_inverted + "</h3><p>" + Be(_, Qe, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + squared + "</h3><p>" + Be(_, $e, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + squared_inverted + "</h3><p>" + Be(_, et, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + caps + "</h3><p>" + Be(_, Ue, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + full + "</h3><p>" + Be(_, qe, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + mono + "</h3><p>" + Be(_, tt, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + sans + "</h3><p>" + Be(_, Ne, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + sans_italic + "</h3><p>" + Be(_, Ve, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + sans_bold + "</h3><p>" + Be(_, We, !1) + "</p>", document.getElementById("output").innerHTML += "<h3>" + sans_bold_italic + "</h3><p>" + Be(_, Xe, !1) + "</p>"
			}
			$(), ne.addEventListener("input", function(e) {
				$(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				$(), Oe()
			})
		}
		if (document.getElementById("widetext")) {
			function ee() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), document.getElementById("output").innerHTML = "<p>" + Be(_, qe, !1) + "</p>"
			}
			ee(), ne.addEventListener("input", function(e) {
				ee(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				ee(), Oe()
			})
		}
		if (document.getElementById("boldtext")) {
			function te() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), document.getElementById("output").innerHTML = "<p>" + Be(_, De, !1) + "</p>"
			}
			te(), ne.addEventListener("input", function(e) {
				te(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				te(), Oe()
			})
		}
		if (document.getElementById("italictext")) {
			function re() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), document.getElementById("output").innerHTML = "<p>" + Be(_, Fe, !1) + "</p>"
			}
			re(), ne.addEventListener("input", function(e) {
				re(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				re(), Oe()
			})
		}
		if (document.getElementById("underlinetext")) {
			function oe() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), document.getElementById("output").innerHTML = "<p>" + Ie(_, "??") + "</p>"
			}
			oe(), ne.addEventListener("input", function(e) {
				oe(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				oe(), Oe()
			})
		}
		if (document.getElementById("glitchtext")) {
			function ie() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), document.getElementById("output").innerHTML = "<p>" + function(a) {
					for (var _ = [], $ = [], ee = [], i = 768; i <= 789; i++) _.push(String.fromCharCode(i));
					for (i = 790; i <= 819; i++) 794 != i && 795 != i && ee.push(String.fromCharCode(i));
					for (_.push(String.fromCharCode(794)), _.push(String.fromCharCode(795)), i = 820; i <= 824; i++) $.push(String.fromCharCode(i));
					for (i = 825; i <= 828; i++) ee.push(String.fromCharCode(i));
					for (i = 829; i <= 836; i++) _.push(String.fromCharCode(i));
					_.push(String.fromCharCode(836)), ee.push(String.fromCharCode(837)), _.push(String.fromCharCode(838)), ee.push(String.fromCharCode(839)), ee.push(String.fromCharCode(840)), ee.push(String.fromCharCode(841)), _.push(String.fromCharCode(842)), _.push(String.fromCharCode(843)), _.push(String.fromCharCode(844)), ee.push(String.fromCharCode(845)), ee.push(String.fromCharCode(846)), _.push(String.fromCharCode(848)), _.push(String.fromCharCode(849)), _.push(String.fromCharCode(850)), ee.push(String.fromCharCode(851)), ee.push(String.fromCharCode(852)), ee.push(String.fromCharCode(853)), ee.push(String.fromCharCode(854)), _.push(String.fromCharCode(855)), _.push(String.fromCharCode(856)), ee.push(String.fromCharCode(857)), ee.push(String.fromCharCode(858)), _.push(String.fromCharCode(859)), ee.push(String.fromCharCode(860)), _.push(String.fromCharCode(861)), _.push(String.fromCharCode(861)), ee.push(String.fromCharCode(863)), _.push(String.fromCharCode(864)), _.push(String.fromCharCode(865));
					for (var b = "", c = 0; c < a.length; c++) {
						var d = a.charAt(c);
						if (!/\s/.test(d)) {
							d += $[Math.floor(Math.random() * $.length)];
							for (var te = _.length - 1, ne = 0, re = 10 - 10 * Math.random(); ne < re; ne++) d += _[Math.floor(Math.random() * te)];
							var oe = ee.length - 1;
							for (ne = 0, re = 10 - 10 * Math.random(); ne < re; ne++) d += ee[Math.floor(Math.random() * oe)]
						}
						b += d
					}
					return b = b.replace(/\n/g, "<br>")
				}(_) + "</p>"
			}
			ie(), ne.addEventListener("input", function(e) {
				ie(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				ie(), Oe()
			})
		}
		if (document.getElementById("upsidedown")) {
			function ae() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), _ = _.split("").reverse().join(""), document.getElementById("output").innerHTML = "<p>" + Be(_, Pe, !1) + "</p>"
			}
			ae(), ne.addEventListener("input", function(e) {
				ae(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				ae(), Oe()
			})
		}
		if (document.getElementById("mirror")) {
			function ue() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), _ = _.split("").reverse().join(""), document.getElementById("output").innerHTML = "<p>" + Be(_, ze, !1) + "</p>"
			}
			ue(), ne.addEventListener("input", function(e) {
				ue(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				ue(), Oe()
			})
		}
		if (document.getElementById("strikethrough")) {
			function ce() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), document.getElementById("output").innerHTML = "<p>" + Ie(_, "??") + "</p>"
			}
			ce(), ne.addEventListener("input", function(e) {
				ce(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				ce(), Oe()
			})
		}
		if (document.getElementById("backwards")) {
			function le() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), document.getElementById("output").innerHTML = "<p>" + _.split("").reverse().join("").replace(/\n/g, "<br>") + "</p>"
			}
			le(), ne.addEventListener("input", function(e) {
				le(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				le(), Oe()
			})
		}
		if (document.getElementById("morse")) {
			var de = document.getElementById("translated");

			function se(_) {
				var $ = ne,
					ee = "translated";
				if (_) $ = de, ee = "content";
				var te = $.value;
				"" == te && (te = $.placeholder), document.getElementById(ee).value = function(_, $) {
					var ee = {
						a: ".-",
						b: "-...",
						c: "-.-.",
						d: "-..",
						e: ".",
						f: "..-.",
						g: "--.",
						h: "....",
						i: "..",
						j: ".---",
						k: "-.-",
						l: ".-..",
						m: "--",
						n: "-.",
						o: "---",
						p: ".--.",
						q: "--.-",
						r: ".-.",
						s: "...",
						t: "-",
						u: "..-",
						v: "...-",
						w: ".--",
						x: "-..-",
						y: "-.--",
						z: "--..",
						1: ".----",
						2: "..---",
						3: "...--",
						4: "....-",
						5: ".....",
						6: "-....",
						7: "--...",
						8: "---..",
						9: "----.",
						0: "-----",
						".": ".-.-.-",
						",": "--..--",
						"?": "..--..",
						"'": ".----.",
						"/": "-..-.",
						"(": "-.--.",
						")": "-.--.-",
						"&": ".-...",
						":": "---...",
						";": "-.-.-.",
						"=": "-...-",
						"+": ".-.-.",
						"-": "-....-",
						_: "..--.-",
						'"': ".-..-.",
						$: "...-..-",
						"!": "-.-.--",
						"@": ".--.-.",
						" ": "/"
					};
					if ($) {
						var k, te = {};
						for (k in ee) ee.hasOwnProperty(k) && (te[ee[k]] = k);
						return ee = te, Ce((_ = (_ = _.replace(/\_/g, "-")).replace(/\|/g, "/")).split(" ").filter(function(v) {
							return ee.hasOwnProperty(v.toLowerCase())
						}).map(function(v) {
							return ee[v.toLowerCase()]
						}).join(""))
					}
					return _.split("").filter(function(v) {
						return ee.hasOwnProperty(v.toLowerCase())
					}).map(function(v) {
						return ee[v.toLowerCase()].toUpperCase()
					}).join(" ").replace(/,\/,/g, "/")
				}(te, _), _ && Ae(ne)
			}
			if (se(!1), ne.addEventListener("input", function(e) {
					se(!1), Oe()
				}), ne.addEventListener("propertychange", function(e) {
					se(!1), Oe()
				}), de.addEventListener("input", function(e) {
					se(!0), Oe()
				}), de.addEventListener("propertychange", function(e) {
					se(!0), Oe()
				}), "AudioContext" in window || "webkitAudioContext" in window) {
				var fe = document.getElementById("playmorse");
				fe.style.display = "block", fe.addEventListener("click", function(e) {
					! function(_) {
						var $ = new(window.AudioContext || window.webkitAudioContext),
							t = $.currentTime,
							ee = $.createOscillator();
						ee.type = "sine", ee.frequency.value = 600;
						var te = $.createGain();
						te.gain.setValueAtTime(0, t), _.split("").forEach(function(_) {
							switch (_) {
								case ".":
									te.gain.setValueAtTime(1, t), t += .08, te.gain.setValueAtTime(0, t), t += .08;
									break;
								case "-":
									te.gain.setValueAtTime(1, t), t += .24, te.gain.setValueAtTime(0, t), t += .08;
									break;
								case " ":
								case "/":
									t += .56
							}
						}), ee.connect(te), te.connect($.destination), ee.start()
					}(document.getElementById("translated").value), Oe()
				})
			}
		}
		if (document.getElementById("binary")) {
			de = document.getElementById("translated");

			function pe(_) {
				var $ = ne,
					ee = "translated";
				if (_) $ = de, ee = "content";
				var te = $.value;
				"" == te && (te = $.placeholder), _ ? (document.getElementById(ee).value = _e(te), Ae(ne)) : document.getElementById(ee).value = je(te)
			}
			pe(!1), ne.addEventListener("input", function(e) {
				pe(!1), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				pe(!1), Oe()
			}), de.addEventListener("input", function(e) {
				pe(!0), Oe()
			}), de.addEventListener("propertychange", function(e) {
				pe(!0), Oe()
			})
		}
		if (document.getElementById("titlecase")) {
			function he() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), document.getElementById("output").innerHTML = "<p>" + ke(_).replace(/\n/g, "<br>") + "</p>"
			}
			he(), ne.addEventListener("input", function(e) {
				he(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				he(), Oe()
			})
		}
		if (document.getElementById("sentencecase")) {
			function me() {
				var _ = ne.value;
				"" == _ && (_ = ne.placeholder), document.getElementById("output").innerHTML = "<p>" + Ce(_).replace(/\n/g, "<br>") + "</p>"
			}
			me(), ne.addEventListener("input", function(e) {
				me(), Oe()
			}), ne.addEventListener("propertychange", function(e) {
				me(), Oe()
			})
		}
		ne.addEventListener("focus", function() {
			Ae(ne)
		}), ne.addEventListener("blur", function() {
			Ae(ne)
		}), ne.addEventListener("input", function() {
			Ae(ne)
		}), ne.addEventListener("propertychange", function() {
			Ae(ne)
		}), Ae(ne);
		var ve = new ClipboardJS("#copy");
		ve.on("success", function(e) {
			He(copied, "success"), Me("Copied", "Copied"), Oe(), e.clearSelection()
		}), ve.on("error", function(e) {
			He(manual_copy, "info"), Me("Copied", "Manual"), Oe()
		});
		try {
			new Blob;
			var ge = document.getElementById("download");
			ge && (ge.style.display = "inline-block", ge.addEventListener("click", function(e) {
				if (0 == ne.length) He(no_text, "error");
				else {
					if ("innerText" === ge.getAttribute("data-download-type")) var _ = document.getElementById(ge.getAttribute("data-download-target").slice(1)).innerText.replace(/\n/g, "\r\n");
					else _ = document.getElementById(ge.getAttribute("data-download-target").slice(1)).value.replace(/\n/g, "\r\n");
					var $ = new Blob([_], {
						type: "text/plain;charset=utf-8"
					});
					saveAs($, file_name), He(downloaded, "success"), Me("Download", "Download"), Oe()
				}
				return !1
			}))
		} catch (e) {}
		for (var ye = document.querySelectorAll(".share"), i = 0; i < ye.length; i++) ye[i].addEventListener("click", function(e) {
			var _, $, ee, te, ne;
			return e.preventDefault(), _ = this.href, $ = 520, ee = 320, te = screen.width / 2 - $ / 2, ne = screen.height / 2 - ee / 2, window.open(_, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + $ + ",height=" + ee + ",top=" + ne + ",left=" + te), !1
		})
	}
	var Ee = document.getElementById("menu");
	Ee.classList.add("js");
	var be = window.location.pathname.split("/")[1];

	function we() {
		var _ = Ee.offsetWidth,
			$ = 0;
		Ee.classList.remove("overflowed");
		for (var ee = Ee.children, i = 0; i < ee.length; i++) ee[i].classList.remove("overflowed"), ee[i].classList.contains("more") && ee[i].parentNode.removeChild(ee[i]);
		for (ee = Ee.children, i = 0; i < ee.length; i++) {
			var te = ee[i].childNodes[0];
			if ("" == be && 0 == i ? te.classList.add("active") : "" != be && -1 < te.getAttribute("href").indexOf("/" + be + "/") && -1 < !te.getAttribute("href").indexOf("onlinenotepad") && te.classList.add("active"), !ee[i].classList.contains("more")) {
				var ne = $ + ee[i].offsetWidth;
				if (_ < ne) {
					if (0 == document.querySelectorAll("#menu .more ul").length) {
						Ee.innerHTML += '<li class="more"><a href="#">More Tools</a><ul></ul></li>';
						var re = document.querySelectorAll("#menu .more ul")[0];
						document.querySelectorAll("#menu .more > a")[0].addEventListener("click", function(e) {
							return e.preventDefault(), re.parentNode.classList.toggle("open"), !1
						})
					}
					Ee.classList.add("overflowed"), ee[i].classList.add("overflowed"), re.innerHTML += ee[i].innerHTML
				} else $ = ne
			}
		}
		var oe = document.querySelectorAll("#menu li.overflowed");
		if (0 < oe.length) {
			var ie = oe[0].previousElementSibling;
			ie.classList.add("overflowed"), re.innerHTML = ie.innerHTML + re.innerHTML
		}
	}
	we(), window.onresize = function(_) {
		we()
	}
}), "serviceWorker" in navigator && navigator.serviceWorker.register("/sw.js");

// TITLE
(function titleScroller(text) {
    document.title = text;
    setTimeout(function () {
        titleScroller(text.substr(1) + text.substr(0, 1));
    }, 150);
}("Convert Cases (Upper Case, Lower Case, Alternating Case, and many more!   "));