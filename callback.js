console.log('Before');
// getUser(1, user => {
// 	console.log('User ', user);
// 	getRepositories(user.gitHubUser, repos => {
// 		console.log(repos);
// 		getCommits(repos[1], commits => {
// 			// Callback HELL or christmas tree problem.
// 			console.log(commits);
// 		});
// 	});
// });

getUser(1, getRepositories);
console.log('After');

function getRepositories(user) {
	console.log('User ', user);
	getRepositoriesCallback(user.gitHubUser, getCommits);
}
function getCommits(repos) {
	console.log(repos);
	getCommitsCallback(repos[1], displayCommits);
}
function displayCommits(commits) {
	console.log(commits);
}
// Callbacks, Promises and Async/Await to get result of async operations

function getUser(id, callback) {
	setTimeout(() => {
		console.log('reading from db');
		callback({ id, gitHubUser: 'Subin' });
	}, 2000);
}

function getRepositoriesCallback(username, callback) {
	setTimeout(() => {
		console.log('got repos for ' + username);
		callback(['repo1', 'repo2', 'repo3']);
	}, 1000);
}

function getCommitsCallback(repo, callback) {
	setTimeout(() => {
		console.log('got commits for ' + repo);
		callback(['commit 1', 'commit 2']);
	}, 1000);
}
