import axios from 'axios';

async function getProfile(username) {
	const profile = await axios.get(`https://api.github.com/users/${username}`);
	
	return profile.data;
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

async function getUserData (person) {
	const [ profile, repos ] = await Promise.all([
		getProfile(person),
		getRepos(person)
	]);
	
	return {
		profile,
		score: calculateScore(profile, repos)
	}
}

function sortPeople (people) {
	return people.sort((a, b) => b.score - a.score);
}

export async function compare (people) {
	const results = await Promise.all(people.map(getUserData))
		.catch(handleError);

	return results === null
		? results
		: sortPeople(results)
}

export async function fetchPopularRepos (language) {
	const encodedURI = window.encodeURI(
		`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
	);

	const repos = await axios.get(encodedURI)
	.catch(handleError);;

	return repos.data.items;
}

