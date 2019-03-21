const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;
const PersonPreview = require('./PersonPreview');

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
		const value = event.target.value;

		this.setState(() => ({ username: value }));
	}

	handleSubmit(event) {
		event.preventDefault();

		this.props.onSubmit(this.props.personId, this.state.username);
	}

	render() {

		const {username} = this.state;
		const {label} = this.props;

		return (
			<form className="column" onSubmit={this.handleSubmit} style={{ marginTop: '50px' }}>
				<label className="header" htmlFor="username">
					{label}
				</label>
				<input
					id="username"
					placeholder="github username"
					type="text"
					autoComplete="off"
					value={username}
					onChange={this.handleChange}
				/>
				<button className="button" type="submit" disabled={!username}>
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
		this.setState(() => ({
			[personId + 'Name']: username,
			[personId + 'Image']: `https://github.com/${username}.png?size=200`
		}))
	}

	handleReset(personId) {
		this.setState(() => ({
			[personId + 'Name']: '',
			[personId + 'Image']: null
		}));
	}

	render() {
		const {personOneName, personTwoName, personOneImage, personTwoImage} = this.state;

		const {match} = this.props;

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
							<button onClick={() => {this.handleReset('personOne')}} className="reset">
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
						<button onClick={() => {this.handleReset('personTwo')}} className="reset">
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
								pathname: `${match.url}/results`,
								search: `?personOneName=${personOneName}&personTwoName=${personTwoName}`
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
