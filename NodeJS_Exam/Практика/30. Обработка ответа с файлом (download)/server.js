const http = require('http');
const fs = require('fs');
http.createServer(function (request, response) {
	fs.access(__dirname + request.url, fs.constants.R_OK, (err) => {
		if (err) {
			response.statusCode = 200;
			console.log(err)
			response.end('Error');
		}
		else {
			fs.createReadStream(__dirname + request.url).pipe(response);
		}
	})
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');