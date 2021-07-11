import { useContext, useReducer } from 'react';
import initialState from './InitialState.json';
import { Link } from 'react-router-dom';
import ScoreboardContext from './ScoreboardContext';
import "./Scoreboard.css";

// Class name prefixes
const PRE = 'scoreboard';
const PRE_ADMIN = PRE + '-admin';

// Constants
const DOWNS = ['1st', '2nd', '3rd', '4th'];
const FIELD_LENGTH = 100;
const TIMEOUTS = ['', '', ''];
const QUARTERS = ['1st', '2nd', '3rd', '4th'];
const TEAMS = ['home', 'away'];

// State management
const reducer = (state, action) => {
	switch(action.type) {
		case 'changePossession':
			const teamPossessing = !state.teamPossessing;
			return { ...state, currentDown: 1, teamPossessing, yardsToFirst: 10,}
		case 'changeTeamLogo':
			return initialState;
		case 'changeTeamName':
			return { ...state, teamName: action.value };
		case 'changeTeamInfo':
			return initialState;
		case 'changeYardsUntilFirst':
			return { ...state, yardsToFirst: action.value };
		case 'decrementTimeout':
			return initialState;
		case 'endDown':
			const currentDown = state.currentDown + 1;
			if (currentDown > DOWNS.length) {
				const teamPossessing = !state.teamPossessing;
				return { ...state, currentDown: 1, teamPossessing, yardsToFirst: 10,}
			}
			return { ...state, currentDown}
		case 'incrementQuarter':
			const currentQuarter = state.currentQuarter + 1 <= QUARTERS.length ? state.currentQuarter + 1 : 1;
			return { ...state, currentQuarter};
		case 'incrementScore':
			return { ...state, teamData: 
				{...state.teamData, [action.id]: 
					{...state.teamData[action.id], 
						score: state.teamData[action.id].score + action.value
					}
				}
			};
		case 'reset':
			return initialState;
		case 'resetTimeouts':
			return initialState;
		default:
			return initialState;
	};
};


// Rendering
const Scoreboard = ({ isAdmin }) => {
	const { scoreboardState, setScoreboardState } = useContext(ScoreboardContext);
	const [state, dispatch] = useReducer(reducer, scoreboardState);
	const hasChanges = JSON.stringify(state) !== JSON.stringify(initialState); 

	const renderAdminControls = () => {
		return (
			<div className={`${PRE_ADMIN}`}>
				<div className={`${PRE_ADMIN}-title`}>ADMIN</div>
				<div className={`${PRE_ADMIN}-controls`}>
					<div className={`${PRE_ADMIN}-team-controls-container`}>
						{TEAMS.map(renderTeamControls)}
					</div>
					<div className={`${PRE_ADMIN}-general-controls-container`}>
						{renderGeneralControls()}
					</div>
				</div>
			</div>
		);
	};

	const renderGeneralControls = () => {
		return (
			<div className={`${PRE_ADMIN}-general-controls`}>
				<input placeholder="Enter yards until First Down" onChange={(e) => dispatch({ type: 'changeYardsUntilFirst', value: e.target.value })} />
				<button onClick={() => dispatch({ type: `endDown` })}>End Down</button>
				<button onClick={() => dispatch({ type: `incrementQuarter` })}>Increment Quarter</button>
				<button onClick={() => dispatch({ type: `changeYardsUntilFirst` })}>Change Yards to First Down</button>
				<button onClick={() => dispatch({ type: `turnover` })}>Turnover</button>
				<button className={`${hasChanges ? 'enabled' : 'disabled'}`} onClick={() => setScoreboardState(state)}>save</button>
				<button className={`${hasChanges ? 'enabled' : 'disabled'}`} onClick={() => dispatch({ type: 'reset' })}>new game</button>
			</div>
		)
	}

	const renderTeamControls = (team, teamIndex) => {	
		console.log({TIMEOUTS});
		
		return (
			<div className={`${PRE_ADMIN}-team-controls ${teamIndex === 0 ? 'left' : 'right'}`}>
				<button onClick={() => dispatch({ type: `incrementScore`, id: teamIndex, value: 6 })}>Touchdown</button>
				<button onClick={() => dispatch({ type: `incrementScore`, id: teamIndex, value: 1 })}>Extra Point</button>
				<button onClick={() => dispatch({ type: `incrementScore`, id: teamIndex, value: 3 })}>Field Goal</button>
				<button onClick={() => dispatch({ type: `incrementScore`, id: teamIndex, value: 2 })}>2-pt. Conversion</button>
			</div>
		);
	};


	return (
		<div className={`${PRE}`}>
			<div className={`${PRE}-title`}>Football Scoreboard</div>
			<div className={`${PRE}-teams`}>
				{TEAMS.map((team, teamIndex) => {
					console.log({state});
					const { teamInfo, teamLogo, teamName, timeoutsLeft, score } = state.teamData[teamIndex];

					return (
						<div className={`${PRE}-team-container ${teamIndex === 0 ? 'left' : 'right'}`}>
							<div className={`${PRE}-team-name`}>{teamName}</div>
							<div className={`${PRE}-team-logo-timeouts`}>
								<img className={`${PRE}-team-logo`} src={teamLogo} />
								<div className={`${PRE}-team-timeouts`}>
									<div className={`${PRE}-team-timeouts-label`}>Timeouts: </div>
									{TIMEOUTS.map((to, toIndex) => (
										<div className={`${PRE}-team-timeout-bubble ${toIndex > timeoutsLeft ? 'empty' : 'filled'}`} />
									))}
								</div>
							</div>
							<div className={`${PRE}-team-score`}>{score}</div>
						</div>
					);
				})}
			</div>
			<div className={`${PRE}-quarter`}>Quarter: {state.currentQuarter}</div>
			<div className={`${PRE}-down`}>Down: {state.currentDown}</div>
			<div className={`${PRE}-yards-till-first`}>YTF: {state.yardsToFirst}</div>

			{isAdmin && renderAdminControls()}
			{!isAdmin &&
				<Link to='/admin'>
					<button>Admin</button>
				</Link>
			}
			{isAdmin &&
				<Link to='/'>
					<button onClick={()=> console.log('worked')}>Back to Home</button>
				</Link>
			}
		</div>
	);
};

export default Scoreboard;