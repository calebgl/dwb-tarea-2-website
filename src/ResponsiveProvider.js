import React, { useContext, useState, useEffect } from "react";

const ResponsiveContext = React.createContext();

export function useResponsive() {
	return useContext(ResponsiveContext);
}

const ResponsiveProvider = ({ children }) => {
	const [size, setSize] = useState(window.innerWidth);

	const checkSize = () => {
		setSize(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", checkSize);
		return () => {
			window.removeEventListener("resize", checkSize);
		};
	}, [size]);

	return (
		<ResponsiveContext.Provider value={size}>
			{children}
		</ResponsiveContext.Provider>
	);
};

export default ResponsiveProvider;
