const resolver = {
	setFaculty: (args, context) => {
		return context.updateFaculty(args, context).then((res) => {
			return (res == null) ? context.insertFaculty(args, context) : res;
		});
	}
};
module.exports = resolver;
