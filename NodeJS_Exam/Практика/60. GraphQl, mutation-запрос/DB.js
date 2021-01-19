const mssql = require('mssql/msnodesqlv8');
const config = require('./DBConfig');

function DB(cb) {
	this.insertFaculty = (args, context) => {
		return (new mssql.Request())
			.input('a', mssql.NVarChar, args.FACULTY)
			.input('b', mssql.NVarChar, args.FACULTY_NAME)
			.query('insert FACULTY(FACULTY, FACULTY_NAME) values (@a, @b)')
			.then((r) => { return args; });
	};
	this.updateFaculty = (args, context) => {
		return (new mssql.Request())
			.input('a', mssql.NVarChar, args.FACULTY)
			.input('b', mssql.NVarChar, args.FACULTY_NAME)
			.query('update FACULTY set FACULTY = @a, FACULTY_NAME = @b where FACULTY = @a')
			.then((r) => {
				return (r.rowsAffected[0] === 0) ? null : args;
			});
	};
	this.connect = mssql.connect(config, () => {
		console.log('Connected to DB');
	})
}

exports.DB = () => { return new DB(); };