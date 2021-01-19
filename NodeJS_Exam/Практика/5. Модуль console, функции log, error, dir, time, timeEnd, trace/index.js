const greeting = require('./greeting')

global.name = 'Arsenii'

global.console.log(date)
console.log(greeting.getMessage())

process.on('exit', function (code) {

	// Following code will never execute.
	setTimeout(function () {
		console.log("This will not run");
	}, 0);

	console.log('exit');
});

// Printing to console
process.stdout.write("Hello World!" + "\n");

// Reading passed parameter
process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});

// Getting executable path
console.log(process.execPath);

// Platform Information 
console.log(process.platform);
const code = 5;
console.error('error #%d', code);

console.time('100-elements');
for (var i = 0; i > 100; i++) {

}
console.timeEnd('100-elements');
console.trace('Show me');

let obj = {
	a: 1,
	b: 2
}
console.dir(obj);
