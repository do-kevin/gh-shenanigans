import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

function SelectLanguage({languageSelected, onSelect}) {
	const languages = [ 'All', 'JavaScript', 'Ruby', 'Java', 'Python', 'C++', 'C#' ];

	return (
		<ul className="languages">
			{languages.map((lang) => (
					<li
						style={
							lang === languageSelected ? (
								{
									borderBottom: '3px solid hsl(24, 100%, 50%)',
									color: 'hsl(0, 0%, 100%)'
								}
							) : null
						}
						onClick={() => onSelect(lang)}
						key={lang}
					>
						{lang}
					</li>
			))}
		</ul>
	);
}

SelectLanguage.propTypes = {
	languageSelected: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

function RepoGrid({ repos }) {
	return (
		<ul className="popular-list">
			{repos.map(({name, owner, html_url, stargazers_count}, index) => (
					<li className="popular-item" key={name}>
						<div className="popular-rank">#{index + 1}</div>
						<ul className="space-list-items">
							<li>
								<img
									src={owner.avatar_url}
									alt={`Avatar for ${owner.login}`}
									className="avatar"
								/>
							</li>
							<li>
								<a className="repo-name" href={html_url}>
									{name}
								</a>
							</li>
							<li>@{owner.login}</li>
							<li>
								<svg className="octicon-star" viewBox="0 0 14 16" version="1.1" width="14" height="16">
									<path
										fillRule="evenodd"
										d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
									/>
								</svg>{' '}
								{stargazers_count}
							</li>
						</ul>
					</li>
			))}
		</ul>
	);
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
};

class Popular extends Component {

	state = {
		languageSelected: 'All',
		repos: null
	};

	componentDidMount() {
		this.updateLanguage(this.state.languageSelected);
	}

	updateLanguage = async (lang) => {
		this.setState(() => ({
				languageSelected: lang,
				repos: null
		}));

		const repos = await fetchPopularRepos(lang);
		this.setState(() => ({ repos }));
	}

	render() {

		const {languageSelected, repos} = this.state;

		return (
			<div>
				<SelectLanguage languageSelected={languageSelected} onSelect={this.updateLanguage} />
				{!repos ? <div className="loader">Loading...</div> : <RepoGrid repos={repos} />}
			</div>
		);
	}
}

export default Popular;
