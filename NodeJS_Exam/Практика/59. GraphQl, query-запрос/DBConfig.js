const config = {
	driver: 'msnodesqlv8',
	connectionString: 'Driver={SQL Server Native Client 11.0};' +
		'Server={localhost};' +
		'Database={BAA};' +
		'Trusted_Connection={yes};'
};

module.exports = config;
