// @flow
import * as React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Auth from './Auth';
import Register from './Auth/Register';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Route exact path="/" component={Auth} />
				<Route exact path="/register" component={Register} />
				<PrivateRoute path="/dashboard" component={<div>Dashboard</div>} />
			</Router>
		);
	}
}

function PrivateRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				true ? (
					<Component exact {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: props.location }
						}}
					/>
				)}
		/>
	);
}

export default App;
