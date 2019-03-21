import React, { Component } from 'react';
import Popular from './Popular';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Compare from './Compare';
import Results from './Results';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Nav />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/popular" component={Popular} />
						<Route exact path="/compare" component={Compare} />
						<Route path="/compare/results" component={Results} />
						<Route
							render={() => (
								<p
									style={{
										color: 'hsl(355, 70%, 46%)',
										textAlign: 'center',
										fontSize: '48px',
										fontWeight: 600
									}}
								>
									Not Found
								</p>
							)}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
