// @flow
import * as React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from './Auth';
import Register from './Auth/Register';
import Dashboard from './Auth/Dashboard';

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

function PrivateRoute({ component: Component, isLogin, ...rest }) {
	console.log(isLogin);
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
const mapStateToProps = ({ AuthReducer }) => ({
	status: AuthReducer.status,
	message: AuthReducer.message,
	data: AuthReducer.data,
	isLoading: AuthReducer.isLoading
});

export default connect(mapStateToProps)(App);
