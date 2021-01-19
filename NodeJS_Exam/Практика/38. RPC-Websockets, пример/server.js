const WebSocketServer = require('rpc-websockets').Server

const server = new WebSocketServer({
	port: 3000,
	host: 'localhost'
})

server.setAuth((l) => l.login === 'login' && l.password === 'password')

server.register('sum', function (params) {
	return params[0] + params[1]
})

server.register('account', () => {
	return 'account'
}).protected()

server.event('feedUpdated')

console.log(server.eventList())

setInterval(() => server.emit('feedUpdated'), 3000);