/**
* Simple demonstration of a neural net
*/

'use strict';

	// The current weights of the two cells
var weights = [Math.random(), Math.random()],
	// counter for iterations
	count = 0,
	// How many adjustments we made
	adjustments = 0,
	k = 0.0001;

/**
* The processor node's function
* 
* @param {[float]} Array of inputs
* @param {[float]} Array of weights
* @return {int} [output] A -1 or 1 if the point is above y = 1
*/
var process = function(inputs, weights) {
	var sum = 0;

	for (var i = 0, length = inputs.length; i < length; i++) {
		sum += inputs[i] * weights[i];
	}

	return activate(sum);
};

var activate = function(sum) {
	if (sum - 1 > 0) {
		return 1.0;
	}

	return -1.0;
};

/**
* Creates a piece of data with the desired output
* @return {
*	x: float,
*	y: float,
*	output: -1 or 1
* }
*/
var createData = function() {
	var data = {
		inputs: []
	};

	// We're only going to generate an x and a y
	for (var i = 0, length = 2; i < length; i++) {
		data.inputs[i] = Math.random() * 10 - 5;
	}

	// Calulate the output and append it
	if (data.inputs[1] > 1) {
		data.output = 1.0;
	} else {
		data.output = -1.0;
	}

	return data;
};

console.log('Starting: ' + weights);

while (count < 20000000) {
	// Up the counter
	count = count + 1;

		// Generate a piece of data
	var dataPiece = createData(),
		// Find the current output of the net
		output = process(dataPiece.inputs, weights),
		// Calculate the error
		error = dataPiece.output - output;

	if (error === 0) {
		continue;
	} else {
		adjustments++;
	}

	for (var i = 0, length = weights.length; i < length; i++) {
		weights[i] = weights[i] + k * dataPiece.inputs[i] * error;
	}

}

// Log out the final result
console.log('Results: ' + weights);
console.log('Adjustments made:' + adjustments);