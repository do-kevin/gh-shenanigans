import React, { Component } from 'react';
import queryString from 'query-string';
import { compare } from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PersonPreview from './PersonPreview';

function Profile ({info}) {
  return (
    <PersonPreview
      avatar={info.avatar_url} 
      username={info.login}>
      <ul className='profile-info'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a style={{color: 'hsl(210, 100%, 50%)'}}href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PersonPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function GHuser ({ score, profile }) {
  return (<div>
    <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
    <Profile info={profile}/>
  </div>);
}

GHuser.propTypes = {
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends Component {

  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }

  async componentDidMount() {
    const {personOneName, personTwoName} = queryString.parse(this.props.location.search);

    const results = await compare([
      personOneName,
      personTwoName
    ])

    if (results === null) {
      return this.setState(() => ({
          error: 'There was an error. Please check if both GitHub users exist',
          loading: false
      }));
    }

    this.setState(() => ({
        error: null,
        winner: results[0],
        loser: results[1],
        loading: false
    }));
  }

  render() {
    const { error, winner, loser, loading } = this.state;

    if (loading === true) {
      return (<div className="loader">Loading...</div>);
    }

    if (error) {
      return (<div>
        <p>{error}</p>
        <Link to='/compare'>Reset</Link>
      </div>);
    }

    return (
      <div className='row'>
        <GHuser
          score={winner.score}
          profile={winner.profile}
        />
        <GHuser
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    );
  }
}

export default Results;