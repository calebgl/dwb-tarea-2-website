import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Navbar from "./components/navbar";
import Main from "./components/main";
import ResponsiveProvider from "./ResponsiveProvider";
import AppProvider from "./AppProvider";

function App() {
	return (
		<AppProvider>
			<ResponsiveProvider>
				<div className="App">
					<header className="App-header">
						<Navbar />
					</header>
					<Main />
				</div>
			</ResponsiveProvider>
		</AppProvider>
	);
}

export default App;
