import React, { useContext, useState } from "react";

const AppContext = React.createContext();

export function useGlobalContext() {
	return useContext(AppContext);
}

const AppProvider = ({ children }) => {
	const [value, setValue] = useState(0);
	return (
		<AppContext.Provider value={{ value, setValue }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
