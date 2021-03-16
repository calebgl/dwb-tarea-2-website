import "./index.css";
import Array from "./data";

const RightSide = ({ value, size }) => {
	return (
		<div
			className="right-side p-md-4"
			style={size < 1023 ? { maxWidth: `${size * 0.85}px` } : null}
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
