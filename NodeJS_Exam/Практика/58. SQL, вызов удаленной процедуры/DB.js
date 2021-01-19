const sql = require('mssql')
var config = {
	user: '',
	password: '',
	server: 'localhost',
	database: '',
};

class DataBase {
	constructor() {
		this.connectionPool = new sql.ConnectionPool(config).connect().then(pool => {
			console.log('Connected to MSSQL')
			return pool
		}).catch(err => console.log('Connection Failed: ', err));
	}

	countFaculty(faculty) {
		return this.connectionPool.then(pool => {
			return pool.request()
				.input('FACULTY', sql.NVarChar(40), faculty)
				.output('count', sql.Int)
				.execute('COUNT_FACULTY')
		});
	}
}

let db = new DataBase();
db.countFaculty('ХТиТ').then((res) => {
	console.log('Output Param')
	console.log(res)
	console.log(res.output.count)
})