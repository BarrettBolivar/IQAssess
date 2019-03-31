// In a node environment fetch requires a special module.
const fetcher = require("node-fetch");
/* Designed to show testing from outside file, testing with typescript and utilizing Mocha. 
If multiple classes or functions then it would be more ideal to have an index file import all files and
then module.export from there. */
async function APICall(environment: string, queryMethod: string) {
	// default environment should always be development
	const url = environment === 'prod' ? 'production-environment' : 'https://imagequix-qa-interview.herokuapp.com';
	let builturl = url;
	builturl += queryMethod;
	const res = await fetcher(builturl);
	return res.json();
};
module.exports = APICall;