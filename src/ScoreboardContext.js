import { createContext, useEffect, useMemo, useState } from "react";
import initialState from './InitialState.json';


const ScoreboardContext = createContext();

const ScoreboardProvider = ({children}) => {
	const state = localStorage.getItem('scoreboardState') ? JSON.parse(localStorage.getItem('scoreboardState')) : initialState;
	const [scoreboardState, setScoreboardState] = useState(state);
	const contextValue = useMemo(() => ({ scoreboardState, setScoreboardState }), [scoreboardState, setScoreboardState]);

	useEffect(() => {
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