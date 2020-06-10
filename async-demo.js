console.log('Before');
getUser(1);
const user = getUser(1); // undefined
console.log('After');

// Callbacks, Promises and Async/Await to get result of async operations

function getUser(id) {
	setTimeout(() => {
		console.log('reading from db');
		return { id, gitHubUser: 'Subin' };
	}, 2000);
}
