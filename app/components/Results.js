var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var PersonPreview = require('./PersonPreview');

function Profile (props) {

  var info = props.info;

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

function GHuser (props) {
  return (<div>
    <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
    <Profile info={props.profile}/>
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
    var people = queryString.parse(this.props.location.search);
    api.compare([
      people.personOneName,
      people.personTwoName
    ]).then(function(results) {
      if (results === null) {
        return this.setState(function () {
          return {
            error: 'There was an error. Please check if both GitHub users exist',
            loading: false
          }
        });
      }

      this.setState(function() {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      });
    }.bind(this));
  }

  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;

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