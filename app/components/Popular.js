var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage(props) {
  console.log(props);
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

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			languageSelected: 'All'
		};

		this.updateLanguage = this.updateLanguage.bind(this);
	}

	updateLanguage(lang) {
		this.setState(function() {
			return {
				languageSelected: lang
			};
		});
	}

	render() {
		return (
			<div>
				<SelectLanguage languageSelected={this.state.languageSelected} onSelect={this.updateLanguage} />
			</div>
		);
	}
}

module.exports = Popular;
