import LayoutDashboard from '../components/dashboard';
export default function Home({ articles }) {
	return <div></div>;
}

Home.getLayout = function getLayout(page) {
	return <LayoutDashboard>{page}</LayoutDashboard>;
};
