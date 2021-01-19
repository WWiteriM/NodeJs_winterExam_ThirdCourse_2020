const http = require('http');
const fs = require('fs');


let isStatic = (ext,fn) => {
	let regex = new RegExp(`^\/.+\.` + ext + `$`);
	return regex.test(fn);
}
let pathStatic = (fn) => {return './files' + fn};
let pipeFile = (req,res,headers) => {
	res.writeHead(200, headers);
	fs.createReadStream(pathStatic(req.url)).pipe(res);
	console.log('Read stream was created');
}
let sendFile = (req,res,headers) => {
	fs.access(pathStatic(req.url), fs.constants.R_OK, err => {
		if (err) writeHTTPError(404,'Resource not found',res);
		else pipeFile(req,res,headers);
	})
}
let writeHTTPError = (code, message, res) => {
	res.statusCode = code;
	res.statusMessage = message;
	res.end(res.statusMessage);
}

let http_handler = (req,res) => {
	if (req.method === 'GET'){
		if (isStatic('html',req.url)) sendFile(req,res, {'Content-Type': 'text/html; charset=utf-8'});
		else if (isStatic('css',req.url)) sendFile(req,res, {'Content-Type': 'text/css; charset=utf-8'});
		else if (isStatic('js',req.url)) sendFile(req,res, {'Content-Type': 'text/javascript; charset=utf-8'});
		else if (isStatic('png',req.url)) sendFile(req,res, {'Content-Type': 'image/png; charset=utf-8'});
		else if (isStatic('docx',req.url)) sendFile(req,res, {'Content-Type': 'application/msword; charset=utf-8'});
		else if (isStatic('json',req.url)) sendFile(req,res, {'Content-Type': 'application/json; charset=utf-8'});
		else writeHTTPError(404,'The request could not be processed by the server',res);
	} else writeHTTPError(405, 'Error 405', res);
}

const server = http.createServer()
	.listen(3000)
	.on('error', err => {console.log(err.message)})
	.on('request', http_handler);
console.log('Server is running');
