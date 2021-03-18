import "./index.css";
import { RiMenuFoldFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { data } from "../main/data";
import { IconContext } from "react-icons";
import { useGlobalContext } from "../../AppProvider";

const MobileMenu = () => {
	const [isDisplay, setIsDisplay] = useState(false);
	const { setValue } = useGlobalContext();

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
									id={item.id}
									href={`#list-item-${item.id}`}
									onClick={() => {
										setValue(item.id - 1);
										setIsDisplay(false);
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
