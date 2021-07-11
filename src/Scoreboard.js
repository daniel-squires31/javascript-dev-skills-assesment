import { useContext, useReducer } from 'react';
import initialState from './InitialState.json';
import { Link } from 'react-router-dom';
import ScoreboardContext from './ScoreboardContext';
import "./Scoreboard.css";

const FIELD_LENGTH = 100;
const NUM_DOWNS = 4;
const NUM_QUARTERS = 4;
const PRE = 'scoreboard';
const TEAMS = ['home', 'away'];


const reducer = (state, action) => {
	switch(action.type) {
		case 'incrementScore':
			return { ...state, teamData: 
				{...state.teamData, [action.id]: 
					{...state.teamData[action.id], 
						score: state.teamData[action.id].score + action.value
					}
				}
			};
		case 'incrementQuarter':
			return initialState;
		case 'changeTeamLogo':
			return initialState;
		case 'changeTeamName':
			return { ...state, teamName: action.value };
		case 'changePossession':
			return initialState;
		case 'changeTeamInfo':
			return initialState;
		case 'changeYardsToFirst':
			return initialState;
		case 'endDown':
			return initialState;
		case 'reset':
			return initialState;
		default:
			return initialState;
	};
};



const Scoreboard = ({ isAdmin }) => {
	const { scoreboardState, setScoreboardState } = useContext(ScoreboardContext);
	const [state, dispatch] = useReducer(reducer, scoreboardState);
	const hasChanges = JSON.stringify(state) !== JSON.stringify(initialState); 

	// Rendering
	const renderAdminControls = () => {
		const adminPre = PRE + '-admin';

		return (
			<div className={`${adminPre}`}>
				<div className={`${adminPre}-title`}>ADMIN</div>
				<div className={`${adminPre}-controls`}>
					<div className={`${adminPre}-team-controls-container`}>
						{TEAMS.map(renderTeamControls)}
					</div>
					<div className={`${adminPre}-general-controls-container`}>
						<button onClick={() => dispatch({ type: `endDown` })}>End Down</button>
						<button onClick={() => dispatch({ type: `changeYardsToFirst` })}>Change Yards to First Down</button>
						<button onClick={() => dispatch({ type: `turnover` })}>Turnover</button>
						<button className={`${hasChanges ? 'enabled' : 'disabled'}`} onClick={() => setScoreboardState(state)}>save</button>
						<button className={`${hasChanges ? 'enabled' : 'disabled'}`} onClick={() => dispatch({ type: 'reset' })}>new game</button>
					</div>
				</div>
			</div>
		);
	};

	const renderTeamControls = (team, teamIndex) => {
		const adminPre = PRE + '-admin';
						
		return (
			<div className={`${adminPre}-team-controls ${teamIndex === 0 ? 'left' : 'right'}`}>
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
					const { hasPossession, score, teamName } = state.teamData[teamIndex];

					return (
						<div className={`${PRE}-team-container ${teamIndex === 0 ? 'left' : 'right'}`}>
							<div className={`${PRE}-team-name`}>{teamName}</div>
							<div className={`${PRE}-team-score`}>{score}</div>
						</div>
					);
				})}
			</div>
			{isAdmin && renderAdminControls()}
			{!isAdmin &&
				<Link to='/admin'>
					<button>Admin</button>
				</Link>
			}
			{isAdmin &&
				<Link to='/'>
					<button>Back to Home</button>
				</Link>
			}
		</div>
	);
};

export default Scoreboard;