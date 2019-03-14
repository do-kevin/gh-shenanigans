var React = require('react');
var ReactDOM = require('react-dom');
require('../app/index.css');

class App extends React.Component {
  render() {
    return (
      <div>
        Why hello there.
      </div>
    );
  }
}

ReactDOM.render(
  <App/>, document.querySelector('#app')
);