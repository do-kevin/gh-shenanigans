var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');

function GHuser (props) {
  return (<div>
    <h1 className='header'>
      {props.label}
    </h1>
    <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
  </div>);
}

GHuser.propTypes = {
  label: PropTypes.string.isRequired,
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
          label={'Winner'}/>
        <GHuser
          score={loser.score}
          profile={loser.profile}
          label={'Loser'}/>
      </div>
    );
  }
}

module.exports = Results;