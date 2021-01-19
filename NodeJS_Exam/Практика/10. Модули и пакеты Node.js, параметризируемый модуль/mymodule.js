var x = 1;
global.y = 2;
process.z = 3;

function Calc(a, b) {
	this.a = a;
	this.b = b;
	this.add = () => this.a + this.b
	this.sub = () => this.a - this.b
}

let calcWithNumberOneAndTwo = new Calc(1, 2)


// параметры
// module.exports = function (message) {
// 	console.log(message);
// }

exports.calcWithNumberOneAndTwo = calcWithNumberOneAndTwo;
exports.Calc = Calc;
exports.print = function print(message) {
	console.log(message);
}
