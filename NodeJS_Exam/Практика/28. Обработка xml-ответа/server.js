const http = require('http');
const parseString = require('xml2js').parseString;
http.createServer((request, response) => {
	let data = '';
	request.on('data', (chunk) => {
		data += chunk
	})
	request.on('end', () => {
		parseString(data, (err, str) => {
			if (err) {
				response.writeHead(400, { 'Content-Type': 'text/xml' });
				response.end(data);
				console.log('xml parse error');
			}
			else {
				console.log('str: ', str);
				console.log('str.result: ', str.result);
				response.writeHead(200, { 'Content-Type': 'text/xml' });
				response.end(data);
			}
		})
	})
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');