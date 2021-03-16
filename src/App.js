import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Navbar from "./components/navbar";
import Main from "./components/main";
import { useState, useEffect } from "react";

function App() {
	const [value, setValue] = useState(0);
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
				<Navbar size={size} value={value} setValue={setValue} />
			</header>
			<Main size={size} value={value} setValue={setValue} />
		</div>
	);
}

export default App;
