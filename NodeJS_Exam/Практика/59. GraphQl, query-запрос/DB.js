const mssql = require('mssql/msnodesqlv8');
const config = require('./DBConfig');

function DB(cb) {
	this.getFaculties = (args, context) => {
		return (new mssql.Request())
			.query('select * from FACULTY')
			.then((r) => {
				console.log(r.recordset);
				return r.recordset
			});
	};

	this.getFaculty = (args, context) => {
		return (new mssql.Request())
			.input('faculty', mssql.NVarChar, args.FACULTY)
			.query('select top(1) * from FACULTY where FACULTY = @faculty')
			.then((r) => { return r.recordset; });
	};
	this.connect = mssql.connect(config, () => {
		console.log('Connected to DB');
	})
}

exports.DB = () => { return new DB(); };
