import { useReducer } from 'react';
import "./Scoreboard.css";

const FIELD_LENGTH = 100;
const MAX_DOWNS = 4;
const PRE = 'scoreboard';
const TEAMS = ['home', 'away'];

const initialState = {
	teamData: TEAMS.map(() => ({
		score: 0,
		teamName: 'name'
	})),
	teamPossessing: 0,
	currentYardLine: 25,
	down: 1,
	yardsToFirst: 10,
};

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
		case 'changeTeamLogo':
			return state;
		case 'changeTeamName':
			return { ...state, teamName: action.value };
		case 'changePossession':
			return state;
		case 'changeTeamInfo':
			return state;
		case 'changeYardsToFirst':
			return state;
		case 'endDown':
			return state;
		case 'reset':
			return initialState;
		default:
			return state;
	};
};



const Scoreboard = ({ isAdmin }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

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
		</div>
	);
};

export default Scoreboard;