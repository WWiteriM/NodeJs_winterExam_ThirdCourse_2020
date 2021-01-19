let http = require("http");
const query = require('querystring')

http.createServer((req, res) => {
	if (req.method == "POST") {
		res.statusCode = 200;
		let data = "";
		req.on("data", (chunk) => {
			data += chunk;
		});
		req.on("end", () => {
			console.log(query.parse(data));
			res.writeHead(200, { "Content-Type": "application/json" })
			res.end(data);
		});
	}
}).listen(3000);