const resolver = {
	getFaculties: (args, context) => {
		console.log()
		return (args.FACULTY) ? context.getFaculty(args, context) : context.getFaculties(args, context);
	}
};
module.exports = resolver;
