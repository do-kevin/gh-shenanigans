var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');

class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Nav />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/popular" component={Popular} />
						<Route exact path="/battle" component={Battle} />
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
