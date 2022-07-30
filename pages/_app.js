import '../styles/globals.css';
import 'antd/dist/antd.css';
import { GlobalProvider } from '../context/GlobalState';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);
	return <GlobalProvider>{getLayout(<Component {...pageProps} />)}</GlobalProvider>;
}

export default MyApp;
