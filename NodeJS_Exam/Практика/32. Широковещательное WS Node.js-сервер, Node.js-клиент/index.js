const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 5000, host: 'localhost', path: '/broadcast' });

wss.on('connection', (ws) => {
	ws.on('message', data => {
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN)
				client.send('server: ' + data);
		})
	})
})