//let m1 = require('./mymodule')('hello');
let m1 = require('./mymodule');


//console.log('x: ' + x);
console.log('y: ' + global.y);
console.log('z: ' + process.z);
console.log('CACHE: ')
console.log(require.cache);

m1.print('hi')
console.log(m1.calcWithNumberOneAndTwo.add());
console.log(m1.calcWithNumberOneAndTwo.sub())
console.log(new m1.Calc(10, 5).sub());
