import React, { useContext, useReducer } from 'react';
import initialState from './InitialState.json';
import { Link } from 'react-router-dom';
import ScoreboardContext from './ScoreboardContext';
import "./Scoreboard.css";

// Class prefixes
const PRE = 'scoreboard';
const PRE_ADMIN = PRE + '-admin';

// Constants
const DOWNS = ['1st', '2nd', '3rd', '4th'];
const TIMEOUTS = ['', '', ''];
const QUARTERS = ['1st', '2nd', '3rd', '4th'];
const TEAMS = ['home', 'away'];

// State management
const reducer = (state, action) => { // YouTube: Codevolution - https://www.youtube.com/channel/UC80PWRj_ZU8Zu0HSMNVwKWw
	switch (action.type) {
		case 'changePossession': {
			const teamPossessing = !state.teamPossessing;
			return { ...state, currentDown: 1, teamPossessing, yardsToFirst: 10,}
		}
		case 'changeTeamLogo': {// helped w/ double-firing https://stackoverflow.com/questions/55055793/react-usereducer-hook-fires-twice-how-to-pass-props-to-reducer
			return { ...state, teamData: 
				{...state.teamData, [action.id]: 
					{...state.teamData[action.id], 
						teamLogo: `${action.value}`
					}
				}
			};
		}
		case 'changeTeamName': {
			return { ...state, teamData: 
				{...state.teamData, [action.id]: 
					{...state.teamData[action.id], 
						teamName: action.value
					}
				}
			};
		}
		case 'changeYardsUntilFirst': {
			return { ...state, yardsToFirst: action.value };
		}
		case 'decrementTimeout': {
			return { ...state, teamData: 
				{...state.teamData, [action.id]: 
					{...state.teamData[action.id], 
						timeoutsLeft: state.teamData[action.id].timeoutsLeft > 0 ? state.teamData[action.id].timeoutsLeft - 1 : 0
					}
				}
			};
		}
		case 'endDown': {
			const currentDown = state.currentDown + 1;
			if (currentDown > DOWNS.length) {
				const teamPossessing = state.teamPossessing === 0 ? 1 : 0;
				return { ...state, currentDown: 1, teamPossessing, yardsToFirst: 10,}
			}
			return { ...state, currentDown}
		}
		case 'incrementQuarter': {
			const currentQuarter = state.currentQuarter + 1 <= QUARTERS.length ? state.currentQuarter + 1 : state.currentQuarter;
			return { ...state, currentQuarter};
		}
		case 'incrementScore': {
			return { ...state, teamData: 
				{...state.teamData, [action.id]: 
					{...state.teamData[action.id], 
						score: state.teamData[action.id].score + action.value
					}
				}
			};
		}
		case 'resetTimeouts': {
			return { ...state, teamData: 
				{...state.teamData, [action.id]: 
					{...state.teamData[action.id], 
						timeoutsLeft: TIMEOUTS.length
					}
				}
			};
		}
		case 'setYardLine': {
			return { ...state, currentYardLine: action.value};
		}
		case 'totalReset': {
			return initialState;
		}
		case 'turnover': {
			const newTeam = state.teamPossessing === 0 ? 1 : 0;
			return { ...state, currentDown: 1, teamPossessing: newTeam, yardsToFirst: 10,}
		}
		case 'undoChanges': {
			return action.value
		}
		default:
			return state;
	}
};


