var undef

function Marsaglia(i1, i2) {
	var z = i1 || 362436069,
		w = i2 || 521288629;
	var nextInt = function() {
		z = (36969 * (z & 65535) + (z >>> 16)) & 0xFFFFFFFF;
		w = (18000 * (w & 65535) + (w >>> 16)) & 0xFFFFFFFF;
		return (((z & 0xFFFF) << 16) | (w & 0xFFFF)) & 0xFFFFFFFF;
	};
	this.nextDouble = function() {
		var i = nextInt() / 4294967296;
		return i < 0 ? 1 + i : i;
	};
	this.nextInt = nextInt;
}
Marsaglia.createRandomized = function() {
	var now = new Date();
	return new Marsaglia((now / 60000) & 0xFFFFFFFF, now & 0xFFFFFFFF);
};

function PerlinNoise(seed) {
	var rnd = seed !== undef ? new Marsaglia(seed) : Marsaglia.createRandomized();
	var i, j;
	var perm = new Array(512)
	for (i = 0; i < 256; ++i) {
		perm[i] = i;
	}
	for (i = 0; i < 256; ++i) {
		var t = perm[j = rnd.nextInt() & 0xFF];
		perm[j] = perm[i];
		perm[i] = t;
	}
	for (i = 0; i < 256; ++i) {
		perm[i + 256] = perm[i];
	}

	function grad3d(i, x, y, z) {
		var h = i & 15;
		switch (h & 0xF) {
			case 0x0:
				return x + y;
			case 0x1:
				return -x + y;
			case 0x2:
				return x - y;
			case 0x3:
				return -x - y;
			case 0x4:
				return x + z;
			case 0x5:
				return -x + z;
			case 0x6:
				return x - z;
			case 0x7:
				return -x - z;
			case 0x8:
				return y + z;
			case 0x9:
				return -y + z;
			case 0xA:
				return y - z;
			case 0xB:
				return -y - z;
			case 0xC:
				return y + x;
			case 0xD:
				return -y + z;
			case 0xE:
				return y - x;
			case 0xF:
				return -y - z;
			default:
				return 0;
		}
	}

	function grad2d(i, x, y) {
		var v = (i & 1) === 0 ? x : y;
		return (i & 2) === 0 ? -v : v;
	}

	function grad1d(i, x) {
		return (i & 1) === 0 ? -x : x;
	}

	function lerp(t, a, b) {
		return a + t * (b - a);
	}
	this.noise3d = function(x, y, z) {
		var X = (x | 0) & 255,
			Y = (y | 0) & 255,
			Z = (z | 0) & 255;
		x -= (x | 0);
		y -= (y | 0);
		z -= (z | 0);
		var fx = (3 - 2 * x) * x * x,
			fy = (3 - 2 * y) * y * y,
			fz = (3 - 2 * z) * z * z;
		var p0 = perm[X] + Y,
			p00 = perm[p0] + Z,
			p01 = perm[p0 + 1] + Z,
			p1 = perm[X + 1] + Y,
			p10 = perm[p1] + Z,
			p11 = perm[p1 + 1] + Z;
		return lerp(fz, lerp(fy, lerp(fx, grad3d(perm[p00], x, y, z), grad3d(perm[p10], x - 1, y, z)), lerp(fx, grad3d(perm[p01], x, y - 1, z), grad3d(perm[p11], x - 1, y - 1, z))), lerp(fy, lerp(fx, grad3d(perm[p00 + 1], x, y, z - 1), grad3d(perm[p10 + 1], x - 1, y, z - 1)), lerp(fx, grad3d(perm[p01 + 1], x, y - 1, z - 1), grad3d(perm[p11 + 1], x - 1, y - 1, z - 1))));
	};
	this.noise2d = function(x, y) {
		var X = Math.floor(x) & 255,
			Y = Math.floor(y) & 255;
		x -= Math.floor(x);
		y -= Math.floor(y);
		var fx = (3 - 2 * x) * x * x,
			fy = (3 - 2 * y) * y * y;
		var p0 = perm[X] + Y,
			p1 = perm[X + 1] + Y;
		return lerp(fy, lerp(fx, grad2d(perm[p0], x, y), grad2d(perm[p1], x - 1, y)), lerp(fx, grad2d(perm[p0 + 1], x, y - 1), grad2d(perm[p1 + 1], x - 1, y - 1)));
	};
	this.noise1d = function(x) {
		var X = Math.floor(x) & 255;
		x -= Math.floor(x);
		var fx = (3 - 2 * x) * x * x;
		return lerp(fx, grad1d(perm[X], x), grad1d(perm[X + 1], x - 1));
	};
}
window.noiseProfile = {
	generator: undef,
	octaves: 4,
	fallout: 0.5,
	seed: undef
};
window.noiseProfile.generator = new PerlinNoise(0)
window.noise = function(x, y, z, octaves, fallout) {
	var generator = noiseProfile.generator;
	var effect = 1,
		k = 1,
		sum = 0;
	for (var i = 0; i < octaves; ++i) {
		effect *= fallout;
		sum += effect * (1 + generator.noise3d(k * x, k * y, k * z)) / 2;
		k *= 2;
	}
	return sum;
};
window.noiseDetail = function(octaves, fallout) {
	noiseProfile.octaves = octaves;
	if (fallout !== undef) {
		noiseProfile.fallout = fallout;
	}
};
window.noiseSeed = function(seed) {
	noiseProfile.seed = seed;
	noiseProfile.generator = undef;
};