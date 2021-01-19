setTimeout(() => {
	console.log('1');
}, 4000)
setImmediate(() => {
	console.log('2');
})
let interval = setInterval(() => {
	console.log('3');
},2000)
interval.unref();
process.nextTick(() => {
	console.log('4');
}, 0);
