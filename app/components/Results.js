const React = require('react');
const queryString = require('query-string');
const api = require('../utils/api');
const Link = require('react-router-dom').Link;
const PropTypes = require('prop-types');
const PersonPreview = require('./PersonPreview');

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

class Results extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    const {personOneName, personTwoName} = queryString.parse(this.props.location.search);
    api.compare([
      personOneName,
      personTwoName
    ]).then((results) => {
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
    });
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

module.exports = Results;