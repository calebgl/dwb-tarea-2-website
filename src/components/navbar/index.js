import "./index.css";
import MobileMenu from "./mobile_menu";

const Navbar = ({ size }) => {
	return (
		<div className="container-sm">
			<div className="navbar">
				<h2>Tarea #2</h2>
				{size > 1023 ? (
					<h4>Desarrollo Web: Back-end</h4>
				) : (
					<MobileMenu />
				)}
			</div>
		</div>
	);
};

export default Navbar;
