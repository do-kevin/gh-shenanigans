var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props) {
	var languages = [ 'All', 'JavaScript', 'Ruby', 'Java', 'Python' ];

	return (
		<ul className="languages">
			{languages.map(function(lang) {
				return (
					<li
						style={
							lang === props.languageSelected ? (
								{
									borderBottom: '3px solid hsl(24, 100%, 50%)',
									color: 'hsl(0, 0%, 100%)'
								}
							) : null
						}
						onClick={props.onSelect.bind(null, lang)}
						key={lang}
					>
						{lang}
					</li>
				);
			})}
		</ul>
	);
}

SelectLanguage.propTypes = {
	languageSelected: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

function RepoGrid(props) {
	return (
		<ul className="popular-list">
			{props.repos.map(function(repo, index) {
				return (
					<li className="popular-item" key={repo.name}>
						<div className="popular-rank">#{index + 1}</div>
						<ul className="space-list-items">
							<li>
								<img
									src={repo.owner.avatar_url}
									alt={'Avatar for ' + repo.owner.login}
									className="avatar"
								/>
							</li>
							<li>
								<a className="repo-name" href={repo.html_url}>
									{repo.name}
								</a>
							</li>
							<li>@{repo.owner.login}</li>
							<li>
								<svg className="octicon-star" viewBox="0 0 14 16" version="1.1" width="14" height="16">
									<path
										fillRule="evenodd"
										d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
									/>
								</svg>{' '}
								{repo.stargazers_count}
							</li>
						</ul>
					</li>
				);
			})}
		</ul>
	);
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
};

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			languageSelected: 'All',
			repos: null
		};

		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount() {
		this.updateLanguage(this.state.languageSelected);
	}

	updateLanguage(lang) {
		this.setState(function() {
			return {
				languageSelected: lang,
				repos: null
			};
		});

		api.fetchPopularRepos(this.state.languageSelected).then(
			function(repos) {
				this.setState(function() {
					return {
						repos: repos
					};
				});
			}.bind(this)
		);
	}

	render() {
		return (
			<div>
				<SelectLanguage languageSelected={this.state.languageSelected} onSelect={this.updateLanguage} />
				{!this.state.repos ? <div className="loader">Loading...</div> : <RepoGrid repos={this.state.repos} />}
			</div>
		);
	}
}

module.exports = Popular;
