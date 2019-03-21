import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PersonPreview from './PersonPreview';

class PersonInput extends Component {

	static propTypes = {
		personId: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired
	}

	static defaultProps = {
		label: 'Username'
	}

	state = {
		username: ''
	};

	handleChange = (event) => {
		const value = event.target.value;

		this.setState(() => ({ username: value }));
	}

	handleSubmit = (event) => {
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

class Compare extends Component {

	state = {
		personOneName: '',
		personTwoName: '',
		personOneImage: null,
		personTwoImage: null
	};

	handleSubmit = (personId, username) => {
		this.setState(() => ({
			[personId + 'Name']: username,
			[personId + 'Image']: `https://github.com/${username}.png?size=200`
		}))
	}

	handleReset = (personId) => {
		this.setState(() => ({
			[personId + 'Name']: '',
			[personId + 'Image']: null
		}));
	}

	render() {
		const { personOneName, personTwoName, personOneImage, personTwoImage } = this.state;

		const { match } = this.props;

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

export default Compare;
