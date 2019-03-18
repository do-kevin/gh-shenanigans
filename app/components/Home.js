var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <h1>GitHub Compare</h1>

        <Link className='button' to='/compare'>
          Compare
        </Link>
      </div>
    );
  }
}

module.exports = Home;