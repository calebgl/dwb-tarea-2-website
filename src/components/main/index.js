import "./index.css";
import "highlight.js/styles/atom-one-dark.css";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Main = () => {
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
