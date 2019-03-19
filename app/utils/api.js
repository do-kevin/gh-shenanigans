var axios = require('axios');
require('dotenv').config();

function getProfile(username) {
	return axios.get('https://api.github.com/users/' + username).then(function (user) {
		console.log('---Step 2---')
		console.log(user.data);
		return user.data;
	});
}

function getRepos (username) {
	return axios.get('http://api.github.com/users/' + username + '/repos?' + '&per_page=100');
}

function getStarCount (repos) {
	console.log('---Step 3---');
	// console.log(repos.data);
	return repos.data.reduce(function (count, repo) {
		console.log('Count: ', count);
		console.log(repo);
		console.log('Step 4: ', count + repo.stargazers_count)
		return count + repo.stargazers_count;
	}, 0);
}

function calculateScore (profile, repos) {
	var followers = profile.followers;
	var totalStars = getStarCount(repos);

	return (followers * 3) + totalStars;
}

function handleError (error) {
	console.warn(error);
	return null;
}

function getUserData (person) {
	console.log('--Step 1---');
	console.log(person);
	return axios.all([
		getProfile(person),
		getRepos(person)
	]).then(function(data) {
		console.log('---Step 5---');
		var profile = data[0];
		console.log(profile);
		var repos = data[1];
		console.log(repos);
		return {
			profile: profile,
			score: calculateScore(profile, repos)
		}
	});
}

function sortPeople (people) {
	return people.sort(function(a, b) {
		return b.score - a.score
	});
}

module.exports = {
	compare: function(people) {
		return axios.all(people.map(getUserData))
			.then(sortPeople)
			.catch(handleError);
	},
	fetchPopularRepos: function(language) {
		var encodedURI = window.encodeURI(
			'http://api.github.com/search/repositories?q=stars:>1+language:' +
				language +
				'&sort=stars&order=desc&type=Repositories'
		);

		return axios.get(encodedURI).then(function(response) {
      return response.data.items;
    });
	}
};