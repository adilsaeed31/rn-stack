import React from 'react';
import { Layout, Menu, Icon, Table, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

export default class Dashboard extends React.Component {
	state = {
		users: []
	};
	componentDidMount() {
		fetch(`http://localhost:8000/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((res) => this.setState({ users: res.data }));
	}
	render() {
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				render: (text) => <a href="javascript:;">{text}</a>
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email'
			},
			{
				title: 'Created At',
				dataIndex: 'createdAt',
				key: 'createdAt'
			},

			{
				title: 'Action',
				key: 'action',
				render: (text, record) => (
					<React.Fragment>
						<Button type="primary">Invite {record.name}</Button>
						<Divider type="vertical" />
						<Button type="danger">Delete</Button>
					</React.Fragment>
				)
			}
		];

		const data = [
			{
				key: '1',
				name: 'John Brown',
				age: 32,
				address: 'New York No. 1 Lake Park',
				tags: [ 'nice', 'developer' ]
			},
			{
				key: '2',
				name: 'Jim Green',
				age: 42,
				address: 'London No. 1 Lake Park',
				tags: [ 'loser' ]
			},
			{
				key: '3',
				name: 'Joe Black',
				age: 32,
				address: 'Sidney No. 1 Lake Park',
				tags: [ 'cool', 'teacher' ]
			}
		];
		return (
			<Layout>
				<Sider
					breakpoint="lg"
					collapsedWidth="0"
					onBreakpoint={(broken) => {
						console.log(broken);
					}}
					onCollapse={(collapsed, type) => {
						console.log(collapsed, type);
					}}
				>
					<div className="logo" />
					<Menu theme="dark" mode="inline" defaultSelectedKeys={[ '1' ]}>
						<Menu.Item key="1">
							<Icon type="user" />
							<span className="nav-text">Users</span>
						</Menu.Item>

						<Menu.Item key="2">
							<Icon type="user" />
							<span className="nav-text">
								<Link to="/">Logout</Link>
							</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }} />
					<Content style={{ margin: '24px 16px 0' }}>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							<Table rowKey="id" columns={columns} dataSource={this.state.users} />
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>#OrderTogether ©2019</Footer>
				</Layout>
			</Layout>
		);
	}
}
