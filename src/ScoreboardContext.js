import { createContext, useMemo, useState } from "react";
import initialState from './InitialState.json';


const ScoreboardContext = createContext();

const ScoreboardProvider = ({children}) => {
	const [scoreboardState, setScoreboardState] = useState(initialState);
	const contextValue = useMemo(() => ({ scoreboardState, setScoreboardState }), [scoreboardState, setScoreboardState]);

	return (
		<ScoreboardContext.Provider value={contextValue}>
			{children}
		</ScoreboardContext.Provider>
	);
};

export default ScoreboardContext;
export {ScoreboardProvider};