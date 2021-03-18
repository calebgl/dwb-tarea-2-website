import "./index.css";
import MobileMenu from "./MobileMenu";
import { useResponsive } from "../../ResponsiveProvider";

const Navbar = () => {
	const size = useResponsive();

	return (
		<div className="container-sm">
			<div className="navbar">
				<h2>Tarea #2</h2>
				{size >= 1024 ? (
					<h4>Desarrollo Web: Back-end</h4>
				) : (
					<MobileMenu />
				)}
			</div>
		</div>
	);
};

export default Navbar;
