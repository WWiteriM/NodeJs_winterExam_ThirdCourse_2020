const http = require('http');
const parseString = require('xml2js').parseString;
const xmlbuilder = require('xmlbuilder')

let xmldoc = xmlbuilder.create('students').att('faculty', 'ИТ').att('spec', 'ИСиТ');
xmldoc.ele('student').att('id', '1').att('name', 'pet9')
	.up().ele('student').att('id', '2').att('name', 'vas9').txt('Прошел в itechart')
	.up().ele('student').att('id', '3').att('name', 'san9')

const options = {
	host: 'localhost',
	path: '/mypath',
	port: 3000,
	method: 'POST',
	headers: {
		"Content-Type": "text/xml", "accept": "text/xml"
	}
}

const req = http.request(options, (res) => {
	let data = '';
	res.on('data', (chunk) => {
		data += chunk;
	})
	res.on('end', () => {
		console.log(data);
		parseString(data, (err, str) => {
			if (err)
				console.log('xml parse error');
			else {
				console.log('str: ', str);
				console.log('str.result: ', str.result);
			}
		})
	})
})
req.write(xmldoc.toString({ pretty: true }))
req.end();