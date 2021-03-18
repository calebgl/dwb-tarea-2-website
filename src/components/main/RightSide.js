import "./index.css";
import { useEffect } from "react";
import { Array } from "./data";
import { useResponsive } from "../../ResponsiveProvider";
import { useGlobalContext } from "../../AppProvider";
import hljs from "highlight.js/lib/core";
import csharp from "highlight.js/lib/languages/csharp";

hljs.registerLanguage("csharp", csharp);

const RightSide = () => {
	const size = useResponsive();
	const { value } = useGlobalContext();

	useEffect(() => {
		const code = document.querySelectorAll("pre code");
		code.forEach((code) => {
			hljs.highlightBlock(code);
		});
	}, [value]);

	return (
		<div
			className="right-side p-md-4"
			style={size <= 1023 ? { maxWidth: `${size * 0.85}px` } : null}
		>
			<div
				className="scroll"
				data-bs-spy="scroll"
				data-bs-target="#list"
				data-bs-offset="0"
				tab-index="0"
				children={Array[value]}
			/>
		</div>
	);
};

export default RightSide;
