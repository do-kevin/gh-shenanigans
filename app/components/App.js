var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Compare = require('./Compare');
var Results = require('./Results');

class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Nav />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/popular" component={Popular} />
						<Route exact path="/compare" component={Compare} />
						<Route path="/compare/results" component={Results} />
						<Route
							render={function() {
								return (<p style={{color: 'hsl(355, 70%, 46%)', textAlign: 'center', fontSize: '48px', fontWeight: 600}}>Not Found</p>);
							}}
						/>
					</Switch>
				</div>
			</Router>
		);
	}
}

module.exports = App;
