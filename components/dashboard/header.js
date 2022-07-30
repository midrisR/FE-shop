import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';
const { Header } = Layout;

export default function Navbar({ collapsed, setCollapsed }) {
	return (
		<Header
			className="site-layout-background"
			style={{
				padding: 0,
			}}>
			{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
				className: 'trigger',
				onClick: () => setCollapsed(!collapsed),
			})}
		</Header>
	);
}
