import React, { useState } from 'react';
import { Layout } from 'antd';
import SideBar from './sidebar';
import Navbar from './header';
import Main from './main';
export default function LayoutDashboard({ children }) {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<SideBar collapsed={collapsed} />
			<Layout className="site-layout">
				<Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
				<Main>{children}</Main>
			</Layout>
		</Layout>
	);
}
