import "./index.css";
import data from "./data";

const LeftSide = ({ value, setValue, size }) => {
	return size > 1023 ? (
		<div className="left-side p-md-4">
			<div className="list-group" id="list">
				{data.map((accordion) => {
					return (
						<List
							key={accordion.id}
							{...accordion}
							value={value}
							setValue={setValue}
						/>
					);
				})}
			</div>
		</div>
	) : (
		<></>
	);
};

const List = ({ id, title, value, setValue }) => {
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
