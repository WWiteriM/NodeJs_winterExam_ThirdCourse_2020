var WebSocket = require('rpc-websockets').Client
let ws = new WebSocket('ws://localhost:3000')
ws.on('open', function () {
	ws.notify('notify1', { data: 'client' });
})