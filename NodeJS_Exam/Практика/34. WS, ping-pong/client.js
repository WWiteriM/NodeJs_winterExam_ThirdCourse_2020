const WebSocket = require('ws')

const ws = new WebSocket('ws://localhost:5000/server')

ws.on('open', () => {
	ws.ping('ping from client');
	ws.on('ping', (data) => {
		console.log(data.toString('utf-8'))
		ws.pong('pong from client');
	})
	ws.on('pong', (data) => {
		console.log(data.toString('utf-8'))
	})
})