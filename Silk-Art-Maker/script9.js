(function() {
	var CanvasUtil, PointPreviewSilk, Recorder, Silk, Sparks, Tape, initTips, initUI, _ref,
		__bind = function(fn, me) {
			return function() {
				return fn.apply(me, arguments);
			};
		},
		__hasProp = {}.hasOwnProperty,
		__extends = function(child, parent) {
			for (var key in parent) {
				if (__hasProp.call(parent, key)) child[key] = parent[key];
			}

			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		},
		__slice = [].slice;
	window._d = window.d = (_ref = typeof console !== "undefined" && console !== null ? console.log.bind(console) : void 0) != null ? _ref : function() {};
	_.mixin({
		touch: function(e, prevent) {
			var touch;
			if (prevent == null) {
				prevent = false;
			}
			touch = null;
			if ((e.originalEvent != null) && (e.originalEvent.touches != null)) {
				touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			}
			if (touch != null) {
				if (prevent) {
					e.originalEvent.preventDefault();
				}
				return touch;
			} else {
				return e;
			}
		},
		save: function(key, val) {
			var e;
			val = JSON.stringify({
				contents: val
			});
			try {
				return localStorage.setItem(key, val);
			} catch (_error) {
				e = _error;
			}
		},
		load: function(key, otherwise) {
			var e, item;
			try {
				item = localStorage.getItem(key);
			} catch (_error) {
				e = _error;
				return otherwise;
			}
			if (item !== null) {
				return JSON.parse(item).contents;
			} else {
				return otherwise;
			}
		},
		lerp: function(a, b, pc) {
			return a + (b - a) * pc;
		},
		unlerp: function(a, b, val) {
			if (a === b) {
				return val;
			} else {
				return (val - a) / (b - a);
			}
		},
		constrain: function(num, lo, hi) {
			if (num > hi) {
				return hi;
			}
			if (num < lo) {
				return lo;
			}
			return num;
		},
		rto: function(hi) {
			return Math.random() * hi;
		},
		hexToRGB: function(hex) {
			var i, rgb, _i, _results;
			rgb = /^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(hex).slice(1);
			_results = [];
			for (i = _i = 0; _i <= 2; i = ++_i) {
				_results.push(parseInt(rgb[i], 16));
			}
			return _results;
		}
	});
	CanvasUtil = (function() {
		function CanvasUtil(canvas, fullscreen) {
			this.canvas = canvas;
			this.fullscreen = fullscreen != null ? fullscreen : true;
			this.resizeToWindowAndPreserveContents = __bind(this.resizeToWindowAndPreserveContents, this);
			if (this.fullscreen) {
				this.resizeToWindow();
				$(window).resize(_.debounce(this.resizeToWindowAndPreserveContents, 300));
			} else {
				this.updateSizeOnScreen(this.canvas.width, this.canvas.height);
				this.transformAndResizeForHighDPI();
			}
		}
		CanvasUtil.prototype.updateSizeOnScreen = function(width, height) {
			this.widthOnScreen = width;
			this.halfWidthOnScreen = this.widthOnScreen / 2;
			this.heightOnScreen = height;
			return this.halfHeightOnScreen = this.heightOnScreen / 2;
		};
		CanvasUtil.prototype.transformAndResizeForHighDPI = function() {
			var backingStoreRatio, ctx, devicePixelRatio;
			if (MobileDetect()) {
				return;
			}
			ctx = this.canvas.getContext('2d');
			devicePixelRatio = window.devicePixelRatio || 1;
			backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
			this.scaleRatio = devicePixelRatio / backingStoreRatio;
			if (this.scaleRatio !== 1) {
				this.canvas.width = this.widthOnScreen * this.scaleRatio;
				this.canvas.height = this.heightOnScreen * this.scaleRatio;
				this.canvas.style.width = this.widthOnScreen + 'px';
				this.canvas.style.height = this.heightOnScreen + 'px';
				return ctx.scale(this.scaleRatio, this.scaleRatio);
			}
		};
		CanvasUtil.prototype.resizeToWindow = function() {
			return this.resizeCanvas(window.innerWidth, window.innerHeight);
		};
		CanvasUtil.prototype.resizeCanvas = function(width, height) {
			this.canvas.width = width;
			this.canvas.height = height;
			this.updateSizeOnScreen(width, height);
			return this.transformAndResizeForHighDPI();
		};
		CanvasUtil.prototype.resizeToWindowAndPreserveContents = function() {
			var ctx, image, prevHeight, prevWidth;
			prevWidth = this.canvas.width;
			prevHeight = this.canvas.height;
			image = this.canvas.getContext('2d').getImageData(0, 0, prevWidth - 1, prevHeight - 1);
			this.resizeToWindow();
			ctx = this.canvas.getContext('2d');
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			return ctx.putImageData(image, (this.canvas.width - prevWidth) / 2, (this.canvas.height - prevHeight) / 2);
		};
		return CanvasUtil;
	})();
	Silk = (function() {
		function Silk(ctx, scaleInfo, state) {
			this.ctx = ctx;
			this.scaleInfo = scaleInfo;
			if (state == null) {
				state = {};
			}
			this.drawCurve = __bind(this.drawCurve, this);
			this.drawInstruction = __bind(this.drawInstruction, this);
			state = $.extend(true, {}, state);
			$.extend(this, Silk.initialState, state);
			if (this.originalLogicalWidth == null) {
				this.originalLogicalWidth = this.scaleInfo.logicalWidth;
			}
			if (this.originalLogicalHeight == null) {
				this.originalLogicalHeight = this.scaleInfo.logicalHeight;
			}
			this.drawScale = Math.min(this.scaleInfo.logicalWidth / this.originalLogicalWidth, this.scaleInfo.logicalHeight / this.originalLogicalHeight, 1);
			this.offsetX = (this.scaleInfo.logicalWidth - this.originalLogicalWidth) / 2;
			this.offsetY = (this.scaleInfo.logicalHeight - this.originalLogicalHeight) / 2;
			if (this.curve == null) {
				this.curve = [];
			}
			this.initColors();
			this.cx = this.symCenterX;
			this.cy = this.symCenterY;
			this.twoCx = 2 * this.cx;
			this.twoCy = 2 * this.cy;
			this.generateDrawInstructions();
		}
		Silk.prototype.initColors = function() {
			var _ref1;
			switch (this.highlightMode) {
				case 'time':
					this.colorScale = d3.scale.linear().domain([this.timeColorScaleDomainLow, this.timeColorScaleDomainHigh]).range([this.highlightColor, this.color]);
					break;
				case 'velocity':
					this.colorScale = d3.scale.pow().exponent(this.velocityColorScaleExponent).domain([this.velocityColorScaleDomainLow, this.velocityColorScaleDomainHigh]).range([this.color, this.highlightColor]);
			}
			this.colorScale.clamp(true);
			this.colorScale.interpolate(d3.interpolateHcl);
			return this.isEraser = (this.color === (_ref1 = this.highlightColor) && _ref1 === this.eraserColor);
		};
		Silk.prototype.frame = function() {
			var i, _i, _ref1, _results;
			this.frameTime++;
			_results = [];
			for (i = _i = 1, _ref1 = this.drawsPerFrame; 1 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 1 <= _ref1 ? ++_i : --_i) {
				_results.push(this.step(true));
			}
			return _results;
		};
		Silk.prototype.step = function(drawThisStep) {
			var accx, accy, curve, difference, dist, fx, fy, i, noiseAngle, noiseValue, p, p2, symmetryAxisAngle, windAngle, xoff, yoff, _i, _len;
			if (drawThisStep == null) {
				drawThisStep = true;
			}
			if (this.startDrawingOnceCompleted && !this.completed) {
				return;
			}
			curve = this.curve;
			this.timeColorScaleTime++;
			this.time++;
			while (curve.length && curve[0].life === 0) {
				curve.shift();
			}
			for (i = _i = 0, _len = curve.length; _i < _len; i = ++_i) {
				p = curve[i];
				accx = accy = 0;
				if (this.rotateAnglesAroundSymmetryAxis) {
					symmetryAxisAngle = Math.atan2(this.cx - p.y, this.cy - p.x);
				}
				if (this.noiseForceScale) {
					noiseValue = noise(this.noiseOffset + p.x * this.noiseSpaceScale + 1000000, this.noiseOffset + p.y * this.noiseSpaceScale + 1000000, this.noiseOffset + this.noiseTimeScale * this.time, this.noiseOctaves, this.noiseFallout);
					noiseAngle = this.noiseAngleOffset + this.noiseAngleScale * noiseValue;
					if (this.rotateAnglesAroundSymmetryAxis) {
						noiseAngle += symmetryAxisAngle;
					}
					accx += this.noiseForceScale * Math.cos(noiseAngle);
					accy += this.noiseForceScale * Math.sin(noiseAngle);
				}
				if (this.initialVelocityForceScale) {
					accx += this.initialVelocityForceScale * p.inputVx;
					accy += this.initialVelocityForceScale * p.inputVy;
					if (p.inputVx && p.inputVy) {
						p.inputVx *= this.initialVelocityDecay;
						p.inputVy *= this.initialVelocityDecay;
					}
				}
				if (this.windForceScale > 0) {
					windAngle = this.windAngle;
					if (this.rotateAnglesAroundSymmetryAxis) {
						windAngle += symmetryAxisAngle;
					}
					accx += this.windForceScale * Math.cos(windAngle);
					accy += this.windForceScale * Math.sin(windAngle);
				}
				p.x += (p.x - p.px) * this.friction + accx;
				p.y += (p.y - p.py) * this.friction + accy;
				p.px = p.x;
				p.py = p.y;
				p.life--;
				if (i) {
					p2 = curve[i - 1];
					xoff = p2.x - p.x;
					yoff = p2.y - p.y;
					dist = Math.sqrt(xoff * xoff + yoff * yoff);
					if (dist > this.restingDistance + 0.01) {
						difference = this.rigidity * (this.restingDistance - dist) / dist;
						fx = difference * xoff;
						fy = difference * yoff;
						p.x -= fx;
						p2.x += fx;
						p.y -= fy;
						p2.y += fy;
					}
				}
			}
			if (drawThisStep) {
				return this.draw();
			}
		};
		Silk.prototype.generateDrawInstructions = function() {
			var cx, cy, instr, pc, rotateAmount, rotateBy, rotationIndex, spiralIndex, spiralScaleScale, _i, _ref1, _results;
			this.drawInstructions = [];
			cx = this.cx;
			cy = this.cy;
			rotateAmount = 2 * Math.PI / this.symNumRotations;
			spiralScaleScale = d3.scale.pow().exponent(.5).domain([0, 1]).range([1, 0]);
			_results = [];
			for (rotationIndex = _i = 0, _ref1 = this.symNumRotations; _i < _ref1; rotationIndex = _i += 1) {
				rotateBy = rotationIndex * rotateAmount;
				_results.push((function() {
					var _j, _ref2, _results1;
					_results1 = [];
					for (spiralIndex = _j = 0, _ref2 = this.spiralCopies; _j < _ref2; spiralIndex = _j += 1) {
						spiralIndex = spiralIndex + 0.25 - (1 / 4);
						pc = spiralIndex / this.spiralCopies;
						instr = {
							rotationIndex: rotationIndex,
							spiralIndex: spiralIndex,
							cos: Math.cos(rotateBy + this.spiralAngle * pc),
							sin: Math.sin(rotateBy + this.spiralAngle * pc),
							scale: spiralScaleScale(pc) * this.brushScale,
							original: rotationIndex === 0 && spiralIndex === 0
						};
						this.drawInstructions.push(instr);
						if (this.symMirror) {
							_results1.push(this.drawInstructions.push(_.extend({}, instr, {
								mirror: true
							})));
						} else {
							_results1.push(void 0);
						}
					}
					return _results1;
				}).call(this));
			}
			return _results;
		};
		Silk.prototype.draw = function() {
			var curve, instr, p, _i, _j, _k, _len, _len1, _len2, _ref1;
			curve = this.curve;
			this.setColor();
			for (_i = 0, _len = curve.length; _i < _len; _i++) {
				p = curve[_i];
				p.__x__ = p.x;
				p.__y__ = p.y;
			}
			_ref1 = this.drawInstructions;
			for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
				instr = _ref1[_j];
				this.drawInstruction(instr);
			}
			for (_k = 0, _len2 = curve.length; _k < _len2; _k++) {
				p = curve[_k];
				p.x = p.__x__;
				p.y = p.__y__;
			}
		};
		Silk.prototype.drawInstruction = function(instr) {
			var curve, cx, cy, p, x, y, _i, _len;
			curve = this.curve;
			cx = this.cx;
			cy = this.cy;
			if (this.scaleLineWidth) {
				this.ctx.lineWidth = instr.scale;
			}
			for (_i = 0, _len = curve.length; _i < _len; _i++) {
				p = curve[_i];
				x = p.__x__ - this.cx;
				y = p.__y__ - this.cy;
				p.x = (x * instr.cos - y * instr.sin) * instr.scale;
				p.y = (x * instr.sin + y * instr.cos) * instr.scale;
				if (instr.mirror) {
					p.x = -p.x;
				}
				p.x *= this.drawScale;
				p.y *= this.drawScale;
				p.x += this.cx;
				p.y += this.cy;
				p.x += this.offsetX;
				p.y += this.offsetY;
			}
			return this.drawCurve(instr);
		};
		Silk.prototype.drawCurve = function(instr) {
			var ctx, curve, i, lenMinusOne, p1, p2, twoCx, _i, _ref1;
			curve = this.curve;
			ctx = this.ctx;
			twoCx = this.twoCx;
			if (!curve.length) {
				return;
			}
			lenMinusOne = curve.length - 1;
			if (instr.original && this.frameTime % 10 === 0) {
				this.sparkleLine();
			}
			ctx.beginPath();
			ctx.moveTo(curve[0].x, curve[0].y);
			p1 = curve[1];
			for (i = _i = 1, _ref1 = lenMinusOne - 1; _i < _ref1; i = _i += 1) {
				p2 = curve[i + 1];
				ctx.quadraticCurveTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
				p1 = p2;
			}
			ctx.stroke();
		};
		Silk.prototype.addPoint = function(x, y, vx, vy) {
			var p;
			if (this.completed) {
				return;
			}
			p = this.curve[this.curve.length] = {
				px: x,
				py: y,
				x: x,
				y: y,
				inputVx: vx,
				inputVy: vy,
				life: this.startLife
			};
		};
		Silk.prototype.complete = function() {
			this.completed = true;
			if (this.stopDrawingOnceCompleted) {
				return this.curve = [];
			}
		};
		Silk.prototype.finish = function() {
			this.complete();
			return this.curve = [];
		};
		Silk.prototype.isFinishedDrawing = function() {
			return this.completed && (this.curve.length === 0 || this.stopDrawingOnceCompleted);
		};
		Silk.prototype.setColor = function() {
			var p;
			if (!this.curve.length) {
				return;
			}
			this.ctx.globalCompositeOperation = this.isEraser ? 'source-over' : this.compositeOperation;
			p = this.curve[this.curve.length - 1];
			this.ctx.globalAlpha = this.startOpacity * (p.life / this.startLife);
			return this.ctx.strokeStyle = this.colorScale((function() {
				switch (this.highlightMode) {
					case 'time':
						return this.timeColorScaleTime;
					case 'velocity':
						return Math.sqrt(p.inputVx * p.inputVx + p.inputVy * p.inputVy);
				}
			}).call(this));
		};
		Silk.prototype.setSparks = function(sparks) {
			this.sparks = sparks;
			return this.sparkle = true;
		};
		Silk.prototype.sparkleLine = function() {
			var len;
			len = this.curve.length;
			if (len) {
				return this.sparklePoint(this.curve[_.random(len - 1)]);
			}
		};
		Silk.prototype.sparklePoint = function(p) {
			var color, opacity;
			if (this.sparkle) {
				opacity = 0.8 * p.life / this.startLife;
				color = d3.rgb(this.ctx.strokeStyle).brighter(2).toString();
				return this.sparks.add(p.x, p.y, {
					a: opacity,
					color: color
				});
			}
		};
		Silk.prototype.serialize = function() {
			var cereal, key, p, value, _i, _len, _ref1, _ref2;
			_ref1 = this.curve;
			for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
				p = _ref1[_i];
				delete p.__x__;
				delete p.__y__;
			}
			cereal = {};
			_ref2 = Silk.initialState;
			for (key in _ref2) {
				if (!__hasProp.call(_ref2, key)) continue;
				value = _ref2[key];
				cereal[key] = this[key];
			}
			cereal.curve = $.extend(true, [], this.curve);
			return cereal;
		};
		Silk.initialState = {
			type: 'silk',
			version: 1,
			time: 0,
			frameTime: 0,
			completed: false,
			startDrawingOnceCompleted: false,
			stopDrawingOnceCompleted: false,
			brushScale: 1,
			scaleLineWidth: true,
			startLife: 150,
			startOpacity: 0.09,
			color: '#276f9b',
			highlightColor: '#276f9b',
			highlightMode: 'velocity',
			eraserColor: '#000000',
			velocityColorScaleExponent: 1.5,
			velocityColorScaleDomainLow: 10,
			velocityColorScaleDomainHigh: 30,
			timeColorScaleDomainLow: 0,
			timeColorScaleDomainHigh: 350,
			timeColorScaleTime: 0,
			compositeOperation: 'lighter',
			noiseForceScale: 1,
			noiseSpaceScale: 0.02,
			noiseTimeScale: 0.005,
			noiseOffset: 0,
			noiseOctaves: 8,
			noiseFallout: 0.65,
			noiseAngleScale: 5 * Math.PI,
			noiseAngleOffset: 0,
			initialVelocityForceScale: 0.3,
			initialVelocityDecay: 0.98,
			windForceScale: 0,
			windAngle: Math.PI,
			rotateAnglesAroundSymmetryAxis: true,
			friction: 0.975,
			restingDistance: 0,
			rigidity: 0.2,
			symType: 'point',
			symNumRotations: 1,
			symMirror: true,
			symCenter: 'centerScreen',
			symCenterX: 0,
			symCenterY: 0,
			spiralCopies: 1,
			spiralAngle: 0.75 * Math.PI,
			curve: null,
			originalLogicalWidth: null,
			originalLogicalHeight: null,
			drawsPerFrame: 5
		};
		return Silk;
	})();
	PointPreviewSilk = (function(_super) {
		__extends(PointPreviewSilk, _super);

		function PointPreviewSilk(ctx, scaleInfo, state) {
			var baseColor;
			this.ctx = ctx;
			this.scaleInfo = scaleInfo;
			if (state == null) {
				state = {};
			}
			this.drawCurve = __bind(this.drawCurve, this);
			PointPreviewSilk.__super__.constructor.apply(this, arguments);
			if (this.previewRadius == null) {
				this.previewRadius = 4;
			}
			if (this.previewOpacity == null) {
				this.previewOpacity = 1;
			}
			if (this.targetOpacity == null) {
				this.targetOpacity = 1;
			}
			if (this.visible == null) {
				this.visible = true;
			}
			switch (this.previewEmphasis) {
				case 'spiral':
					this.previewEmphasisFn = function(instr) {
						return instr.spiralIndex > 0;
					};
					break;
				case 'rotation':
					this.previewEmphasisFn = function(instr) {
						return instr.spiralIndex === 0 && !instr.mirror;
					};
					break;
				case 'mirror':
					this.previewEmphasisFn = function(instr) {
						return instr.mirror;
					};
			}
			baseColor = (function() {
				switch (this.hightlightMode) {
					case 'time':
						return this.highlightColor;
					case 'velocity':
						return this.color;
				}
			}).call(this);
		}
		PointPreviewSilk.prototype.frame = function() {
			if (!this.curve.length) {
				return;
			}
			switch (false) {
				case !(this.previewOpacity > this.targetOpacity):
					this.previewOpacity -= 0.05;
					if (this.previewOpacity < this.targetOpacity) {
						this.previewOpacity = this.targetOpacity;
					}
					break;
				case !(this.previewOpacity < this.targetOpacity):
					this.previewOpacity += 0.05;
					if (this.previewOpacity > this.targetOpacity) {
						this.previewOpacity = this.targetOpacity;
					}
			}
			if (this.completed && this.previewOpacity === 0) {
				return this.finish();
			} else {
				if (this.visible) {
					return this.draw();
				}
			}
		};
		PointPreviewSilk.prototype.setVisible = function(visible) {
			this.visible = visible;
		};
		PointPreviewSilk.prototype.setTargetOpacity = function(targetOpacity) {
			this.targetOpacity = targetOpacity;
		};
		PointPreviewSilk.prototype.fadeIn = function() {
			return this.targetOpacity = 1;
		};
		PointPreviewSilk.prototype.fadeOut = function() {
			return this.targetOpacity = 0;
		};
		PointPreviewSilk.prototype.fadeInFromZero = function() {
			this.previewOpacity = 0;
			return this.targetOpacity = 1;
		};
		PointPreviewSilk.prototype.fadeOutFromOne = function() {
			this.previewOpacity = 1;
			return this.targetOpacity = 0;
		};
		PointPreviewSilk.prototype.completeAndFadeOut = function() {
			this.complete();
			return this.fadeOut();
		};
		PointPreviewSilk.prototype.drawCurve = function(instr) {
			var fillStyle, p;
			p = this.curve[0];
			this.ctx.beginPath();
			fillStyle = this.ctx.fillStyle;
			this.ctx.fillStyle = '#4e4866';
			if (typeof this.previewEmphasisFn === "function" ? this.previewEmphasisFn(instr) : void 0) {
				this.ctx.fillStyle = '#ffffff';
			}
			this.ctx.arc(p.x, p.y, instr.scale * this.previewRadius, 0, 2 * Math.PI, false);
			this.ctx.fill();
			this.ctx.fillStyle = fillStyle;
			this.ctx.globalCompositeOperation = 'source-over';
			this.ctx.strokeWidth = 0.5;
			this.ctx.stroke();
			return this.ctx.closePath();
		};
		PointPreviewSilk.prototype.addPoint = function(x, y, vx, vy) {
			if (this.completed) {
				return;
			}
			return this.curve = [{
				x: x,
				y: y
			}];
		};
		PointPreviewSilk.prototype.setColor = function() {
			this.ctx.globalAlpha = this.previewOpacity;
			return this.ctx.globalCompositeOperation = this.globalCompositeOperation;
		};
		PointPreviewSilk.prototype.serialize = function() {
			var state;
			state = PointPreviewSilk.__super__.serialize.call(this);
			state.curve = [];
			return state;
		};
		return PointPreviewSilk;
	})(Silk);
	this.Silks = (function() {
		function Silks(container, silkCanvas, bufferCanvas, sparksCanvas) {
			this.container = container;
			this.silkCanvas = silkCanvas;
			this.bufferCanvas = bufferCanvas;
			this.sparksCanvas = sparksCanvas;
			this.replayReplay = __bind(this.replayReplay, this);
			this.undo = __bind(this.undo, this);
			this.clear = __bind(this.clear, this);
			this.all = {};
			this.sparks = new Sparks(this.sparksCanvas);
			this.recorder = new Recorder(this);
			this.silkCtx = this.silkCanvas.getContext('2d');
			this.sparksCtx = this.sparksCanvas.getContext('2d');
			this.sparksCanvas._util = new CanvasUtil(this.sparksCanvas);
			this.bufferCanvas._util = new CanvasUtil(this.bufferCanvas);
			this.silkCanvas._util = new CanvasUtil(this.silkCanvas);
			this.backgroundColor = '#000';
			this.snapshotState = {
				justCleared: ko.observable(true),
				canUndo: ko.observable(false)
			};
			this.previewSilks = {};
			this.inputPreviewSilk = null;
			this.inputPreviewSilkId = null;
			this.nextUndoIsRedo = ko.observable(false);
			this.undoSnapshot = null;
			this.clearUndoSnapshot = null;
			this.silkSettingsState = $.extend(true, {}, Silk.initialState);
			this.fillSilkCanvas();
			this.drawInputPreview = true;
			this.frameTime = 0;
		}
		Silks.prototype.scaleInfo = function() {
			return {
				logicalWidth: this.silkCanvas._util.widthOnScreen,
				logicalHeight: this.silkCanvas._util.heightOnScreen
			};
		};
		Silks.prototype.frame = function(dt) {
			var id, silk, _ref1, _ref2, _results;
			this.frameTime++;
			this.recorder.frame();
			if (this.trackingInput) {
				this.inputFrame();
			}
			_ref1 = this.all;
			for (id in _ref1) {
				silk = _ref1[id];
				silk.frame();
				if (silk.isFinishedDrawing()) {
					delete this.all[id];
				}
			}
			if (this.allSilksCompleted()) {
				this.recorder.stopRecording();
			}
			this.sparks.frame(dt);
			_ref2 = this.previewSilks;
			_results = [];
			for (id in _ref2) {
				silk = _ref2[id];
				if (!(this.drawInputPreview === false && id === this.inputPreviewSilkId)) {
					silk.frame();
				}
				if (silk.isFinishedDrawing()) {
					_results.push(delete this.previewSilks[id]);
				} else {
					_results.push(void 0);
				}
			}
			return _results;
		};
		Silks.prototype.randomId = function() {
			return Math.round(Math.random() * 9999999999) + '';
		};
		Silks.prototype.extendSilkSettingsState = function(state) {
			return $.extend(this.silkSettingsState, state);
		};
		Silks.prototype.silkStartState = function() {
			var state;
			state = $.extend(true, {}, this.silkSettingsState);
			if (state.symCenter === 'centerScreen') {
				$.extend(state, {
					symCenterX: this.silkCanvas._util.halfWidthOnScreen,
					symCenterY: this.silkCanvas._util.halfHeightOnScreen
				});
			}
			return state;
		};
		Silks.prototype.add = function(id, state) {
			var color, scaleInfo, silk;
			this.undoSnapshot = this.takeSnapshot();
			this.clearUndoSnapshot = null;
			this.nextUndoIsRedo(false);
			this.snapshotState.justCleared(false);
			this.recorder.startRecording();
			if (id == null) {
				id = this.randomId();
			}
			scaleInfo = this.scaleInfo();
			if (state != null) {
				silk = new Silk(this.silkCtx, scaleInfo, state);
			} else if (this.inputPreviewSilkId != null) {
				silk = new Silk(this.silkCtx, scaleInfo, this.inputPreviewSilk.serialize());
			} else {
				silk = new Silk(this.silkCtx, scaleInfo, this.silkStartState());
			}
			silk.setSparks(this.sparks);
			if (typeof Hue !== "undefined" && Hue !== null) {
				color = d3.hsl(silk.color);
				d('color:', color);
				Hue.setBri(3, parseInt(255 * color.l));
				d(color.h, color.s, color.l);
				d(Hue.setHueSat(3, parseInt(65536 * (color.h / 360)), parseInt(255 * color.s)));
			}
			this.recorder.rec('add', id, silk.serialize());
			this.all[id] = silk;
			return id;
		};
		Silks.prototype.addPreviewSilk = function(state) {
			var id, startState;
			id = this.randomId();
			startState = this.silkStartState();
			if (state != null) {
				$.extend(startState, state);
			}
			this.previewSilks[id] = new PointPreviewSilk(this.sparksCtx, this.scaleInfo(), startState);
			return id;
		};
		Silks.prototype.getPreviewSilk = function(id) {
			return this.previewSilks[id];
		};
		Silks.prototype.removePreviewSilk = function(id) {
			return delete this.previewSilks[id];
		};
		Silks.prototype.nextInputPreviewSilk = function() {
			if (this.inputPreviewSilkId != null) {
				this.inputPreviewSilk.completeAndFadeOut();
			}
			this.inputPreviewSilkId = this.addPreviewSilk();
			this.inputPreviewSilk = this.previewSilks[this.inputPreviewSilkId];
			return this.inputPreviewSilk.fadeInFromZero();
		};
		Silks.prototype.addPoint = function(id, x, y, vx, vy, fromRecording) {
			var scaleInfo;
			if (!fromRecording) {
				0;
				scaleInfo = this.scaleInfo();
			}
			this.recorder.rec('addPoint', id, x, y, vx, vy, true);
			if (id in this.all) {
				return this.all[id].addPoint(x, y, vx, vy);
			}
		};
		Silks.prototype.complete = function(id) {
			if (id in this.all) {
				this.all[id].complete();
				return this.recorder.rec('complete', id);
			}
		};
		Silks.prototype.allSilksCompleted = function() {
			var id, silk, _ref1;
			_ref1 = this.all;
			for (id in _ref1) {
				silk = _ref1[id];
				if (!silk.completed) {
					return false;
				}
			}
			return true;
		};
		Silks.prototype.clear = function(withParticles) {
			var id;
			if (withParticles == null) {
				withParticles = true;
			}
			if (!this.snapshotState.justCleared()) {
				this.clearUndoSnapshot = this.takeSnapshot();
				this.clearUndoSnapshot.nextUndoIsRedo = this.nextUndoIsRedo();
				this.nextUndoIsRedo(false);
				this.snapshotState.justCleared(true);
				this.recorder.stopRecording();
				this.recorder.ejectAll();
			}
			for (id in this.all) {
				this.complete(id);
			}
			this.all = {};
			this.swapSilkCanvii();
			if (withParticles) {
				return this.addParticles();
			}
		};
		Silks.prototype.addParticles = function(dir, num) {
			var angle, h, h2, i, scale, spark, w, w2, x, y, _i, _results;
			if (dir == null) {
				dir = 1;
			}
			if (num == null) {
				num = 100;
			}
			w = this.silkCanvas._util.widthOnScreen;
			h = this.silkCanvas._util.heightOnScreen;
			w2 = w / 2;
			h2 = h / 2;
			scale = .25 * dir;
			_results = [];
			for (i = _i = 1; 1 <= num ? _i <= num : _i >= num; i = 1 <= num ? ++_i : --_i) {
				x = _.random(w);
				y = _.random(h);
				angle = Math.atan2(y - h2, x - w2);
				_results.push(spark = this.sparks.add(x, y, {
					a: 1,
					color: '#ffffff',
					vx: scale * Math.cos(angle),
					vy: scale * Math.sin(angle),
					lifespan: 25 + _.random(60)
				}));
			}
			return _results;
		};
		Silks.prototype.swapSilkCanvii = function() {
			var _ref1;
			_ref1 = [this.bufferCanvas, this.silkCanvas], this.silkCanvas = _ref1[0], this.bufferCanvas = _ref1[1];
			this.silkCtx = this.silkCanvas.getContext('2d');
			$(this.silkCanvas).removeClass('buffer onepacity').addClass('active zeropacity').insertBefore($(this.bufferCanvas));
			$(this.bufferCanvas).removeClass('active').addClass('buffer onepacity');
			this.fillSilkCanvas();
			return _.defer((function(_this) {
				return function() {
					return $(_this.silkCanvas).removeClass('zeropacity');
				};
			})(this));
		};
		Silks.prototype.fillCanvas = function(canvas, color) {
			var ctx;
			ctx = canvas.getContext('2d');
			ctx.globalCompositeOperation = 'source-over';
			ctx.globalAlpha = 1;
			ctx.fillStyle = color;
			if (color === '' || color === 'transparent') {
				return ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			} else {
				return ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			}
		};
		Silks.prototype.clearSilkCanvas = function() {
			return this.fillCanvas(this.silkCanvas, 'transparent');
		};
		Silks.prototype.fillSilkCanvas = function(color) {
			if (color == null) {
				color = this.backgroundColor;
			}
			return this.fillCanvas(this.silkCanvas, color);
		};
		Silks.prototype.nextSnapshotCanvas = (function() {
			var canvii, i, _i;
			canvii = [];
			for (i = _i = 1; _i <= 4; i = ++_i) {
				canvii.push(document.createElement('canvas'));
			}
			i = 0;
			return function() {
				var canvas;
				canvas = canvii[i];
				i = (i + 1) % canvii.length;
				return canvas;
			};
		})();
		Silks.prototype.takeSnapshot = function() {
			var all, binding, bindingValues, canvas, id, name, recorder, silk, sizeOnScreen, _ref1, _ref2;
			canvas = this.nextSnapshotCanvas();
			canvas.width = this.silkCanvas.width;
			canvas.height = this.silkCanvas.height;
			canvas.getContext('2d').drawImage(this.silkCanvas, 0, 0, canvas.width, canvas.height);
			all = {};
			_ref1 = this.all;
			for (id in _ref1) {
				silk = _ref1[id];
				all[id] = silk.serialize();
			}
			recorder = this.recorder.serialize();
			bindingValues = {};
			_ref2 = this.snapshotState;
			for (name in _ref2) {
				binding = _ref2[name];
				bindingValues[name] = binding();
			}
			sizeOnScreen = {
				width: this.silkCanvas._util.widthOnScreen,
				height: this.silkCanvas._util.heightOnScreen
			};
			return {
				all: all,
				canvas: canvas,
				recorder: recorder,
				sizeOnScreen: sizeOnScreen,
				bindingValues: bindingValues
			};
		};
		Silks.prototype.loadSnapshot = function(data) {
			var id, name, scaleInfo, state, value, _ref1, _ref2, _results;
			this.silkCtx.globalAlpha = 1;
			this.fillSilkCanvas();
			this.silkCtx.drawImage(data.canvas, (this.silkCanvas._util.widthOnScreen - data.sizeOnScreen.width) / 2, (this.silkCanvas._util.heightOnScreen - data.sizeOnScreen.height) / 2, data.sizeOnScreen.width, data.sizeOnScreen.height);
			this.all = {};
			scaleInfo = this.scaleInfo();
			_ref1 = data.all;
			for (id in _ref1) {
				state = _ref1[id];
				this.all[id] = new Silk(this.silkCtx, scaleInfo, state);
			}
			this.recorder.unserialize(data.recorder);
			_ref2 = data.bindingValues;
			_results = [];
			for (name in _ref2) {
				value = _ref2[name];
				_results.push(this.snapshotState[name](value));
			}
			return _results;
		};
		Silks.prototype.undo = function() {
			var snapshot;
			switch (false) {
				case this.clearUndoSnapshot == null:
					this.swapSilkCanvii();
					this.loadSnapshot(this.clearUndoSnapshot);
					this.nextUndoIsRedo(this.clearUndoSnapshot.nextUndoIsRedo);
					this.clearUndoSnapshot = null;
					return this.addParticles(-1);
				case this.undoSnapshot == null:
					snapshot = this.takeSnapshot();
					this.swapSilkCanvii();
					this.loadSnapshot(this.undoSnapshot);
					if (this.nextUndoIsRedo()) {
						this.addParticles();
					} else {
						this.addParticles(-1);
					}
					this.nextUndoIsRedo(!this.nextUndoIsRedo());
					return this.undoSnapshot = snapshot;
			}
		};
		Silks.prototype.replayReplay = function() {
			var tape;
			tape = this.recorder.ejectAll();
			this.clear(false);
			return this.recorder.play(tape);
		};
		Silks.prototype.getReplay = function() {
			return this.recorder.get();
		};
		Silks.prototype.playReplay = function(tape) {
			return this.recorder.play(tape);
		};
		Silks.prototype.makeThumb = function() {
			var canvas, ctx, drawHeight, drawWidth, r, size;
			canvas = document.createElement('canvas');
			size = 300;
			canvas.width = canvas.height = size;
			drawWidth = drawHeight = size;
			r = this.silkCanvas.width / this.silkCanvas.height;
			if (r < 1) {
				drawHeight *= r;
			} else {
				drawWidth *= r;
			}
			ctx = canvas.getContext('2d');
			ctx.fillStyle = this.backgroundColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.imageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.mozImageSmoothingEnabled = true;
			ctx.drawImage(this.silkCanvas, (size - drawWidth) / 2, (size - drawHeight) / 2, drawWidth, drawHeight);
			return canvas.toDataURL('image/png').replace(/^data:image\/\w+;base64,/, '');
		};
		Silks.prototype.getImageUrl = function() {
			return this.silkCanvas.toDataURL('image/png');
		};
		Silks.prototype.inputFrame = function() {
			var _ref1;
			if (this.pinputX != null) {
				if (this.inputIsActive) {
					this.addPoint(this.activeSilkId, this.inputX, this.inputY, this.inputX - this.pinputX, this.inputY - this.pinputY);
				} else {
					if ((_ref1 = this.inputPreviewSilk) != null) {
						_ref1.addPoint(this.inputX, this.inputY, this.inputX - this.pinputX, this.inputY - this.pinputY);
					}
				}
			}
			this.pinputX = this.inputX;
			return this.pinputY = this.inputY;
		};
		Silks.prototype.initInputEvents = function() {
			var fadeTimer, previewActive;
			this.trackingInput = true;
			this.inputX = this.inputY = null;
			this.pinputX = this.pinputY = null;
			this.inputIsActive = false;
			this.nextInputPreviewSilk();
			fadeTimer = null;
			previewActive = (function(_this) {
				return function() {
					var _ref1;
					if (!_this.inputIsActive) {
						if ((_ref1 = _this.inputPreviewSilk) != null) {
							_ref1.fadeIn();
						}
					}
					clearTimeout(fadeTimer);
					return fadeTimer = setTimeout(function() {
						var _ref2;
						return (_ref2 = _this.inputPreviewSilk) != null ? _ref2.fadeOut() : void 0;
					}, 3000);
				};
			})(this);
			$(this.sparksCanvas).mousedown((function(_this) {
				return function(e) {
					if (e.button === 2) {
						return;
					}
					_this.updateInputFromEvent(e);
					_this.stopPreviewingInput();
					_this.inputStarted();
					return false;
				};
			})(this)).mousemove((function(_this) {
				return function(e) {
					_this.updateInputFromEvent(e);
					return previewActive();
				};
			})(this)).mouseup((function(_this) {
				return function(e) {
					_this.updateInputFromEvent(e);
					if (_this.inputIsActive) {
						_this.nextInputPreviewSilk();
						_this.inputEnded();
					}
					return previewActive();
				};
			})(this)).mouseenter((function(_this) {
				return function(e) {
					return _this.nextInputPreviewSilk();
				};
			})(this)).mouseleave((function(_this) {
				return function(e) {
					_this.stopPreviewingInput();
					return clearTimeout(fadeTimer);
				};
			})(this)).bind('touchstart', (function(_this) {
				return function(e) {
					var _ref1;
					_this.updateInputFromEvent(_this.firstTouch(e));
					_ref1 = [_this.inputX, _this.inputY], _this.pinputX = _ref1[0], _this.pinputY = _ref1[1];
					_this.inputStarted();
					return false;
				};
			})(this)).bind('touchmove', (function(_this) {
				return function(e) {
					_this.updateInputFromEvent(_this.firstTouch(e));
					return false;
				};
			})(this)).bind('touchend', (function(_this) {
				return function(e) {
					_this.updateInputFromEvent(_this.firstTouch(e));
					_this.inputEnded();
					return false;
				};
			})(this));
			return $(window).mouseup((function(_this) {
				return function() {
					return _this.inputIsActive = false;
				};
			})(this));
		};
		Silks.prototype.stopPreviewingInput = function() {
			var _ref1;
			if ((_ref1 = this.inputPreviewSilk) != null) {
				_ref1.completeAndFadeOut();
			}
			return this.inputPreviewSilkId = null;
		};
		Silks.prototype.inputStarted = function() {
			this.inputIsActive = true;
			this.complete(this.activeSilkId);
			return this.activeSilkId = this.add();
		};
		Silks.prototype.inputEnded = function() {
			this.complete(this.activeSilkId);
			return this.inputIsActive = false;
		};
		Silks.prototype.firstTouch = function(e) {
			return e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		};
		Silks.prototype.updateInputFromEvent = function(e) {
			this.inputX = e.pageX - this.container.offsetLeft;
			return this.inputY = e.pageY - this.container.offsetTop;
		};
		Silks.prototype.getCenterCoordinates = function() {
			return [this.silkCanvas._util.halfWidthOnScreen, this.silkCanvas._util.halfHeightOnScreen];
		};
		return Silks;
	})();
	Sparks = (function() {
		function Sparks(canvas) {
			this.canvas = canvas;
			this.ctx = canvas.getContext('2d');
			this.ctx.globalCompositeOperation = 'lighter';
			this.points = [];
		}
		Sparks.prototype.frame = function(dt) {
			var ctx, p, points, _i, _len;
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			points = this.points;
			ctx = this.ctx;
			while (points.length > 0 && points[0].age >= points[0].lifespan) {
				points.shift();
			}
			for (_i = 0, _len = points.length; _i < _len; _i++) {
				p = points[_i];
				p.x += p.vx * dt;
				p.y += p.vy * dt;
				p.age++;
				if (p.age < p.lifespan) {
					ctx.beginPath();
					ctx.globalAlpha = p.a * (1 - p.age / p.lifespan);
					if (p.invertA) {
						ctx.globalAlpha = 1 - ctx.globalAlpha;
					}
					ctx.fillStyle = p.color;
					ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
					ctx.fill();
					ctx.closePath();
				}
			}
		};
		Sparks.prototype.add = function(x, y, params) {
			var p;
			p = $.extend({
				x: x,
				y: y,
				a: 1,
				age: 0,
				lifespan: 75,
				radius: 0.75,
				radiusScale: 1,
				color: '#ffffff',
				vx: 2 * Math.random() - 1,
				vy: Math.random() - 1
			}, params);
			p.radius *= p.radiusScale;
			this.points.push(p);
			return p;
		};
		return Sparks;
	})();
	Tape = (function() {
		function Tape(target, recordOnly) {
			this.target = target;
			this.recordOnly = recordOnly != null ? recordOnly : false;
			this.unserialize = __bind(this.unserialize, this);
			this.serialize = __bind(this.serialize, this);
			this.eject = __bind(this.eject, this);
			this.get = __bind(this.get, this);
			this.rewind = __bind(this.rewind, this);
			this.fastforward = __bind(this.fastforward, this);
			this.stop = __bind(this.stop, this);
			this.play = __bind(this.play, this);
			this.load = __bind(this.load, this);
			this.frame = __bind(this.frame, this);
			this.rec = __bind(this.rec, this);
			this.tape = {};
			this.time = 0;
			this.playing = false;
		}
		Tape.prototype.rec = function() {
			var info, _base, _name;
			info = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
			if ((_base = this.tape)[_name = this.time] == null) {
				_base[_name] = [];
			}
			return this.tape[this.time].push(info);
		};
		Tape.prototype.frame = function() {
			var args, info, name, _i, _len, _ref1, _ref2;
			if (this.playing) {
				if (!this.recordOnly && this.time in this.tape) {
					_ref1 = this.tape[this.time];
					for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
						info = _ref1[_i];
						name = info[0], args = 2 <= info.length ? __slice.call(info, 1) : [];
						(_ref2 = this.target[name]).call.apply(_ref2, [this.target].concat(__slice.call(args)));
					}
				}
				return this.time += 1;
			}
		};
		Tape.prototype.load = function(tape) {
			this.tape = tape;
			return this.rewind();
		};
		Tape.prototype.play = function() {
			return this.playing = true;
		};
		Tape.prototype.stop = function() {
			return this.playing = false;
		};
		Tape.prototype.fastforward = function(amount) {
			return this.time += amount;
		};
		Tape.prototype.rewind = function() {
			return this.time = 0;
		};
		Tape.prototype.get = function() {
			return this.tape;
		};
		Tape.prototype.eject = function() {
			var tape;
			tape = this.tape;
			this.load({});
			return tape;
		};
		Tape.prototype.serialize = function() {
			return {
				time: this.time,
				playing: this.playing,
				tape: $.extend(true, {}, this.tape)
			};
		};
		Tape.prototype.unserialize = function(data) {
			return this.tape = data.tape, this.time = data.time, this.playing = data.playing, data;
		};
		return Tape;
	})();
	Recorder = (function() {
		function Recorder(target) {
			this.target = target;
			this.recTape = new Tape(this.target, true);
			this.playTape = new Tape(this.target);
			this.rec = this.recTape.rec;
			this.get = this.recTape.get;
		}
		Recorder.prototype.frame = function() {
			this.recTape.frame();
			return this.playTape.frame();
		};
		Recorder.prototype.play = function(tape) {
			if (tape != null) {
				this.recTape.eject();
				this.playTape.load(tape);
			}
			return this.playTape.play();
		};
		Recorder.prototype.stopPlaying = function() {
			return this.playTape.stop();
		};
		Recorder.prototype.startRecording = function() {
			return this.recTape.play();
		};
		Recorder.prototype.stopRecording = function() {
			return this.recTape.stop();
		};
		Recorder.prototype.ejectAll = function() {
			this.playTape.eject();
			return this.recTape.eject();
		};
		Recorder.prototype.serialize = function() {
			return {
				recTape: this.recTape.serialize(),
				playTape: this.playTape.serialize()
			};
		};
		Recorder.prototype.unserialize = function(data) {
			this.recTape.unserialize(data.recTape);
			return this.playTape.unserialize(data.playTape);
		};
		return Recorder;
	})();
	this.initSound = function() {
		var SoundController, bg, bgIntro, bgIntroPlayed, bgIntroVolume, bgMusicVolume, blipEffect, bloopEffect, context, controls, drawSparkle, drawWhoosh, drawing, fadeInBgMusic, loadSilkSound, loadSound, modulateDrawSound, muteEffects, muteMusic, muteSound, playClearSound, playDrawSound, started, stopDrawSound, urlify;
		this.audioContext = this.audioContext || this.webkitAudioContext;
		SoundController = (function() {
			function SoundController(buffer, ctx) {
				this.buffer = buffer;
				this.ctx = ctx;
				this.setLoop(false);
				this.setVolume(1);
			}
			SoundController.prototype.setLoop = function(loop) {
				this.loop = loop;
			};
			SoundController.prototype.setVolume = function(gain) {
				this.gain = gain;
			};
			SoundController.prototype.createSource = function() {
				this.source = this.ctx.createBufferSource();
				this.source.buffer = this.buffer;
				this.source.loop = this.loop;
				this.source.gain.value = this.gain;
				return this.source.connect(this.ctx.destination);
			};
			SoundController.prototype.play = function() {
				var _ref1;
				return (_ref1 = this.source) != null ? _ref1.noteOn(0) : void 0;
			};
			SoundController.prototype.fadeTo = function(gain, duration) {
				var now;
				this.gain = gain;
				now = this.ctx.currentTime;
				this.source.gain.cancelScheduledValues(now);
				this.source.gain.setValueAtTime(this.source.gain.value, now);
				return this.source.gain.linearRampToValueAtTime(this.gain, now + duration);
			};
			SoundController.prototype.trigger = function(multiplier) {
				var backup, _ref1;
				if (multiplier == null) {
					multiplier = 1;
				}
				backup = this.triggerSource;
				this.triggerSource = this.triggerSourceBk;
				this.triggerSourceBk = backup;
				if ((_ref1 = this.triggerSource) != null) {
					_ref1.noteOff(0);
				}
				this.triggerSource = this.ctx.createBufferSource();
				this.triggerSource.buffer = this.buffer;
				this.triggerSource.loop = this.loop;
				this.triggerSource.gain.value = this.gain * multiplier;
				this.triggerSource.connect(this.ctx.destination);
				return this.triggerSource.noteOn(0);
			};
			return SoundController;
		})();
		urlify = function(name) {
			return "http://weavesilk.com.s3.amazonaws.com/sound/" + (escape(name));
		};
		loadSound = function(url, ctx, success, error) {
			var request;
			request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';
			request.onload = function() {
				d('Loaded sound.');
				return ctx.decodeAudioData(request.response, function(buffer) {
					d("Decoded");
					return typeof success === "function" ? success(buffer) : void 0;
				}, function(arg) {});
			};
			return request.send();
		};
		if (this.audioContext != null) {
			context = new this.audioContext();
			loadSilkSound = function(name, cb) {
				var url;
				url = urlify(name);
				return loadSound(url, context, function(buffer) {
					var sound;
					sound = new SoundController(buffer, context);
					return cb(sound);
				});
			};
			d('Thank the Lord, there is an audio context.');
			playClearSound = (function() {
				var clears, loaded, num, onload;
				clears = [];
				loaded = false;
				onload = function(sound) {
					d('onload', sound);
					sound.setVolume(0.27);
					clears.push(sound);
					return loaded = clears.length === 4;
				};
				loadSilkSound("Clear 1 16-44.m4a", onload);
				num = 1;
				return function() {
					var index;
					if (clears.length > 0) {
						d(clears);
						index = _.random(clears.length - 1);
						clears[index].trigger();
					}
					if (num < 4) {
						loadSilkSound("Clear " + (num + 1) + " 16-44.m4a", onload);
						return num += 1;
					}
				};
			})();
			drawSparkle = null;
			loadSilkSound('Sparks 16-44 -looped.m4a', function(result) {
				drawSparkle = result;
				drawSparkle.setVolume(0);
				drawSparkle.setLoop(true);
				drawSparkle.createSource();
				return drawSparkle.play();
			});
			drawWhoosh = null;
			loadSilkSound('Draw B2 2048 loop.m4a', function(result) {
				d('woosh', result);
				drawWhoosh = result;
				drawWhoosh.setVolume(0);
				drawWhoosh.setLoop(true);
				drawWhoosh.createSource();
				return drawWhoosh.play();
			});
			d('Attempting to load a whoosh');
			drawing = false;
			playDrawSound = function() {
				drawing = true;
				if (drawSparkle != null) {
					drawSparkle.fadeTo(0.01, 0.5);
				}
				return drawWhoosh != null ? drawWhoosh.fadeTo(0.15, 0.5) : void 0;
			};
			stopDrawSound = function() {
				drawing = false;
				if (drawSparkle != null) {
					drawSparkle.fadeTo(0, 1);
				}
				return drawWhoosh != null ? drawWhoosh.fadeTo(0, 1) : void 0;
			};
			modulateDrawSound = function(level) {
				if (!drawing) {
					return;
				}
				level *= 1 / 30;
				level = Math.log(Math.log(level + 1));
				level = _.constrain(level, .15, .6);
				return drawWhoosh != null ? drawWhoosh.fadeTo(level, 0.2) : void 0;
			};
			blipEffect = null;
			loadSilkSound('Palette A5.m4a', function(result) {
				blipEffect = result;
				return blipEffect.setVolume(0.4);
			});
			bloopEffect = null;
			loadSilkSound('Palette A4.m4a', function(result) {
				bloopEffect = result;
				return bloopEffect.setVolume(0.3);
			});
		}
		muteMusic = ko.observable(true);
		muteEffects = ko.observable(true);
		muteSound = ko.computed(function() {
			return muteMusic() && muteEffects();
		});
		started = false;
		bgMusicVolume = 0.50;
		bgIntroVolume = 0.55;
		bg = $('#bg-music')[0];
		bgIntro = $('#bg-music-intro')[0];
		bgIntroPlayed = false;
		fadeInBgMusic = function() {
			var duration, interval, stepSize, target;
			target = bgMusicVolume;
			duration = 15;
			interval = .1;
			stepSize = duration / interval;
			bg.volume = 0;
			bg.play();
			return setTimeout(function() {
				var step;
				return step = setInterval(function() {
					bg.volume += target / stepSize;
					bg.volume = Math.min(bg.volume, target) + 0.01;
					if (bg.volume >= target) {
						return clearInterval(step);
					}
				}, 1000 * interval);
			}, 500);
		};
		controls = {
			muteMusic: muteMusic,
			muteSound: muteSound,
			setMuteMusic: function(val) {
				muteMusic(val);
				if (val) {
					_.save('muteMusic', true);
				} else {
					_.save('muteMusic', false);
					controls.setMuteEffects(false);
					controls.start();
				}
				bgIntro.muted = val;
				return bg.muted = val;
			},
			setMuteEffects: function(val) {
				muteEffects(val);
				if (val) {
					return _.save('muteEffects', true);
				} else {
					return _.save('muteEffects');
				}
			},
			start: function() {
				var check;
				if (started) {
					return;
				}
				if (muteMusic()) {
					return;
				}
				started = true;
				return check = setInterval(function() {
					var bgBuffered, introBuffered;
					bgBuffered = bg.buffered.length > 0 && bg.buffered.end(0) > 10;
					introBuffered = bgIntro.buffered.length > 0 && bgIntro.buffered.end(0) > 2;
					if (introBuffered && !bgIntroPlayed) {
						bgIntro.volume = bgIntroVolume;
						bgIntro.play();
						bgIntroPlayed = true;
					}
					if (bgBuffered) {
						clearInterval(check);
						return fadeInBgMusic();
					}
				}, 100);
			},
			playClearSound: function() {
				if (!muteEffects()) {
					return typeof playClearSound === "function" ? playClearSound() : void 0;
				}
			},
			playDrawSound: function() {
				var ex;
				try {
					if (!muteEffects()) {
						return typeof playDrawSound === "function" ? playDrawSound() : void 0;
					}
				} catch (_error) {
					ex = _error;
					return d('Error playing clear sound', ex);
				}
			},
			stopDrawSound: function() {
				var ex;
				try {
					if (!muteEffects()) {
						return typeof stopDrawSound === "function" ? stopDrawSound() : void 0;
					}
				} catch (_error) {
					ex = _error;
					return d('Error stopping draw sound', ex);
				}
			},
			modulateDrawSound: function(level) {
				var ex;
				try {
					return typeof modulateDrawSound === "function" ? modulateDrawSound(level) : void 0;
				} catch (_error) {
					ex = _error;
					return d('Error modulating draw sound', ex);
				}
			},
			blip: function(multiplier) {
				var ex;
				try {
					if (!muteEffects()) {
						return blipEffect != null ? blipEffect.trigger(multiplier) : void 0;
					}
				} catch (_error) {
					ex = _error;
					return d('Error playing blip sound', ex);
				}
			},
			bloop: function(multiplier) {
				var ex;
				try {
					if (!muteEffects()) {
						return bloopEffect != null ? bloopEffect.trigger(multiplier) : void 0;
					}
				} catch (_error) {
					ex = _error;
					return d('Error playing bloop sound', ex);
				}
			}
		};
		return controls;
	};
	initTips = function(ui) {
		var hide, index, show, showNext, tips;
		index = -1;
		tips = function() {
			return $('#tips .tip');
		};
		hide = function() {
			return tips().removeClass('showing');
		};
		show = function() {
			var t;
			if (MobileDetect()) {
				return;
			}
			hide();
			t = tips();
			if ((0 <= index && index < t.length)) {
				return t.filter(":eq(" + index + ")").addClass('showing');
			}
		};
		showNext = function() {
			if (MobileDetect()) {
				return;
			}
			index++;
			if (index === 2) {
				ui.showColorPicker(true);
				ui.showSymmetryControls(true);
				_.save('magicTipShown', true);
			}
			return show();
		};
		return {
			hide: hide,
			show: show,
			showNext: showNext
		};
	};
	initUI = function(silks) {
		var initColorPicker, initPreview, initSlider, initializedUI, makeToggle, mirror, mouseDownOnSlider, mouseOverPreviewableControls, preview, settingObservable, showColorPicker, showSymmetryControls, spiral, symSlider, toggleMirror, toggleSpiral, _ref1, _ref2;
		showColorPicker = ko.observable(false);
		showSymmetryControls = ko.observable(false);
		showColorPicker.subscribe(function(val) {
			return _.save('showColorPicker', val);
		});
		showSymmetryControls.subscribe(function(val) {
			return _.save('showSymmetryControls', val);
		});
		mouseOverPreviewableControls = ko.observable(false);
		mouseDownOnSlider = ko.observable(false);
		initPreview = function() {
			var addPointTimer, changeState, newPreviewSilk, previewSilk, previewSilkId, previewX, previewY, showPreview;
			previewSilk = null;
			previewSilkId = null;
			addPointTimer = null;
			previewX = previewY = null;
			changeState = function(setting, value) {
				var state;
				state = {};
				state[setting] = value;
				return newPreviewSilk(state);
			};
			newPreviewSilk = function(state, previewEmphasis) {
				var hadPreviewSilk, newState, prevState;
				if (state == null) {
					state = {};
				}
				if (previewEmphasis == null) {
					previewEmphasis = null;
				}
				if (!initializedUI) {
					return;
				}
				if (!showPreview()) {
					return;
				}
				hadPreviewSilk = previewSilk != null;
				if (hadPreviewSilk) {
					prevState = previewSilk.serialize();
					prevState.previewOpacity = previewSilk.previewOpacity;
					previewSilk.finish();
				} else {
					prevState = {};
				}
				newState = $.extend(prevState, state, {
					previewRadius: 5
				});
				if (previewEmphasis != null) {
					newState.previewEmphasis = previewEmphasis;
				} else {
					if (previewSilk != null) {
						newState.previewEmphasis = previewSilk.previewEmphasis;
					}
				}
				previewSilkId = silks.addPreviewSilk(newState);
				previewSilk = silks.getPreviewSilk(previewSilkId);
				if (!hadPreviewSilk) {
					previewSilk.fadeInFromZero();
				}
				return previewSilk.addPoint(previewX, previewY);
			};
			$('.control').mouseenter((function(_this) {
				return function() {
					var radius, scale, time;
					mouseOverPreviewableControls(true);
					d('enter', showPreview());
					time = 0;
					radius = 10;
					scale = 0.02;
					return addPointTimer = setInterval(function() {
						var cx, cy, offset, x, y, _ref1;
						_ref1 = silks.getCenterCoordinates(), cx = _ref1[0], cy = _ref1[1];
						x = radius * Math.cos(time * scale);
						y = radius * Math.sin(time * scale);
						offset = 100;
						previewX = cx + x - offset;
						previewY = cy + y - offset;
						if (previewSilk != null) {
							previewSilk.addPoint(previewX, previewY);
						}
						return time++;
					}, 1000 / 30);
				};
			})(this)).mouseleave((function(_this) {
				return function() {
					mouseOverPreviewableControls(false);
					return d('exit');
				};
			})(this)).mousemove((function(_this) {
				return function(e) {};
			})(this));
			showPreview = ko.computed((function(_this) {
				return function() {
					var show;
					show = mouseOverPreviewableControls() || mouseDownOnSlider();
					if (!show) {
						if (previewSilk != null) {
							previewSilk.completeAndFadeOut();
						}
						previewSilk = null;
						previewSilkId = null;
						clearInterval(addPointTimer);
					}
					return show;
				};
			})(this));
			return {
				newPreviewSilk: newPreviewSilk,
				changeState: changeState,
				isActive: function() {
					return previewSilkId != null;
				}
			};
		};
		settingObservable = function(setting) {
			var obs;
			silks.silkSettingsState[setting] = _.load(setting, silks.silkSettingsState[setting]);
			obs = ko.observable(silks.silkSettingsState[setting]);
			return ko.computed({
				read: function() {
					return obs();
				},
				write: function(value) {
					d('Saving', setting, value);
					_.save(setting, value);
					silks.silkSettingsState[setting] = value;
					return obs(value);
				}
			});
		};
		makeToggle = function(setting, onValue, offValue) {
			var isOn, obs, toggle;
			obs = settingObservable(setting);
			isOn = ko.computed(function() {
				return obs() === onValue;
			});
			toggle = function() {
				var value;
				value = isOn() ? offValue : onValue;
				obs(value);
				return preview.changeState(setting, value);
			};
			return [isOn, toggle];
		};
		initColorPicker = function() {
			var $svg, angleDifference, angleStep, centerX, centerY, color, colorSwatch, colors, dist, draggedSwatch, fiveForty, g, highlightSwatch, i, mouseDistScale, mouseoverSwatch, normalizeAngle, oneEighty, s, svg, swatch, swatches, threeSixty, twoPi, _fn, _i, _j, _len, _len1, _ref1;
			twoPi = 2 * Math.PI;
			oneEighty = Math.PI;
			threeSixty = Math.PI * 2;
			fiveForty = Math.PI * 3;
			angleDifference = function(start, end) {
				return (end - start + fiveForty) % threeSixty - oneEighty;
			};
			normalizeAngle = function(angle) {
				while (angle > twoPi) {
					angle -= twoPi;
				}
				while (angle < 0) {
					angle += twoPi;
				}
				return angle;
			};
			dist = function(x, y, xx, yy) {
				return Math.sqrt(Math.pow(x - xx, 2) + Math.pow(y - yy, 2));
			};
			svg = d3.select('#colorpicker');
			$svg = $(svg.node());
			g = svg.append('g');
			mouseDistScale = d3.scale.linear().domain([0, 90]).range([0, Math.PI / 2]).clamp(true);
			swatch = function(x, y, color, highlightColor, trueColor, trueHighlightColor) {
				var R, calcPoints, clip, clipId, gradient, gradientId, line, originalHighlightColor, path, points, r, setGradientAngle, stops, thing, trans, update, updateGradientAngle, updateGradientColors;
				if (trueColor == null) {
					trueColor = color;
				}
				if (trueHighlightColor == null) {
					trueHighlightColor = trueColor;
				}
				R = 27;
				r = 5;
				originalHighlightColor = highlightColor;
				clipId = _.uniqueId();
				clip = svg.append('defs').append('svg:clipPath').attr('id', clipId).append('path').attr('x', x).attr('y', y);
				gradientId = _.uniqueId();
				gradient = svg.append('svg:defs').append('svg:linearGradient').attr('id', gradientId).attr('x1', '100%').attr('y1', '0%').attr('x2', '100%').attr('y2', '100%').attr('spreadMethod', 'pad');
				stops = [gradient.append('svg:stop').attr('stop-opacity', 1).attr('offset', '0%'), gradient.append('svg:stop').attr('stop-opacity', 1).attr('offset', '25%'), gradient.append('svg:stop').attr('stop-opacity', 1).attr('offset', '50%'), gradient.append('svg:stop').attr('stop-opacity', 1).attr('offset', '75%'), gradient.append('svg:stop').attr('stop-opacity', 1).attr('offset', '100%')];
				points = new Array(40);
				calcPoints = function(mouseSvgX, mouseSvgY, mouseAngle, mouseDistance) {
					var angle, ccos, csin, cx, cy, i, threshold, _i, _ref1, _results;
					_results = [];
					for (i = _i = 0, _ref1 = points.length; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
						angle = i / points.length * twoPi;
						ccos = Math.cos(angle);
						csin = Math.sin(angle);
						cx = x + R * ccos;
						cy = y + R * csin;
						threshold = mouseDistScale(mouseDistance);
						if (mouseDistance > R && Math.abs(angleDifference(angle, mouseAngle)) < threshold && mouseDistance > dist(cx, cy, mouseSvgX, mouseSvgY)) {
							_results.push(points[i] = {
								x: mouseSvgX + r * ccos,
								y: mouseSvgY + r * csin
							});
						} else {
							_results.push(points[i] = {
								x: cx,
								y: cy
							});
						}
					}
					return _results;
				};
				line = d3.svg.line().x(function(d) {
					return d.x;
				}).y(function(d) {
					return d.y;
				}).interpolate('linear-closed');
				path = g.append('svg:path').style('fill', "url(#" + gradientId + ")").attr('clip-path', "url(#" + clipId + ")");
				trans = function(sel) {
					return sel.transition().ease('exp-out').duration(350);
				};
				setGradientAngle = function(angle) {
					var xpc, ypc;
					xpc = 50 * (Math.cos(angle) + 1);
					ypc = 50 * (Math.sin(angle) + 1);
					return gradient.attr({
						x1: xpc + '%',
						y1: ypc + '%',
						x2: (100 - xpc) + '%',
						y2: (100 - ypc) + '%'
					});
				};
				updateGradientAngle = function(targetAngle, anim) {
					if (anim) {
						return trans(gradient).duration(1000).tween('gradient', function() {
							var diff, startAngle, x1, y1;
							x1 = parseInt(gradient.attr('x1')) - 50;
							y1 = parseInt(gradient.attr('y1')) - 50;
							startAngle = Math.atan2(y1, x1);
							diff = angleDifference(normalizeAngle(startAngle), normalizeAngle(targetAngle));
							targetAngle = startAngle + diff;
							return function(t) {
								var angle;
								angle = t * targetAngle + (1 - t) * startAngle;
								return setGradientAngle(angle);
							};
						});
					} else {
						gradient.transition();
						return setGradientAngle(targetAngle);
					}
				};
				updateGradientColors = function() {
					var interp, linear, logistic, pc, selected, stop, val, _i, _len, _results;
					interp = d3.interpolateHcl(color, highlightColor);
					logistic = function(t) {
						var val;
						return val = 1 / (1 + Math.pow(Math.E, -(t * 12 - 6)));
					};
					linear = d3.scale.linear().domain([0, 1]).range([0, 0.7]).clamp(true);
					selected = path.classed('selected');
					_results = [];
					for (_i = 0, _len = stops.length; _i < _len; _i++) {
						stop = stops[_i];
						pc = parseInt(stop.attr('offset')) / 100;
						if (selected && highlightColor !== originalHighlightColor) {
							val = logistic(linear(pc));
						} else {
							val = pc;
						}
						_results.push(trans(stop).attr('stop-color', interp(val)));
					}
					return _results;
				};
				update = function(mousePageX, mousePageY, mouseDown) {
					var anim, gradientAngle, mouseAngle, mouseDistance, mouseRelativeX, mouseRelativeY, mouseSvgX, mouseSvgY, o, pathData;
					if (mouseDown == null) {
						mouseDown = true;
					}
					o = $svg.offset();
					mouseSvgX = mousePageX - o.left;
					mouseSvgY = mousePageY - o.top;
					mouseRelativeX = mousePageX - x;
					mouseRelativeY = mousePageY - y;
					mouseAngle = mousePageX !== 0 && mousePageY !== 0 ? Math.atan2(mouseSvgY - y, mouseSvgX - x) : 0;
					mouseDistance = dist(x, y, mouseSvgX, mouseSvgY);
					if (mouseDistance < R - 5) {
						gradientAngle = Math.PI / 2;
						if (mouseDown) {
							gradientAngle = -gradientAngle;
						}
					} else {
						if (mouseDown) {
							gradientAngle = Math.PI + mouseAngle;
						} else {
							gradientAngle = Math.PI / 2;
						}
					}
					if (mouseDown) {
						anim = false;
						calcPoints(mouseSvgX, mouseSvgY, mouseAngle, mouseDistance);
					} else {
						calcPoints(x, y, 0, 0);
						anim = mouseDistance > R - 5;
					}
					updateGradientAngle(gradientAngle, anim);
					pathData = line(points);
					if (anim) {
						trans(path).attr('d', pathData);
						return trans(clip).attr('d', pathData);
					} else {
						path.attr('d', pathData);
						return clip.attr('d', pathData);
					}
				};
				update(x, y, false);
				updateGradientColors();
				return thing = {
					path: path,
					update: update,
					updateGradientAngle: updateGradientAngle,
					trueColor: function() {
						return trueColor;
					},
					trueHighlightColor: function() {
						return trueHighlightColor;
					},
					color: function() {
						return color;
					},
					highlightColor: function(c) {
						if (!arguments.length) {
							return highlightColor;
						}
						if (c != null) {
							highlightColor = c;
						} else {
							highlightColor = originalHighlightColor;
						}
						updateGradientColors();
						return thing;
					},
					select: function() {
						path.classed('selected', true);
						$('#selected-color-icon').css('color', originalHighlightColor);
						return thing;
					},
					deselect: function() {
						path.classed('selected', false);
						return thing;
					}
				};
			};
			colors = [
				['#3e95cc', '#82cefc', '#276f9b', '#3dbbea'],
				['#53bf39', '#65eb43', '#53BD39'],
				['#e1d730', '#fdf23f', '#E3BF30'],
				['#ea5126', '#fd722e', '#EB5126'],
				['#db4775', '#fd5e8f', '#dd4876', '#fe495e'],
				['#825ba1', '#b585da'],
				['#555555', '#717171']
			];
			swatches = [];
			centerX = 175 / 2 + 10;
			centerY = 175 / 2;
			draggedSwatch = null;
			mouseoverSwatch = null;
			angleStep = Math.PI * 2 / 6;
			_ref1 = colors.slice(0, 6);
			for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
				color = _ref1[i];
				swatches.push(swatch.apply(null, [centerX + 65 * Math.cos(angleStep * i), centerY + 65 * Math.sin(angleStep * i)].concat(__slice.call(color))));
			}
			swatches.push(swatch.apply(null, [centerX, centerY].concat(__slice.call(colors[6]))));
			_fn = function(s) {
				return $(s.path.node()).on('mouseover', function() {
					if (draggedSwatch != null) {
						draggedSwatch.highlightColor(s.highlightColor());
					}
					return mouseoverSwatch = s;
				}).on('mousemove', function() {}).on('mouseout', function() {
					if (draggedSwatch != null) {
						draggedSwatch.highlightColor(null);
					}
					return mouseoverSwatch = null;
				}).on('mousedown', function(e) {
					if (e.button === 2) {
						return false;
					}
					this.parentNode.appendChild(this);
					s.path.style('pointer-events', 'none');
					_.each(swatches, function(s) {
						return s.highlightColor(null).deselect();
					});
					s.select();
					s.updateGradientAngle(-Math.PI / 2);
					return draggedSwatch = s;
				});
			};
			for (_j = 0, _len1 = swatches.length; _j < _len1; _j++) {
				s = swatches[_j];
				_fn(s);
			}
			colorSwatch = swatches[0];
			highlightSwatch = swatches[1];
			colorSwatch.highlightColor(highlightSwatch.highlightColor()).select();
			silks.silkSettingsState.color = colorSwatch.trueColor();
			silks.silkSettingsState.highlightColor = highlightSwatch.trueColor();
			return $(window).on('mousemove', function(e) {
				if (draggedSwatch != null) {
					return draggedSwatch.update(e.pageX, e.pageY);
				}
			}).on('mouseup', function(e) {
				var _k, _len2;
				if (draggedSwatch != null) {
					draggedSwatch.update(e.pageX, e.pageY, false);
					draggedSwatch.path.style('pointer-events', '');
					silks.silkSettingsState.color = draggedSwatch.trueColor();
					silks.silkSettingsState.highlightColor = (mouseoverSwatch != null) && mouseoverSwatch !== draggedSwatch ? mouseoverSwatch.trueColor() : draggedSwatch.trueHighlightColor();
					for (_k = 0, _len2 = swatches.length; _k < _len2; _k++) {
						s = swatches[_k];
						s.deselect();
					}
					draggedSwatch.select();
					if (typeof Hue !== "undefined" && Hue !== null) {
						Hue.setColor(silks.silkSettingsState.color);
					}
				}
				draggedSwatch = null;
				return mouseoverSwatch = null;
			});
		};
		initSlider = function(sel, vals, handleMoved) {
			var $el, $ghostHandle, $handle, $sliderBg, $sliderBgPc, bringHandlesTo, el, eventToPos, eventToX, eventToY, ghostHandle, halfHandleSize, handle, handleSize, height, mouseDown, sliderBg, sliderBgOffsetLeft, sliderBgOffsetTop, startPos, useX, useY, width;
			$el = $(sel);
			el = $el[0];
			$handle = $('.handle', el);
			handle = $handle[0];
			$ghostHandle = $('.ghost-handle', el);
			ghostHandle = $ghostHandle[0];
			$sliderBg = $el.find('.slider-bg');
			$sliderBgPc = $el.find('.slider-bg-pc');
			sliderBg = $sliderBg.position();
			sliderBgOffsetTop = sliderBg.top;
			sliderBgOffsetLeft = sliderBg.left + parseInt($sliderBg.css('margin-left'));
			d('off', sliderBgOffsetLeft);
			width = $sliderBg.width();
			height = $sliderBg.height();
			handleSize = $handle.width();
			halfHandleSize = handleSize / 2;
			useX = vals.x != null;
			useY = vals.y != null;
			bringHandlesTo = function(pos, onlyGhost) {
				var handleVals, x, y;
				if (onlyGhost == null) {
					onlyGhost = false;
				}
				handleVals = {};
				if (useX) {
					x = pos.x;
					handleVals.x = x / width;
					$ghostHandle.css('left', x + sliderBgOffsetLeft - halfHandleSize + 'px');
					if (!onlyGhost) {
						$handle.css('left', x + sliderBgOffsetLeft - halfHandleSize + 'px');
						$sliderBgPc.width(x + 'px');
						vals.x = handleVals.x;
					}
				}
				if (useY) {
					y = pos.y;
					handleVals.y = y / height;
					$ghostHandle.css('top', y + sliderBgOffsetTop - halfHandleSize + 'px');
					if (!onlyGhost) {
						$handle.css('top', y + sliderBgOffsetTop - halfHandleSize + 'px');
						vals.y = handleVals.y;
					}
				}
				return handleMoved(handleVals, onlyGhost);
			};
			eventToX = function(e) {
				var bucket, bucketSize, n, x;
				x = e.pageX - $el.offset().left - sliderBgOffsetLeft;
				if (x < 0) {
					x = 0;
				}
				if (x > width) {
					x = width;
				}
				n = 6;
				bucketSize = width / n;
				bucket = Math.round(x / bucketSize);
				return bucket * bucketSize;
			};
			eventToY = function(e) {
				var y;
				y = e.pageY - $el.offset().top + sliderBgOffsetTop;
				if (y < 0) {
					y = 0;
				}
				if (y > height) {
					y = height;
				}
				return y;
			};
			eventToPos = function(e) {
				var pos;
				pos = {};
				if (useX) {
					pos.x = eventToX(e);
				}
				if (useY) {
					pos.y = eventToY(e);
				}
				return pos;
			};
			startPos = {};
			if (useX) {
				if (vals.x > 1) {
					vals.x = 1;
				}
				if (vals.x < 0) {
					vals.x = 0;
				}
				startPos.x = vals.x * width;
			}
			if (useY) {
				if (vals.y > 1) {
					vals.y = 1;
				}
				if (vals.y < 0) {
					vals.y = 0;
				}
				startPos.y = vals.y * height;
			}
			bringHandlesTo(startPos);
			mouseDown = false;
			$el.on('mousedown', function(e) {
				mouseDown = true;
				mouseDownOnSlider(true);
				return bringHandlesTo(eventToPos(e));
			}).on('mousemove', function(e) {
				if (mouseDownOnSlider() === mouseDown) {
					return bringHandlesTo(eventToPos(e), true);
				}
			}).on('mouseup', function(e) {
				mouseDown = false;
				return mouseDownOnSlider(false);
			}).mouseleave(function(e) {
				if (!mouseDown) {
					return handleMoved(vals);
				}
			});
			return $(window).on('mousemove', function(e) {
				if (mouseDown) {
					return bringHandlesTo(eventToPos(e));
				}
			}).on('mouseup', function(e) {
				if (mouseDown) {
					mouseDown = false;
					return mouseDownOnSlider(false);
				}
			});
		};
		initializedUI = false;
		initColorPicker();
		preview = initPreview();
		_ref1 = makeToggle('symMirror', true, false), mirror = _ref1[0], toggleMirror = _ref1[1];
		_ref2 = makeToggle('spiralCopies', 4, 1), spiral = _ref2[0], toggleSpiral = _ref2[1];
		$('#toggle-mirror').mouseenter(function() {
			return preview.newPreviewSilk({}, 'mirror');
		});
		$('#toggle-spiral').mouseenter(function() {
			return preview.newPreviewSilk({}, 'spiral');
		});
		symSlider = initSlider('#sym-num-rotations', {
			x: _.unlerp(1, 6, _.load('symNumRotations', silks.silkSettingsState.symNumRotations))
		}, function(vals, ghost) {
			var silkState, state;
			state = {
				symNumRotations: Math.round(_.lerp(1, 6, vals.x))
			};
			_.save('symNumRotations', state.symNumRotations);
			if (state.symNumRotations > 1) {
				$('#sym-num-rotations-label').html("" + state.symNumRotations + "-fold rotational symmetry");
			} else {
				$('#sym-num-rotations-label').html("No rotational symmetry");
			}
			preview.newPreviewSilk(state, 'rotation');
			if (!ghost) {
				silks.extendSilkSettingsState(state);
			}
			return silkState = silks.silkSettingsState;
		});
		initializedUI = true;
		return _.extend({
			tips: initTips({
				showColorPicker: showColorPicker,
				showSymmetryControls: showSymmetryControls
			}),
			mirror: mirror,
			toggleMirror: toggleMirror,
			spiral: spiral,
			toggleSpiral: toggleSpiral,
			showColorPicker: showColorPicker,
			showSymmetryControls: showSymmetryControls,
			mouseOverPreviewableControls: mouseOverPreviewableControls,
			mouseDownOnSlider: mouseDownOnSlider
		});
	};
	$((function(_this) {
		return function() {
			var b, bufferCanvas, container, drawsPerFrame, drawsPerFrameRatio, endTime, frame, frameCount, h2, hideIntroSilk, introEnd, introLength, introSilkId, introStart, isIPhone, isRightSideUp, pmouseX, pmouseY, replayUrlForId, resetShareOptions, silkCanvas, silks, sound, sparksCanvas, startTime, ui, updateOrientation, urlParams, w2, weShouldEvenHaveAnIntroSilkAtAll, _ref1, _ref2;
			container = document.getElementById('canvii-container');
			silkCanvas = document.getElementById('silk-1');
			bufferCanvas = document.getElementById('silk-2');
			sparksCanvas = document.getElementById('sparks');
			isIPhone = /(iPhone|iPod).*AppleWebKit/i.test(navigator.userAgent);
			isRightSideUp = ko.observable(window.orientation === 0 || window.orientation === 180);
			updateOrientation = function() {
				return isRightSideUp(window.orientation === 0 || window.orientation === 180);
			};
			window.addEventListener('orientationchange', updateOrientation, false);
			hideIntroSilk = function() {
				if (b.introSilkShowing()) {
					silks.clear(false);
					return b.introSilkShowing(false);
				}
			};
			$('#sparks').mousedown(hideIntroSilk).on('touchstart', hideIntroSilk);
			window._s = silks = new Silks(container, silkCanvas, bufferCanvas, sparksCanvas);
			silks.initInputEvents();
			ui = initUI(silks);
			startTime = +new Date();
			endTime = startTime + 16;
			if ((_ref1 = window.Hue) != null) {
				_ref1.setColor = function(color) {
					var h, l, num, s;
					color = d3.hsl(color);
					h = parseInt(65536 * (color.h / 360));
					s = color.s > 50 ? 255 : parseInt(255 * color.s);
					l = parseInt(255 * color.l);
					num = [1, 2, 3];
					if (typeof Hue !== "undefined" && Hue !== null) {
						Hue.setBri(num, l);
					}
					return typeof Hue !== "undefined" && Hue !== null ? Hue.setHueSat(num, h, s) : void 0;
				};
			}
			frameCount = 0;
			h2 = $(window).height() / 2;
			w2 = $(window).width() / 2;
			replayUrlForId = function(id) {
				return "http://r.weavesilk.com/?v=4&id=" + id;
			};
			weShouldEvenHaveAnIntroSilkAtAll = true;
			introSilkId = null;
			introStart = 25;
			drawsPerFrame = 2;
			drawsPerFrameRatio = 5 / 2;
			introLength = 45 * drawsPerFrameRatio;
			introEnd = introStart + introLength;
			frame = function() {
				frameCount++;
				if (b.introSilkShowing() && weShouldEvenHaveAnIntroSilkAtAll) {
					switch (false) {
						case frameCount !== introStart:
							introSilkId = silks.add('intro', {
								symNumRotations: 6,
								symMirror: true,
								color: '#276f9b',
								highlightColor: '#825ba1',
								highlightMode: 'time',
								timeColorScaleDomainHigh: 500,
								symCenterX: w2,
								symCenterY: h2,
								startOpacity: 0.08,
								noiseOffset: 10000 * Math.random(),
								drawsPerFrame: drawsPerFrame
							});
							break;
						case !((introStart <= frameCount && frameCount < introEnd) && frameCount % 2 === 0):
							silks.addPoint(introSilkId, w2 + 5, h2 - 5, 0, 0);
							break;
						case frameCount !== introEnd:
							silks.complete(introSilkId);
					}
				}
				startTime = +new Date();
				silks.frame((startTime - endTime) / 16);
				endTime = +new Date();
				return setTimeout(frame, 16 - (endTime - startTime));
			};
			sound = null;
			b = {
				isIPhone: isIPhone,
				isRightSideUp: isRightSideUp,
				clipText: ko.observable('Copy link'),
				canUndo: silks.snapshotState.canUndo,
				justCleared: silks.snapshotState.justCleared,
				nextUndoIsRedo: silks.nextUndoIsRedo,
				nextUndoIsNotRedo: ko.computed(function() {
					return !silks.nextUndoIsRedo();
				}),
				introSilkShowing: ko.observable(true),
				clear: function() {
					var url;
					if (!silks.snapshotState.justCleared()) {
						ui.tips.showNext();
					}
					b.showingReplayThumbnail(false);
					b.isReplay(false);
					url = window.location.href;
					url = url.substring(0, url.indexOf('?'));
					if (sound != null) {
						sound.playClearSound();
					}
					b.showIntro(false);
					resetShareOptions();
					return silks.clear();
				},
				undo: function() {
					silks.undo();
					if (silks.snapshotState.justCleared()) {
						return ui.tips.show();
					} else {
						return ui.tips.hide();
					}
				},
				silkActive: ko.observable(false),
				showAbout: ko.observable(false),
				showDownload: ko.observable(false),
				showIntro: ko.observable(true),
				isFullscreen: ko.observable($.Fullscreen.isFullscreen()),
				toggleFullscreen: function() {
					if ($.Fullscreen.isFullscreen()) {
						$.Fullscreen.cancelFullscreen();
						return b.isFullscreen(false);
					} else {
						$('html').requestFullscreen();
						return b.isFullscreen(true);
					}
				},
				showColorPicker: ui.showColorPicker,
				showSymmetryControls: ui.showSymmetryControls,
				mouseOverControls: ui.mouseOverControls,
				mouseDownOnSlider: ui.mouseDownOnSlider,
				mirror: ui.mirror,
				toggleMirror: ui.toggleMirror,
				spiral: ui.spiral,
				toggleSpiral: ui.toggleSpiral,
				shareLoading: ko.observable(false),
				showShareOptions: ko.observable(false),
				shareUrlDirect: ko.observable(''),
				shareUrlThumbnail: ko.observable(''),
				toggleSound: function() {},
				toggleAbout: function() {
					return b.showAbout(!b.showAbout());
				},
				toggleAllControls: function() {
					b.showDownload(false);
					b.showColorPicker(!b.showColorPicker());
					return b.showSymmetryControls(!b.showSymmetryControls());
				},
				download: function() {
					if (b.showDownload()) {
						return b.showDownload(false);
					} else {
						b.showDownload(true);
						b.showColorPicker(false);
						b.showSymmetryControls(false);
						return $('#download-image').attr('src', silks.getImageUrl());
					}
				},
				shareButtonClick: function() {
					if (b.shareDisabled()) {
						return;
					}
					b.hideReplayThumbnail();
					if (b.shareUrlDirect()) {
						return b.showShareOptions(true);
					} else {
						b.shareLoading(true);
						b.showShareOptions(false);
						return $.ajax({
							url: 'http://weavesilk-replays.herokuapp.com/v4/save_replay',
							type: 'POST',
							dataType: 'json',
							data: {
								json: JSON.stringify(silks.getReplay()),
								thumb: silks.makeThumb()
							},
							success: function(data) {
								var id, thumbUrl, url, _ref2;
								d('Got', typeof data, 'data:', data);
								_ref2 = data.result, id = _ref2.id, thumbUrl = _ref2.thumbUrl;
								url = replayUrlForId(id);
								b.shareUrlDirect(url);
								b.shareUrlThumbnail(thumbUrl);
								return b.showShareOptions(true);
							},
							error: function(data) {
								alert('There was an error uploading your picture. Maybe try again?');
								return b.showShareOptions(false);
							},
							complete: function() {
								return b.shareLoading(false);
							}
						});
					}
				},
				toggleControls: function() {
					return b.controlsVisible(!b.controlsVisible());
				}
			};
			b.showingReplayThumbnail = ko.observable(false);
			b.hideReplayThumbnail = function() {
				return b.showingReplayThumbnail(false);
			};
			b.isReplay = ko.observable(false);
			b.isOnMobile = ko.observable(MobileDetect());
			b.shareUrlEmail = ko.computed(function() {
				var url;
				url = b.shareUrlDirect();
				return "mailto:?subject=" + (escape('Silk -- Interactive generative art')) + "&body=" + (escape('I just drew this on weavesilk.com: ' + url));
			});
			b.pristine = ko.observable(false || !b.showColorPicker());
			b.muted = (_ref2 = sound != null ? sound.muteSound : void 0) != null ? _ref2 : ko.observable(true);
			b.notMuted = ko.computed(function() {
				return !b.muted();
			});
			b.toggleMute = function() {
				d;
				if (sound != null ? sound.muteSound() : void 0) {
					if (sound != null) {
						sound.setMuteMusic(false);
					}
					return sound != null ? sound.setMuteEffects(false) : void 0;
				} else {
					if (sound != null) {
						sound.setMuteMusic(true);
					}
					return sound != null ? sound.setMuteEffects(true) : void 0;
				}
			};
			resetShareOptions = function() {
				b.showShareOptions(false);
				return b.shareUrlDirect('');
			};
			b.notPristine = ko.computed(function() {
				return !b.pristine();
			});
			b.announcementClosePressed = ko.observable(false);
			b.closeAnnouncement = function() {
				b.announcementClosePressed(true);
				return _.save('announcementClosePressed', true);
			};
			b.hideAllAds = ko.observable(false);
			b.showAnyAnnouncement = ko.computed(function() {
				return b.notPristine() && !b.hideAllAds();
			});
			$('#about-button').dblclick(function() {
				return b.hideAllAds(!b.hideAllAds());
			});
			b.numClears = ko.observable(0);
			b.justCleared.subscribe(function(val) {
				if (val) {
					return b.numClears(1 + b.numClears());
				}
			});
			b.showBigAnnouncementDefault = ko.computed(function() {
				return b.showAnyAnnouncement() && (b.introSilkShowing() || (b.justCleared() && b.notPristine()) || b.isReplay() || b.isOnMobile());
			});
			b.notShowBigAnnouncementDefault = ko.computed(function() {
				return !b.showBigAnnouncementDefault();
			});
			b.showBigAnnouncement = ko.computed(function() {
				var isAndroid;
				isAndroid = navigator.userAgent.match(/Android/i);
				if (b.numClears() < 5) {
					return b.showAnyAnnouncement() && !isAndroid;
				} else {
					return b.showBigAnnouncementDefault() && !isAndroid;
				}
			});
			b.notPristineAndJustCleared = ko.computed(function() {
				return !b.pristine() && b.justCleared();
			});
			b.shareDisabled = ko.computed(function() {
				return b.justCleared() || b.shareLoading();
			});
			b.notShareDisabled = ko.computed(function() {
				return !b.shareDisabled();
			});
			b.showShareButton = ko.computed(function() {
				return b.notPristine() && !b.showShareOptions();
			});
			b.isNotFullscreen = ko.computed(function() {
				return !b.isFullscreen();
			});
			b.shareUrlFacebook = ko.computed(function() {
				var url;
				url = encodeURI(b.shareUrlDirect());
				return "https://www.facebook.com/dialog/feed?app_id=408271179236250&link=" + (escape(url)) + "&picture=" + (encodeURI(b.shareUrlThumbnail())) + "&name=" + 'Silk – Interactive Generative Art' + "&caption=" + (escape('weavesilk.com')) + "&description=" + (encodeURI('Create beautiful flowing art with Silk.')) + "&redirect_uri=" + (encodeURI(url));
			});
			b.shareUrlTwitter = ko.computed(function() {
				var url;
				url = encodeURI(b.shareUrlDirect());
				return "https://twitter.com/share?url=" + (escape(url)) + "&text=" + (escape('Look what I drew with #weavesilk!'));
			});
			b.shareUrlPinterest = ko.computed(function() {
				var url;
				url = encodeURI(b.shareUrlDirect());
				return "http://pinterest.com/pin/create/button/?url=" + url + "&media=" + (encodeURI(b.shareUrlThumbnail()));
			});
			silks.drawInputPreview = false;
			pmouseX = pmouseY = 0;
			$('#sparks').mousedown(function(e) {
				if (sound != null) {
					sound.start();
				}
				if (sound != null) {
					sound.playDrawSound();
				}
				pmouseX = e.pageX;
				pmouseY = e.pageY;
				b.silkActive(true);
				resetShareOptions();
				ui.tips.hide();
				b.showDownload(false);
				b.showAbout(false);
				b.showIntro(false);
				return b.hideReplayThumbnail();
			}).mousemove(function(e) {
				var sq, vmx, vmy;
				vmx = pmouseX - e.pageX;
				vmy = pmouseY - e.pageY;
				sq = vmx * vmx + vmy * vmy;
				if (sq > 0) {
					if (sound != null) {
						sound.modulateDrawSound(Math.sqrt(sq));
					}
				} else {
					if (sound != null) {
						sound.modulateDrawSound(0);
					}
				}
				pmouseX = e.pageX;
				return pmouseY = e.pageY;
			}).mouseup(function(e) {
				b.pristine(false);
				b.silkActive(false);
				silks.drawInputPreview = true;
				return sound != null ? sound.stopDrawSound() : void 0;
			}).on('touchstart', function(e) {
				pmouseX = e.pageX;
				pmouseY = e.pageY;
				b.silkActive(true);
				resetShareOptions();
				ui.tips.hide();
				b.showDownload(false);
				b.showAbout(false);
				return b.showIntro(false);
			}).on('touchend', function(e) {
				b.pristine(false);
				return b.silkActive(false);
			});
			ko.applyBindings(b);
			if (MobileDetect()) {
				$('#main-controls .silk-icon').css('display', 'none');
			}
			key('n, x, space', _.throttle(function() {
				b.clear();
				return b.showDownload(false);
			}, 150));
			key('z, u', _.throttle(b.undo, 150));
			key('r', silks.replayReplay);
			key('c', b.toggleAllControls);
			urlParams = {};
			(function() {
				var decode, match, pl, query, search, _results;
				pl = /\+/g;
				search = /([^&=]+)=?([^&]*)/g;
				decode = function(s) {
					return decodeURIComponent(s.replace(pl, " "));
				};
				query = window.location.search.substring(1);
				_results = [];
				while (match = search.exec(query)) {
					_results.push(urlParams[decode(match[1])] = decode(match[2]));
				}
				return _results;
			})();
			$('.direct-link').focus(function() {
				return $(this).select();
			});
			b.showShareOptions.subscribe(function(val) {
				if (!val) {
					return $('.direct-link').blur();
				}
			});
			if ((urlParams.id != null) && (urlParams.v != null)) {
				b.pristine(false);
				b.showIntro(false);
				weShouldEvenHaveAnIntroSilkAtAll = false;
				b.showingReplayThumbnail(true);
				b.isReplay(true);
				$.ajax({
					url: "http://weavesilk.s3.amazonaws.com/v" + urlParams.v + "/uploads/replay/" + urlParams.id + ".json",
					type: 'GET',
					dataType: 'json',
					success: function(data) {
						var url;
						d('Got data:', data);
						silks.playReplay(data);
						url = replayUrlForId(urlParams.id);
						b.introSilkShowing(false);
						b.showShareOptions(false);
						b.shareUrlDirect(url);
						return b.shareUrlThumbnail("http://weavesilk.s3.amazonaws.com/v4/uploads/thumb/" + urlParams.id + ".png");
					}
				});
			}
			return frame();
		};
	})(this));
}).call(this);