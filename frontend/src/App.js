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
				<Route path="/register" component={Register} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
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
					<Component {...props} />
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

function Dashboard() {
	return <div>Dashboard</div>;
}
export default App;
