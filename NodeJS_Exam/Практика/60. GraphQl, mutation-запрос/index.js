const http = require('http');
const { graphql, buildSchema } = require('graphql');
const schema = buildSchema(require('fs').readFileSync('./schema.gql').toString());
const { DB } = require('./DB');
const resolver = require('./resolver');

const server = http.createServer();

const context = DB();

const handler = (request, response) => {
	if (request.method === 'POST') {
		let result = '';
		request.on('data', (data) => { result += data; });
		request.on('end', () => {
			let obj = JSON.parse(result);
			if (obj.query) {
				graphql(schema, obj.query, resolver, context, obj.variables ? obj.variables : {})
					.then((result) => {
						if (result.data) {
							response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
							response.end(JSON.stringify(result.data));
						}
						else {
							response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
							response.end(result.errors[0].message);
						}
					})
			}
		})
	}
};

server.listen(3000, () => {
	console.log('Server running at http://localhost:3000/')
})
	.on('error', (err) => { console.log('Error:', err.code); })
	.on('request', handler);