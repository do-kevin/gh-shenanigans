var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PersonPreview = require('./PersonPreview');

class PersonInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		var value = event.target.value;

		this.setState(function() {
			return {
				username: value
			};
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.props.onSubmit(this.props.personId, this.state.username);
	}

	render() {
		return (
			<form className="column" onSubmit={this.handleSubmit} style={{ marginTop: '50px' }}>
				<label className="header" htmlFor="username">
					{this.props.label}
				</label>
				<input
					id="username"
					placeholder="github username"
					type="text"
					autoComplete="off"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<button className="button" type="submit" disabled={!this.state.username}>
					Submit
				</button>
			</form>
		);
	}
}

PersonInput.propTypes = {
	personId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
};

class Compare extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			personOneName: '',
			personTwoName: '',
			personOneImage: null,
			personTwoImage: null
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleSubmit(personId, username) {
		this.setState(function() {
			var newState = {};
			newState[personId + 'Name'] = username;
			newState[personId + 'Image'] = 'http://github.com/' + username + '.png?size=200';
			return newState;
		});
	}

	handleReset(personId) {
		this.setState(function() {
			var newState = {};
			newState[personId + 'Name'] = '';
			newState[personId + 'Image'] = null;
			return newState;
		});
	}

	render() {
		var personOneName = this.state.personOneName;
		var personTwoName = this.state.personTwoName;
		var personOneImage = this.state.personOneImage;
		var personTwoImage = this.state.personTwoImage;
		var match = this.props.match;

		return (
			<div>
				<div className="row">
					{!personOneName && (
						<PersonInput personId={'personOne'} label="Person One" onSubmit={this.handleSubmit} />
					)}

					{personOneImage !== null && (
						<PersonPreview
							avatar={personOneImage}
							username={personOneName}
						>
							<button onClick={this.handleReset.bind(null, 'personOne')} className="reset">
								Reset
							</button>
						</PersonPreview>
					)}

					{!personTwoName && (
						<PersonInput personId={'personTwo'} label="Person Two" onSubmit={this.handleSubmit} />
					)}

					{personTwoImage !== null && (
						<PersonPreview
						avatar={personTwoImage}
						username={personTwoName}
					>
						<button onClick={this.handleReset.bind(null, 'personTwo')} className="reset">
							Reset
						</button>
					</PersonPreview>
					)}
				</div>

				<div
					style={{
						margin: '50px auto',
						width: '167px',
						height: '29px'
					}}
				>
					{personOneImage &&
					personTwoImage && (
						<Link
							className="button"
							to={{
								pathname: match.url + '/results',
								search: '?personOneName=' + personOneName + '&personTwoName=' + personTwoName
							}}
						>
							{' '}
							Compare
						</Link>
					)}
				</div>
			</div>
		);
	}
}

module.exports = Compare;
