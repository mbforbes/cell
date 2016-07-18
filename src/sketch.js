// globals ew
var grid;
var sounds;
var lastTime = (new Date()).getTime();
var gridSize = 10;

// constants hmmmm
var off = 250;
var on = 0;
freqs = [
	16.35,
	17.32,
	18.35,
	19.45,
	20.6,
	21.83,
	23.12,
	24.5,
	25.96,
	27.5,
	29.14,
	30.87,
	32.7,
	34.65,
	36.71,
	38.89,
	41.2,
	43.65,
	46.25,
	49,
	51.91,
	55,
	58.27,
	61.74,
	65.41,
	69.3,
	73.42,
	77.78,
	82.41,
	87.31,
	92.5,
	98,
	103.83,
	110,
	116.54,
	123.47,
	130.81,
	138.59,
	146.83,
	155.56,
	164.81,
	174.61,
	185,
	196,
	207.65,
	220,
	233.08,
	246.94,
	261.63,
	277.18,
	293.66,
	311.13,
	329.63,
	349.23,
	369.99,
	392,
	415.3,
	440,
	466.16,
	493.88,
	523.25,
	554.37,
	587.33,
	622.25,
	659.25,
	698.46,
	739.99,
	783.99,
	830.61,
	880,
	932.33,
	987.77,
	1046.5,
	1108.73,
	1174.66,
	1244.51,
	1318.51,
	1396.91,
	1479.98,
	1567.98,
	1661.22,
	1760,
	1864.66,
	1975.53,
	2093,
	2217.46,
	2349.32,
	2489.02,
	2637.02,
	2793.83,
	2959.96,
	3135.96,
	3322.44,
	3520,
	3729.31,
	3951.07,
	4186.01,
	4434.92,
	4698.63,
	4978.03,
	5274.04,
	5587.65,
	5919.91,
	6271.93,
	6644.88,
	7040,
	7458.62,
	7902.13,
];
// frequency start idx
fsidx = 60;

// pentatonic
fxidx = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21];

/// p5.js-called function
function setup() {
	createCanvas(800, 800);

	// setup the grid
	grid = [];
	for (var i = 0; i < gridSize; i++) {
		var row = [];
		for (var j = 0; j < gridSize; j++) {
			row.push(off);
		}
		grid.push(row);
	}

	// ... and start one as black
	grid[5][0] = on;

	// create oscillators for each grid location w/ sound matrix
	sounds = [];
	for (var x = 0; x < gridSize; x++) {
		var r = [];
		for (var y = 0; y < gridSize; y++) {
			var osc = new p5.Oscillator();
			// TODO(mbforbes): Curspot. Figure out sounds with p5.js.
			//
			// Try generating these frequencies from a function:
			// - http://www.phy.mtu.edu/~suits/notefreqs.html
			//
			// Idea:
			// - pentatonic scale
			// - different note per column
			// - each row is a different octave
			//
			// osc.freq();
			osc.setType('sine');
			osc.amp(0.3);
			osc.start();
			osc.freq(freqs[fsidx + fxidx[x]]);
			osc.stop();
			r.push(osc);
		}
		sounds.push(r);
	}

	// start sound
	sound();
}

/// custom function
function step() {
	// copy manually
	var newGrid = [];
	for (var x = 0; x < grid.length; x++) {
		var row = [];
		for (var y = 0; y < grid[x].length; y++) {
			row.push(grid[x][y]);
		}
		newGrid.push(row);
	}

	// automata rules
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			// rules!
			// turn on if left neighbor on
			if (i > 0 && grid[i-1][j] == on && grid[i][j] == off) {
				newGrid[i][j] = on;
				// console.log('updating at (' + i + ', ' + j + ')');
				// console.log(newGrid[i][j]);
				// console.log(grid[i][j]);
			}
			// turn on if right neighbor on
			if (i < grid.length - 1 && grid[i+1][j] == on && grid[i][j] == off) {
				newGrid[i][j] = on;
				// console.log('updating at (' + i + ', ' + j + ')');
				// console.log(newGrid[i][j]);
				// console.log(grid[i][j]);
			}
			// turn off if both neighbors on
			if (i < grid.length - 1 && i > 0 && grid[i+1][j] == on && grid[i-1][j] == on && grid[i][j] == on) {
				newGrid[i][j] = off;
				// console.log('updating at (' + i + ', ' + j + ')');
				// console.log(newGrid[i][j]);
				// console.log(grid[i][j]);
			}
		}
	}
	grid = newGrid;
}

/// render grid as sounds
function sound() {
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			if (grid[i][j] == on) {
				sounds[i][j].start();
				sounds[i][j].freq(freqs[fsidx + fxidx[i]]);
				sounds[i][j].stop(0.75);
			} else {
				sounds[i][j].stop();
			}
		}
	}
}

/// p5.js-called function
function draw() {
	clear();

	// if (mouseIsPressed) {
	// 	fill(0);
	// } else {
	// 	fill(255);
	// }
	// if (mouseX !== 0 && mouseY !== 0) {
	// 	ellipse(mouseX, mouseY, 80, 80);
	// }

	// // draw text (timing! yay! we can time!)
	// fill(0);
	// textSize(32);
	// text((new Date()).getTime(), 100, 100);
	// // console.log(d.getTime());

	// let's try to render our grid
	var offset = 100;
	var scale = 50;
	var size = 40;
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			// pick circle color
			fill(grid[i][j]);

			// draw circle
			ellipse(i * scale + offset, (gridSize - j) * scale + offset, size, size);

			// pick text color & size
			textSize(size/4);
			fill(0, 102, 153);

			// draw text
			text('(' + i + ',' + j + ')', i*scale + offset - size/4, (gridSize-j)*scale+offset);
		}

	}

	// milliseconds
	var delay = 750;
	var now = (new Date()).getTime();
	if (now > lastTime + delay) {
		lastTime = now;
		step();
		sound();
	}
}
