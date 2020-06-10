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

async function displayCommits() {
	try {
		const user = await getUser(1);
		const repos = await getRepositories(user.gitHubUser);
		const commits = await getCommits(repos[0]);
		console.log(commits);
	} catch (err) {
		console.log(err);
	}
}

displayCommits();
