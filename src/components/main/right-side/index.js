import "./index.css";
import Array from "./data";

const RightSide = ({ value }) => {
	return (
		<div className="right-side p-md-4">
			<div
				className="scroll"
				data-bs-spy="scroll"
				data-bs-target="#list"
				data-bs-offset="0"
				tab-index="0"
				children={Array[value]}
				style={{ overflowX: "auto" }}
			/>
		</div>
	);
};

export default RightSide;
