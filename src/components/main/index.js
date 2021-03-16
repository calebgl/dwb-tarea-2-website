import "./index.css";
import "highlight.js/styles/atom-one-dark.css";
import LeftSide from "./left-side";
import RightSide from "./right-side";
import { useState, useEffect } from "react";
import hljs from "highlight.js/lib/core";
import csharp from "highlight.js/lib/languages/csharp";

hljs.registerLanguage("csharp", csharp);

const Main = ({ size }) => {
	const [value, setValue] = useState(0);

	useEffect(() => {
		const code = document.querySelectorAll("pre code");
		code.forEach((code) => {
			hljs.highlightBlock(code);
		});
	}, [value]);

	return (
		<div className="container-xl">
			<div className="main">
				<LeftSide value={value} setValue={setValue} size={size} />
				<RightSide value={value} />
			</div>
		</div>
	);
};

export default Main;
