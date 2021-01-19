const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000/broadcast');

let parm = process.argv[2]

let prfx = !parm ? 'A' : parm

ws.on('open', () => {
	setInterval(() => {
		ws.send('client: ' + prfx);
	}, 1000);
	ws.on('message', message => {
		console.log(`Recevied message => ${message}`)
	})
	setTimeout(() => {
		ws.close()
	}, 15000)
})