import "tailwindcss/tailwind.css";
import GlobalState from "../state/GlobalState";
import "../styles/font.css";

function MyApp({ Component, pageProps }) {
	return (
		<GlobalState>
			<Component {...pageProps} />
		</GlobalState>
	);
}

export default MyApp;
