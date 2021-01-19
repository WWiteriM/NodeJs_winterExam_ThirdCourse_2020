let http = require('http');
let url = require('url');
let data = require('./eventEmitterModule');

let db = new data.DB();

db.on('GET', (req, res) => {
	console.log('DB GET');
	res.end(JSON.stringify(db.get()));
});
db.on('POST', (req, res) => {
	console.log('DB POST');
	req.on('data', data => {
		let result = JSON.parse(data);
		db.post(result);
		res.end(JSON.stringify(result));
	})
});

http.createServer((req, res) => {
	if (url.parse(req.url).pathname === '/') {
		db.emit(req.method, req, res)
		res.end();
	}
}).listen(3000)
console.log('start');
