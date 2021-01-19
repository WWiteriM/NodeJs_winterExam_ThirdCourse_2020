const WebSocket = require('ws');


const ws = new WebSocket.Server({ port: 5000, host: 'localhost', path: '/ws' });
ws.on('connection', (wss) => {
	let k = 0;
	wss.on('message', message => {
		console.log(`Received message => client: ${message}`);
	})
	setInterval(() => { wss.send(JSON.stringify({ msg: ++k })) }, 3000);
})