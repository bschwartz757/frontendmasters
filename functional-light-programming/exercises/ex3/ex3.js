function mult(...args) {
	// base case - where we exit the recursion
	if (args.length <= 2) {
		return args[0] * args[1];
	}
	// until we reach base case - call the function again,
	// passing the next value in the list
	return args[0] * mult(...args.slice(1));
}

mult(3,4,5);	// 60

mult(3,4,5,6);	// Oops!
