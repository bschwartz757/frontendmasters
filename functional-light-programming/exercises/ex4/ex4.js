'use strict';
// 1. Write two functions, each which return a different number value when called.
function foo() {
    return 21;
}

function bar() {
    return 15;
}

/* 2. Write an `add(..)` function that takes two numbers and adds them and 
returns the result. Call `add(..)` with the results of your two functions from 
(1) and print the result to the console.
*/
function add(num1, num2) {
    return num1 + num2;
}

var x = foo();
var y = bar();
console.log(add(x, y));

/*3. Write an `add2(..)` that takes two functions instead of two numbers, and it
calls those two functions and then sends those values to `add(..)`, just like
you did in (2) above.*/
function add2(fn1, fn2) {
    return add(fn1(), fn2())
}

/* 4. Replace your two functions from (1) with a single function that takes a
value and returns a function back, where the returned function will return the
value when it's called.*/
function quux(v) {
    return function() {
        return v;
    }
}
console.log(add2(quux(21), quux(15)))

/* 5. Write an `addn(..)` that can take an array of 2 or more values, and
using only `add2(..)`, adds them together. Try it with a loop. Try it without
a loop (recursion). Try it with built-in array functional helpers (map/reduce).*/
function addn(...arr) {
    // loop
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum = add2(quux(arr[i]), quux(sum));
    }
    return sum;
}
addn(10, 42, 56, 73);

function addn2(...arr) {
    // recursion
    if (arr.length <= 2) {
        return add2(quux(arr[0]), quux(arr[1]));
    }
    return addn2([
            add2(quux(arr[0]), quux(arr[1]))
        ]
        .concat(arr.slice(2))
    );
}

addn2(10, 42, 56, 73);

function addn3(...arr) {
    // map/reduce
    return arr.slice(1)
        // map returns each item wrapped in a function
        .map(quux)
        // reduce takes the first item and accumulates against it. We 
        // start by wrapping the first item in a function, then pass 
        // each item in the orig. array to add2 (wrapped in functions)
        .reduce(function(prev, curr) {
            return function() {
                return add2(prev, curr);
            };
        }, quux(arr[0]))();
}

addn3(10, 42, 56, 73);

/* 6. Start with an array of odd and even numbers (with some duplicates), and
trim it down to only have unique values.*/

/* 7. Filter your array to only have even numbers in it.*/
function isEven(x) {
    return x % 2 === 0;
}

var arr = [10, 42, 56, 73, 15, 2, 98, 7]
    .filter(isEven)

/* 8. Map your values to functions, using (4), and pass the new list of
functions to the `addn(..)` from (5).*/
    // optionally, use map here rather than inside addn3()
    // .map(quux)

addn3(arr)