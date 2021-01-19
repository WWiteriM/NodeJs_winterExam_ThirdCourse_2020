const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
	if (request.url === '/index') {
		let html = fs.readFileSync('./index.html');
		response.end(html);
	}
	if (request.url === '/xmlhttp') {
		let xmlhttprequest = fs.readFileSync('./xmlhttprequest.html');
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(xmlhttprequest);
	}
	if (request.url === '/fetch') {
		let fetch = fs.readFileSync('./fetch.html');
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(fetch);
	}
	if (request.url === '/jquery') {
		let jQuery = fs.readFileSync('./jQuery.html');
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(jQuery);
	} else {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end('Good job!');
	}
}).listen(3000);
console.log('Слушаю');

