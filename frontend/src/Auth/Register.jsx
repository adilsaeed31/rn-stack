// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
// Connect redux with component
import { connect } from 'react-redux';
// actions
import { authSuccess, authFailure, authLoading } from './Actions';

// antd components
import { Form, Input, Tooltip, Icon, Checkbox, Button, Layout, Row, Col, Typography, notification } from 'antd';
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

// Props types
type Props = {
	form: Func,
	dispatch: Func,
	isLoading: boolean
};
// State Types
type State = {
	confirmDirty: boolean
};

class Register extends React.PureComponent<Props, State> {
	state = {
		confirmDirty: false
	};

	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Confirm password that you enter is inconsistent!');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields([ 'confirm' ], { force: true });
		}
		callback();
	};

	handleSubmit = (e) => {
		e.preventDefault();

		this.props.dispatch(authLoading({ isLoading: true }));

		this.props.form.validateFields((err, values) => {
			console.log(err, 'err');
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
								description: res.message + '. You can login now!',
								duration: 1
							});
							this.props.form.resetFields();
							this.props.history.push('/');
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

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		};

		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
			}
		};

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
							<Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
								<Form.Item
									label={
										<span>
											Full Name&nbsp;
											<Tooltip title="What do you want others to call you?">
												<Icon type="question-circle-o" />
											</Tooltip>
										</span>
									}
								>
									{getFieldDecorator('name', {
										rules: [
											{
												required: true,
												message: 'Please input your Full Name!',
												whitespace: true
											}
										]
									})(<Input />)}
								</Form.Item>

								<Form.Item label="E-mail">
									{getFieldDecorator('email', {
										rules: [
											{
												type: 'email',
												message: 'The input is not valid E-mail!'
											},
											{
												required: true,
												message: 'Please input your E-mail!'
											}
										]
									})(<Input />)}
								</Form.Item>
								<Form.Item label="Password">
									{getFieldDecorator('password', {
										rules: [
											{
												required: true,
												message: 'Please input your password!'
											},
											{
												validator: this.validateToNextPassword
											}
										]
									})(<Input type="password" />)}
								</Form.Item>
								<Form.Item label="Confirm Password">
									{getFieldDecorator('confirm', {
										rules: [
											{
												required: true,
												message: 'Please confirm your password!'
											},
											{
												validator: this.compareToFirstPassword
											}
										]
									})(<Input type="password" onBlur={this.handleConfirmBlur} />)}
								</Form.Item>

								<Form.Item {...tailFormItemLayout}>
									{getFieldDecorator('checked', {
										valuePropName: 'agreement',
										rules: [
											{
												required: true,
												message: 'Are you agree with our agreement?'
											}
										]
									})(
										<Checkbox>
											I have read the <Link to="/">agreement</Link>
										</Checkbox>
									)}
								</Form.Item>
								<Form.Item {...tailFormItemLayout}>
									<Button disabled={isLoading} type="primary" htmlType="submit">
										Register
									</Button>
									<Link to="/" style={{ float: 'right' }}>
										Back to Login
									</Link>
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
const WrappedAuthRegisterForm = Form.create({ name: 'auth_register' })(Register);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedAuthRegisterForm);
