var axios = require('axios');
require('dotenv').config();

function getProfile(username) {
	return axios.get(`https://api.github.com/users/${username}`).then(({data}) => data);
}

function getRepos (username) {
	return axios.get(`https://api.github.com/users/${username}/repos?&per_page=100`);
}

function getStarCount (repos) {
	return repos.data.reduce((count, {stargazers_count}) => count + stargazers_count, 0);
}

function calculateScore ({followers}, repos) {
	return (followers * 3) + getStarCount(repos);
}

function handleError (error) {
	console.warn(error);
	return null;
}

function getUserData (person) {
	return Promise.all([
		getProfile(person),
		getRepos(person)
	]).then(([profile, repos]) => ({
			profile,
			score: calculateScore(profile, repos)
	}));
}

function sortPeople (people) {
	return people.sort((a, b) => b.score - a.score);
}

module.exports = {
	compare (people) {
		return Promise.all(people.map(getUserData))
			.then(sortPeople)
			.catch(handleError);
	},
	fetchPopularRepos (language) {
		const encodedURI = window.encodeURI(
			`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
		);
		return axios.get(encodedURI).then(({data}) => data.items);
	}
};