var WebSocket = require('rpc-websockets').Client
let ws = new WebSocket('ws://localhost:3000')

ws.on('open', function () {
	ws.call('sum', [5, 3]).then(function (result) {
		console.log(result);
	})
	ws.subscribe('feedUpdated')

	ws.on('feedUpdated', function () {
		console.log('feedUpdated')
	})

	ws.login({ 'login': 'login', 'password': 'password' }).then((login) => {
		ws.call('account').then(function (result) {
			console.log(result)
		})
	}).catch(function (error) {
		console.log('auth failed')
	})
})
