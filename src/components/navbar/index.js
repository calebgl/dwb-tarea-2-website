import "./index.css";
import MobileMenu from "./mobile_menu";

const Navbar = ({ size, value, setValue }) => {
	return (
		<div className="container-sm">
			<div className="navbar">
				<h2>Tarea #2</h2>
				{size >= 1024 ? (
					<h4>Desarrollo Web: Back-end</h4>
				) : (
					<MobileMenu value={value} setValue={setValue} />
				)}
			</div>
		</div>
	);
};

export default Navbar;
