// A();

function C() {
	console.log("C");
	d();
}

function E() {
	console.log("E");
	f();
	// var f = F;
}

(function A() {
	console.log("A");
	B();
})();

// var C;

function G() {
	console.log("G");

	var H = function() {
		console.log("H");
		I();
	};
	H();
}

// var D = d;

function d() {
	console.log("D");
	E();
}

function I() {
	console.log("I");
	J();
	// J();
}

function B() {
	console.log("B");
	C();
};

function f() {
	console.log("F");
	G();
};

	var rest = "KLMNOPQRSTUVWXYZ".split(""), obj = {};
	for (var i=0; i<rest.length; i++) {
		(function(i){
			// define the current function
			obj[rest[i]] = function() {
				console.log(rest[i]);
				if (i < (rest.length-1)) {
					// TODO: call the next function
					obj[rest[i + 1]]();
				}
			};
		})(i);
	}

function J() {
		console.log("J");
		obj.K();
};

// C = function() {
// 	console.log("C");
// 	D();
// };

