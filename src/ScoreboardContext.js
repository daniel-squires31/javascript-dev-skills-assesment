import { createContext, useEffect, useMemo, useState } from "react";
import React from 'react';
import initialState from './InitialState.json';


const ScoreboardContext = createContext(); // YouTube: Codevolution - https://www.youtube.com/channel/UC80PWRj_ZU8Zu0HSMNVwKWw

// eslint-disable-next-line react/prop-types
const ScoreboardProvider = ({children}) => {
	const state = localStorage.getItem('scoreboardState') ? JSON.parse(localStorage.getItem('scoreboardState')) : initialState; // Was experiencing this error: https://thisinterestsme.com/fix-unexpected-token-o-in-json/
	const [scoreboardState, setScoreboardState] = useState(state);
	const contextValue = useMemo(() => ({ scoreboardState, setScoreboardState }), [scoreboardState, setScoreboardState]);

	useEffect(() => { // localStorage with useState: https://www.robinwieruch.de/local-storage-react#local-storage-in-react
		localStorage.setItem('scoreboardState', JSON.stringify(scoreboardState));
	}, [scoreboardState]);

	return (
		<ScoreboardContext.Provider value={contextValue}>
			{children}
		</ScoreboardContext.Provider>
	);
};

export default ScoreboardContext;
export {ScoreboardProvider};