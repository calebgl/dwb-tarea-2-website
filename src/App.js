import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Navbar from "./components/navbar";
import Main from "./components/main";
import { useState, useEffect } from "react";

function App() {
	const [size, setSize] = useState(window.innerWidth);

	const checkSize = () => {
		setSize(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", checkSize);
		return () => {
			window.removeEventListener("resize", checkSize);
		};
	});

	return (
		<div className="App">
			<header className="App-header">
				<Navbar size={size} />
			</header>
			<Main size={size} />
		</div>
	);
}

export default App;
