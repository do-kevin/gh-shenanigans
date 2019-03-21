async function getProfile(username) {
	const profile = await fetch(`https://api.github.com/users/${username}`);
	
	return profile.json();
}

async function getRepos (username) {
	const response = await fetch(`https://api.github.com/users/${username}/repos?&per_page=100`);

	return response.json();
}

function getStarCount (repos) {
	return repos.reduce((count, {stargazers_count}) => count + stargazers_count, 0);
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

	const response = await fetch(encodedURI)
	.catch(handleError);;

	const repos = await response.json();

	return repos.items;
}
