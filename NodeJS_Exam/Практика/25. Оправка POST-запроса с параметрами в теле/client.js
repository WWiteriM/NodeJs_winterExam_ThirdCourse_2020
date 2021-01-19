const http = require('http')
const query = require('querystring')

const params = query.stringify({ x: 3, y: 4, s: 'xxx' })
console.log(params)
const options = {
	host: 'localhost',
	path: '/mypath',
	port: 3000,
	method: 'POST'
}
const req = http.request(options, (res) => {
	let data = ' ';

	res.on('data', (chunk) => {
		console.log('http.request: data: body =', data += chunk);
	});

	res.on('end', () => {
		console.log('http request: end: body =', data);
	})

})
req.on('error', (e) => {
	console.log('http.request: error', e.message);
})

req.write(params)

req.end();