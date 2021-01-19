let util = require('util');
let ee = require('events');

let db_data = [
	{ id: 1, name: 'Иванов И.И', bday: '2001-01-01' },
	{ id: 2, name: 'Петров П.П', bday: '2001-01-02' },
	{ id: 3, name: 'Сидоров С.С', bday: '2001-01-03' }
]

function DB() {
	this.get = () => db_data;
	this.post = (r) => db_data.push(r);
}

util.inherits(DB, ee.EventEmitter);

exports.DB = DB;