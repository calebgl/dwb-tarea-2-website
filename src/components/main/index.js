import "./index.css";
import "highlight.js/styles/atom-one-dark.css";
import LeftSide from "./left-side";
import RightSide from "./right-side";
import { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import csharp from "highlight.js/lib/languages/csharp";

hljs.registerLanguage("csharp", csharp);

const Main = ({ size, value, setValue }) => {
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
				<RightSide value={value} size={size} />
			</div>
		</div>
	);
};

export default Main;
