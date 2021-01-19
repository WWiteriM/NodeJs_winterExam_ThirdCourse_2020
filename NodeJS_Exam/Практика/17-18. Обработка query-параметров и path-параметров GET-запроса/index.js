let http = require('http');
let url = require('url');

let writeHTTPError = (code, message, res) => {
	res.statusCode = code;
	res.statusMessage = message;
	res.end(res.statusMessage);
}
let param1 = (req, res) =>{
	if (typeof url.parse(req.url, true).query.q != 'undefined') {
		let q = parseInt(url.parse(req.url, true).query.q);
		if (Number.isInteger(q)) {
			{console.log(`все работает, set =${q}`)}
		}
	}
}
let param2 = (req, res)=>{
	if (typeof url.parse(req.url, true).query.x !== undefined && typeof url.parse(req.url, true).query.y !== undefined) {
		let x = parseInt(url.parse(req.url, true).query.x);
		let y = parseInt(url.parse(req.url, true).query.y);
		if (Number.isInteger(x) && Number.isInteger(y)) {
			{
				console.log(`все работает, x = ${x}, y = ${y}`);

			}
		}
	}
}
let param3 = (req, res) =>{
	let x = parseInt(url.parse(req.url).pathname.split('/')[2]);
	let y = parseInt(url.parse(req.url).pathname.split('/')[3]);
	if (Number.isInteger(x) && Number.isInteger(y)) {
		{
			console.log(`все работает, x = ${x}, y = ${y}`);
		}
	}

}
let GET_handler = (req, res)=>{
	switch(url.parse(req.url, true).pathname){
		case '/query': param1(req, res); break;
		case '/query_2': param2(req, res); break;
		//case '/path': param3(req, res); break;
	}
	if (url.parse(req.url).pathname.split('/')[1] === 'path'){
		param3(req,res);
	}
}
let http_handler = (req, res) => {
	switch(req.method){
		case 'GET': GET_handler(req,res); break;
		default: writeHTTPError(405, 'Error 405', res); break;
	}
}

const server = http.createServer()
	.listen(3000)
	.on('request', http_handler)
	.on('error', err => {console.log(err.message)});
console.log('Server is running');
