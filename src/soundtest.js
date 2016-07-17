var osc;

function setup() {
	osc = new p5.Oscillator(480, 'sawtooth');
	// osc.setType('sine');

	// osc.amp(0.5);
	osc.start();
	osc.freq(466.16);
	osc.stop();
}

function draw() {
}
