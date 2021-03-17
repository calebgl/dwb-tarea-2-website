import "./index.css";
import "highlight.js/styles/atom-one-dark.css";
import LeftSide from "./left-side";
import RightSide from "./right-side";
import { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import csharp from "highlight.js/lib/languages/csharp";
import { useGlobalContext } from "../../AppProvider";

hljs.registerLanguage("csharp", csharp);

const Main = () => {
	const { value } = useGlobalContext();

	useEffect(() => {
		const code = document.querySelectorAll("pre code");
		code.forEach((code) => {
			hljs.highlightBlock(code);
		});
	}, [value]);

	return (
		<div className="container-xl">
			<div className="main">
				<LeftSide />
				<RightSide />
			</div>
		</div>
	);
};

export default Main;
