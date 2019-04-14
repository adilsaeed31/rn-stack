// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
// Connect redux with component
import { connect } from 'react-redux';
// actions
import { authSuccess, authFailure, authLoading } from './Actions';

// antd components
import { Layout, Row, Col, Form, Icon, Input, Button, Checkbox, Typography, notification } from 'antd';
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

// Props types
type Props = {
	form: Func,
	dispatch: Func,
	isLoading: boolean
};
// State Types
type State = {};

class Register extends React.PureComponent<Props, State> {
	handleSubmit = (e) => {
		e.preventDefault();

		this.props.dispatch(authLoading({ isLoading: true }));

		this.props.form.validateFields((err, values) => {
			if (!err) {
				fetch(`http://localhost:8000/auth/signup`, {
					method: 'POST',
					body: JSON.stringify(values),
					headers: {
						'Content-Type': 'application/json'
					}
				})
					.then((response) => response.json())
					.then((res) => {
						this.props.dispatch(authSuccess(res));
						if (res.status === 200) {
							notification.success({
								message: 'Success',
								description: res.message
							});
						} else {
							notification.error({
								message: 'Error',
								description: res.message
							});
						}
					});
			} else {
				this.props.dispatch(authFailure({ status: 422, message: 'Unprocessable Entity' }));
				notification.error({
					message: 'Error',
					description: 'Something happened wrong'
				});
			}
		});
	};

	render() {
		const { isLoading, form: { getFieldDecorator } } = this.props;

		return (
			<Layout>
				<Header>
					<Row type="flex" justify="start" align="middle" className="has-margin-1">
						<Col span={12}>
							<Link to="/">
								<Title level={2} className="logo">
									#OrderTogether
								</Title>
							</Link>
						</Col>
					</Row>
				</Header>
				<Content>
					<Row type="flex" justify="center" align="middle">
						<Col span={12}>
							<Form onSubmit={this.handleSubmit} className="login-form">
								<Form.Item>
									{getFieldDecorator('email', {
										rules: [ { required: true, message: 'Please input your email!' } ]
									})(
										<Input
											prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
											placeholder="email"
										/>
									)}
								</Form.Item>
								<Form.Item>
									{getFieldDecorator('password', {
										rules: [ { required: true, message: 'Please input your Password!' } ]
									})(
										<Input
											prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
											type="password"
											placeholder="Password"
										/>
									)}
								</Form.Item>
								<Form.Item>
									{getFieldDecorator('remember', {
										valuePropName: 'checked',
										initialValue: true
									})(<Checkbox>Remember me</Checkbox>)}
									<a className="login-form-forgot" href="/auth/forgotpassword">
										Forgot password
									</a>
									<Button
										disabled={isLoading}
										type="primary"
										htmlType="submit"
										className="login-form-button"
									>
										{!isLoading ? 'Log in' : 'Authenticating ...'}
									</Button>
									Or <Link to="/register">Register</Link>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Content>
				<Footer>#OrderTogether &copy; 2019</Footer>
			</Layout>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	dispatch
});

const mapStateToProps = ({ AuthReducer }) => ({
	status: AuthReducer.status,
	message: AuthReducer.message,
	data: AuthReducer.data,
	isLoading: AuthReducer.isLoading
});
const WrappedAuthRegisterForm = Form.create({ name: 'auth_login' })(Register);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedAuthRegisterForm);
