import { data } from "./data";
import { useResponsive } from "../../ResponsiveProvider";
import { useGlobalContext } from "../../AppProvider";
import { FiExternalLink } from "react-icons/fi";

const LeftSide = () => {
	const size = useResponsive();

	return size >= 1024 ? (
		<div className="left-side p-md-4">
			<div className="list-group" id="list">
				{data.map((accordion) => {
					return <List key={accordion.id} {...accordion} />;
				})}
				<a
					className="list-group-item list-group-item-action source"
					href="https://github.com/CalebGuerreroL/SOLID-Principles"
					target="_blank"
					rel="noopener noreferrer"
				>
					Código fuente <FiExternalLink />
				</a>
			</div>
			<div className="list-group names">
				<div className="list-group-item">Angel Caleb Guerrero Luna</div>
				<div className="list-group-item">Mario Eduardo Lara Loredo</div>
				<div className="list-group-item">
					Sebastián Ibarra Rodríguez
				</div>
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
