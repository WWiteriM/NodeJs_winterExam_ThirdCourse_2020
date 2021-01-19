const WebSocketServer = require('rpc-websockets').Server
const server = new WebSocketServer({
	port: 3000,
	host: 'localhost'
})
server.register('notify1', (obj) => {
	console.log(obj);
})