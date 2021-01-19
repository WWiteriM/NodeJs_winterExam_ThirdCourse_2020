let http = require('http');
let fs = require('fs');
var multiparty = require('multiparty');
var util = require('util');

let handler = (req, res) => {
	if (req.method === 'GET') {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.end(fs.readFileSync('./index.html'));
	}
	else if (req.method == 'POST') {
		console.log('here');
		let result = '';
		let form = new multiparty.Form({ uploadDir: './upload' })
		// form.on('field', (name, value) => {
		// 	console.log('----field---');
		// 	console.log(name, value);
		// 	result += `<br>----${name} = ${value}`;
		// });
		form.on('file', (name, file) => {
			console.log('----file---');
			console.log(name, file);
			result += `<br>----${name} = ${file.originalFilename}: ${file.path}`;
		});
		form.on('error', () => {
			console.log('----err---');
			res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
			res.end('error');
		});
		form.on('close', () => {
			console.log('----close---');
			res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
			res.end(result);
		});
		form.parse(req);
	}
}

http.createServer().listen(3000)
	.on('error', (e) => { console.log('error: ', e.code) })
	.on('request', handler);
