const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

http.createServer((req, res) => {
	if (req.method == 'GET') {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.end(fs.readFileSync('./index.html'));
	}
	else {
		res.statusCode = 405;
		res.end();
	}
}).listen(3000);

let k = 0;
const wsserver = new WebSocket.Server({ port: 4000, host: 'localhost', path: '/ws' });
wsserver.on('connection', (wss) => {
	wss.on('message', message => {
		console.log(`Received message => ${message}`);
	})
	setInterval(() => { wss.send(`server: ${++k}`) }, 5000);
})
wsserver.on('error', (e) => { console.log('ws server error', e) });
console.log(`ws server: host:${wsserver.options.host}, port:${wsserver.options.port}, path:${wsserver.options.path}`);