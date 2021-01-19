let http = require('http');
let parseString = require('xml2js').parseString;
let xmlbuilder = require('xmlbuilder');

let handler = (req, res) => {
			let xml_req = '';
			req.on('data', (data) => {
				xml_req += data;
			});
			req.on('end', () => {
				let sum = 0;
				let concat_res = '';
				parseString(xml_req, (err, result) => {
					result.request.x.map((e,i) =>{
						sum += Number.parseInt(e.$.value);
					});
					result.request.m.map((e,i) =>{
						concat_res += e.$.value;
					});
				})
				const xml_doc = xmlbuilder.create('response').att('id','33').att('request', '28');
				xml_doc.ele('sum').att('element', 'x').att('result', sum.toString());
				xml_doc.ele('concat').att('element','m').att('result', concat_res);
				res.end(xml_doc.toString());
			})
}
http.createServer().listen(3000)
	.on('error', (e) => { console.log('error: ', e.code) })
	.on('request', handler);

// <request id="28">
// 	<x value="1"/>
// 	<x value="2"/>
// 	<m value="a"/>
// 	<m value="b"/>
// 	<m value="c"/>
// 	</request>
