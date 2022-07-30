import React from 'react';
import Link from 'next/link';
import { ShoppingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

export default function SideBar({ collapsed }) {
	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
				items={[
					{
						key: '1',
						icon: <ShoppingOutlined />,
						label: (
							<Link href="/admin/products">
								<a rel="noopener noreferrer">Products</a>
							</Link>
						),
					},
				]}
			/>
		</Sider>
	);
}
