// Promise has 3 states, Pending, Resolve/Fulfilled and Reject
const p = new Promise((resolve, reject) => {
	// Kick off some async work.
	setTimeout(() => {
		resolve(1);
		// reject(new Error('message'));
	}, 3000);
});

p.then(res => console.log(res)).catch(err => console.log(err.message));

function getUser(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('reading from db');
			resolve({ id, gitHubUser: 'Subin' });
		}, 2000);
	});
}

function getRepositories(username) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('got repos for ' + username);
			resolve(['repo1', 'repo2', 'repo3']);
		}, 1000);
	});
}

function getCommits(repo) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('got commits for ' + repo);
			resolve(['commit 1', 'commit 2']);
		}, 1000);
	});
}

getUser(1)
	.then(user => getRepositories(user.gitHubUser))
	.then(repos => getCommits(repos[1]))
	.then(commits => console.log(commits))
	.catch(err => console.log(err.message));

const p1 = Promise.resolve('Subin');
p1.then(res => console.log(res));

const p2 = Promise.reject(new Error('rejected...'));

p2.catch(err => console.log(err.message));

const p3 = new Promise(resolve => {
	setTimeout(() => {
		console.log('Async operation 1...');
		resolve(1);
	}, 2000);
});

const p4 = new Promise(resolve => {
	setTimeout(() => {
		console.log('Async operation 2...');
		resolve(2);
	}, 2000);
});

// If any promise rejects all the promises is like rejected.
Promise.all([p3, p4])
	.then(res => console.log(res))
	.catch(err => console.log(err));

Promise.race([p3, p4])
	.then(res => console.log(res))
	.catch(err => console.log(err));
