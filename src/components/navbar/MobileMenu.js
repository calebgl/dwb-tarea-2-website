import "./index.css";
import { RiMenuFoldFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { data } from "../main/data";
import { IconContext } from "react-icons";
import { useGlobalContext } from "../../AppProvider";
import { useResponsive } from "../../ResponsiveProvider";

const MobileMenu = () => {
	const [isDisplay, setIsDisplay] = useState(false);
	const size = useResponsive();
	const { value, setValue } = useGlobalContext();

	return (
		<>
			<RiMenuFoldFill onClick={() => setIsDisplay(true)} />
			{isDisplay && (
				<div className="mobile-menu">
					<IconContext.Provider value={{ color: "white" }}>
						<IoMdClose
							className="close"
							onClick={() => setIsDisplay(false)}
						/>
					</IconContext.Provider>
					<div className="option">
						{data.map((item) => {
							return (
								<a
									key={item.id}
									className={
										value === item.id - 1 ? `active` : ""
									}
									id={item.id}
									href={
										size >= 1024
											? `#list-item-${item.id}`
											: "#s"
									}
									onClick={() => {
										setValue(item.id - 1);
										setIsDisplay(false);
										window.scroll(0, 0);
									}}
								>
									{item.title}
								</a>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
};

export default MobileMenu;
