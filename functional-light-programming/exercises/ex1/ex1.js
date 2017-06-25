function bar(x, y) {
	var z;
	foo(x);
	return [y, z];

	function foo(x) {
		y++;
		z = x * y;
	}

}

bar(20, 5);
z; // 120

bar(25, 6);
z; // 175