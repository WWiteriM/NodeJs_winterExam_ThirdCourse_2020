const http = require('http');
const fs = require('fs');

const file = fs.createWriteStream('./to/file.bmp');

let options = {
	host: 'localhost',
	path: '/from/pic.bmp',
	port: 3000,
	method: 'GET'
}

const req = http.request(options, (res) => {
	res.pipe(file);
})

req.on('error', (e) => {
	console.log('http.req: error', e.message)
})
req.end();