function SoundMeter(context) {
	this.context = context;
	this.instant = 0.0;
	this.slow = 0.0;
	this.clip = 0.0;
	this.script = context.createScriptProcessor(2048, 1, 1);
	const that = this;
	this.script.onaudioprocess = function(event) {
		const input = event.inputBuffer.getChannelData(0);
		let i;
		let sum = 0.0;
		let clipcount = 0;
		for (i = 0; i < input.length; ++i) {
			sum += input[i] * input[i];
			if (Math.abs(input[i]) > 0.99) {
				clipcount += 1;
			}
		}
		that.instant = Math.sqrt(sum / input.length);
		that.slow = 0.95 * that.slow + 0.05 * that.instant;
		that.clip = clipcount / input.length;
	};
}

SoundMeter.prototype.connectToSource = function(stream, callback) {
	console.log('SoundMeter connecting');
	try {
		this.mic = this.context.createMediaStreamSource(stream);
		this.mic.connect(this.script);
		// necessary to make sample run, but should not be.
		this.script.connect(this.context.destination);
		if (typeof callback !== 'undefined') {
			callback(null);
		}
	} catch (e) {
		console.error(e);
		if (typeof callback !== 'undefined') {
			callback(e);
		}
	}
};

SoundMeter.prototype.stop = function() {
	console.log('SoundMeter stopping');
	this.mic.disconnect();
	this.script.disconnect();
};

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
startButton.onclick = start;
stopButton.onclick = stop;
const instantMeter = document.querySelector('#instant meter');
const slowMeter = document.querySelector('#slow meter');
const clipMeter = document.querySelector('#clip meter');
const instantValueDisplay = document.querySelector('#instant .value');
const slowValueDisplay = document.querySelector('#slow .value');
const clipValueDisplay = document.querySelector('#clip .value');

const constraints = window.constraints = {
	audio: true,
	video: false
};

let meterRefresh = null;

function handleSuccess(stream) {
	window.stream = stream;
	const soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
	soundMeter.connectToSource(stream, function(e) {
		if (e) {
			alert(e);
			return;
		}
		meterRefresh = setInterval(() => {
			instantMeter.value = instantValueDisplay.innerText = soundMeter.instant.toFixed(2);
			slowMeter.value = slowValueDisplay.innerText = soundMeter.slow.toFixed(2);
			clipMeter.value = clipValueDisplay.innerText = soundMeter.clip;
		}, 200);
	});
}

function handleError(error) {
	console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function start() {
	console.log('Requesting local stream');
	startButton.disabled = true;
	stopButton.disabled = false;
	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		window.audioContext = new AudioContext();
	} catch (e) {
		alert('Web Audio API not supported.');
	}
	navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
}

function stop() {
	console.log('Stopping local stream');
	startButton.disabled = false;
	stopButton.disabled = true;
	window.stream.getTracks().forEach(track => track.stop());
	window.soundMeter.stop();
	clearInterval(meterRefresh);
	instantMeter.value = instantValueDisplay.innerText = '';
	slowMeter.value = slowValueDisplay.innerText = '';
	clipMeter.value = clipValueDisplay.innerText = '';
}