// Rendering
// eslint-disable-next-line react/prop-types
const Scoreboard = ({ isAdmin }) => {
	const { scoreboardState, setScoreboardState } = useContext(ScoreboardContext);
	const [state, dispatch] = useReducer(reducer, scoreboardState); // update state w/ useReducer: https://stackoverflow.com/questions/57719325/how-to-update-an-array-within-object-with-usereducer
	const hasChanges = JSON.stringify(state) !== JSON.stringify(scoreboardState); // comparing two objects: https://www.samanthaming.com/tidbits/33-how-to-compare-2-objects/

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
				<input placeholder="Enter current yard line" onChange={(e) => dispatch({ type: 'setYardLine', value: e.target.value })} />
				<button onClick={() => dispatch({ type: `endDown` })}>End Down</button>
				<button onClick={() => dispatch({ type: `incrementQuarter` })}>Increment Quarter</button>
				<button onClick={() => dispatch({ type: `turnover` })}>Turnover</button>
				<button className={`${hasChanges ? 'enabled' : 'disabled'}`} onClick={() => setScoreboardState(state)}>Save</button>
				<button className={`${hasChanges ? 'enabled' : 'disabled'}`} onClick={() => dispatch({ type: 'undoChanges', value: scoreboardState })}>Undo Changes</button>
				<button className={`${hasChanges ? 'enabled' : 'disabled'}`} onClick={() => dispatch({ type: 'totalReset' })}>New Game</button>
			</div>
		);
	};

	const renderTeamControls = (team, teamIndex) => {	
		return (
			<div className={`${PRE_ADMIN}-team-controls ${teamIndex === 0 ? 'left' : 'right'}`} key={`team-controls-${teamIndex}`}>
				<div className={`${PRE_ADMIN}-team-controls-scoring`}>
					<div className={`${PRE_ADMIN}-team-controls-scoring-label`}>Increment {state.teamData[teamIndex].teamName}s score:</div>
					<button onClick={() => dispatch({ type: `incrementScore`, id: teamIndex, value: 6 })}>Touchdown</button>
					<button onClick={() => dispatch({ type: `incrementScore`, id: teamIndex, value: 1 })}>Extra Point</button>
					<button onClick={() => dispatch({ type: `incrementScore`, id: teamIndex, value: 3 })}>Field Goal</button>
					<button onClick={() => dispatch({ type: `incrementScore`, id: teamIndex, value: 2 })}>2-pt. Conversion</button>
				</div>
				<div className={`${PRE_ADMIN}-team-controls-data`}>
					<div className={`${PRE_ADMIN}-team-controls-data-label`}>Change {state.teamData[teamIndex].teamName}s data:</div>
					<button onClick={() => dispatch({ type: `decrementTimeout`, id: teamIndex })}>Use Timeout</button>
					<button onClick={() => dispatch({ type: `resetTimeouts`, id: teamIndex })}>Reset Timeouts</button>
					<input placeholder="New Team Name" onChange={(e) => dispatch({ type: 'changeTeamName', id: teamIndex, value: e.target.value })} />
					<input placeholder="New Logo URL" onChange={(e) => dispatch({ type: 'changeTeamLogo', id: teamIndex, value: e.target.value })} />
				</div>
			</div>
		);
	};


	return (
		<div className={`${PRE}`}>
			<div className={`${PRE}-title`}>Football Scoreboard</div>
			<div className={`${PRE}-teams`}>
				{TEAMS.map((team, teamIndex) => {
					const { teamLogo, teamName, timeoutsLeft, score } = state.teamData[teamIndex];
					const isPossessing = state.teamPossessing === teamIndex;

					return (
						<div className={`${PRE}-team-container ${teamIndex === 0 ? 'left' : 'right'}`} key={`team-container-${teamIndex}`}>
							{isPossessing &&
								<img className={`${PRE}-team-possession-icon`} src={'https://www.clipartmax.com/png/small/1-11974_american-football-clipart-american-football-ball-vector.png'} alt={'possession icon'} />
							}
							<div className={`${PRE}-team-name`}>{teamName}</div>
							<div className={`${PRE}-team-logo-timeouts`}>
								<img className={`${PRE}-team-logo`} src={teamLogo} alt='team logo'/>
								<div className={`${PRE}-team-timeouts`}>
									<div className={`${PRE}-team-timeouts-label`}>Timeouts: </div>
									{TIMEOUTS.map((to, toIndex) => (
										<div className={`${PRE}-team-timeout-bubble ${toIndex >= timeoutsLeft ? 'empty' : 'filled'}`} key={`timeout-bubble-${teamIndex}-${toIndex}`} />
									))}
								</div>
							</div>
							<div className={`${PRE}-team-score`}>{score}</div>
						</div>
					);
				})}
			</div>
			<div className={`${PRE}-quarter`}>{DOWNS[state.currentDown - 1]} and {state.yardsToFirst} on the {state.currentYardLine} yard line</div>
			<div className={`${PRE}-quarter`}>Quarter: {state.currentQuarter}</div>

			{isAdmin && renderAdminControls()}
			{!isAdmin &&
				<Link to='/admin'>
					<button>Admin</button>
				</Link>
			}
			{isAdmin &&
				<Link to='/'>
					<button onClick={() => dispatch({ type: 'undoChanges', value: scoreboardState })}>Back to Home</button>
				</Link>
			}
		</div>
	);
};

export default Scoreboard;