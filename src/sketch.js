// globals ew
var grid;
var sounds;
var lastTime = (new Date()).getTime();
var gridSize = 10;

// constants hmmmm
var off = 250;
var on = 0;

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
			osc.setType('sine');
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
			r.push(off);
		}
		sounds.push(r);
	}
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
			fill(grid[i][j]);
			ellipse(i * scale + offset, (gridSize - j) * scale + offset, size, size);
		}

	}

	// milliseconds
	var delay = 500;
	var now = (new Date()).getTime();
	if (now > lastTime + delay) {
		lastTime = now;
		step();
	}
}
