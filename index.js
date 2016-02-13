/**
* Simple demonstration of a neural net
*/

'use strict';

	// The current weights of the two cells
	// [BedPrice, BathPrice, SquarePrice]
var weights = [100, 100],
	// counter for iterations
	count = 0,
	// How many adjustments we made
	adjustments = 0,
	k = 0.1;

/**
* The processor node's function
* 
* @param {[float]} Array of inputs
* @param {[float]} Array of weights
*/
var process = function(inputs, weights) {
	var sum = 0;

	for (var i = 0, length = inputs.length; i < length; i++) {
		sum += inputs[i] * weights[i];
	}

	return sum;
};

/**
* Creates a piece of data with the desired output
*/
var createData = function() {
	var data = {
		inputs: [],
		output: null
	};

	// Generate a random number of rooms
	var numBeds = Math.floor(Math.random() * (5 - 1 + 1) + 1),
		numBaths = Math.floor(Math.random() * (3 - 1 + 1) + 1);

	data.inputs = [numBeds, numBaths];

	// Get the unit prices
	var bedUnitPrice = Math.floor(Math.random() * (950 - 750 + 1) + 750),
		bathUnitPrice = Math.floor(Math.random() * (700 - 600 + 1) + 600);

	// Calculate the price of the house based on the weights
	data.output = numBeds * bedUnitPrice + numBaths * bathUnitPrice;

	return data;
};

while (count < 10000000) {
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

	var sign = 1;

	if (error < 0) {
		sign = -1;
	}

	for (var i = 0, length = weights.length; i < length; i++) {
		weights[i] = weights[i] + sign * k * dataPiece.inputs[i];
	}

}

// Log out the final result
console.log('Results: ' + weights);
console.log('Adjustments made:' + adjustments);