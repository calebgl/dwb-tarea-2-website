import "./index.css";
import data from "./data";
import { useResponsive } from "../../../ResponsiveProvider";
import { useGlobalContext } from "../../../AppProvider";

const LeftSide = () => {
	const size = useResponsive();

	return size >= 1024 ? (
		<div className="left-side p-md-4">
			<div className="list-group" id="list">
				{data.map((accordion) => {
					return <List key={accordion.id} {...accordion} />;
				})}
			</div>
		</div>
	) : (
		<></>
	);
};

const List = ({ id, title }) => {
	const { value, setValue } = useGlobalContext();
	return (
		<a
			className={`list-group-item list-group-item-action`}
			href={`#list-item-${id}`}
			onClick={() => setValue(id - 1)}
			style={{
				color: `${
					id - 1 === value ? "var(--clr-primary-5)" : "rgb(0,0,0)"
				}`,
			}}
		>
			{title}
		</a>
	);
};

export default LeftSide;
