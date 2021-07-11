import { useReducer } from 'react';
import "./Scoreboard.css";

const PRE = 'scoreboard';
const TEAMS = ['home', 'away'];

const initialState = {
	// homeTeamData: {
	// 	score: 0,
	// 	name: '',
	// 	hasPossession: true,
	// },
	// awayTeamData: {
	// 	score: 0,
	// 	name: '',
	// 	hasPossession: true,
	// },
	teamData: TEAMS.map(() => ({
		hasPossession: true,
		score: 0,
		teamName: 'name'
	})),
	down: 1,
	yardsToFirst: 10,
};

const reducer = (state, action) => {
	switch(action.type) {
		case `incrementScore${action.id}`:
			const teamData = state.teamData;
			console.log('data', teamData[action.id]);
			console.log('action', action)
			teamData[action.id].score = teamData[action.id].score + action.value;
			return { ...state, teamData};
		case 'changeTeamName1':
			return { ...state, teamName: action.value };
		case 'reset':
			return initialState;
		default:
			return state;
	};
};



const Scoreboard = () => {
	const isAdmin = true;
	const [state, dispatch] = useReducer(reducer, initialState);

	// Rendering
	const renderAdminControls = () => {
		const adminPre = PRE + '-admin';

		return (
			<div className={`${adminPre}`}>
				<div className={`${adminPre}-title`}>ADMIN</div>
				<div className={`${adminPre}-controls`}>
					<div className={`${adminPre}-team-controls-container`}>
						{TEAMS.map((team, teamIndex) => {
							const { hasPossession, score, teamName } = state.teamData[teamIndex];
							
							return (
								<div className={`${adminPre}-team-controls ${teamIndex === 0 ? 'left' : 'right'}`}>
									<button onClick={() => dispatch({ type: `incrementScore${teamIndex}`, id: teamIndex, value: 6 })}>Touchdown</button>
									<button onClick={() => dispatch({ type: `incrementScore${teamIndex}`, id: teamIndex, value: 1 })}>Extra Point</button>
									<button onClick={() => dispatch({ type: `incrementScore${teamIndex}`, id: teamIndex, value: 3 })}>Field Goal</button>
									<button onClick={() => dispatch({ type: `incrementScore${teamIndex}`, id: teamIndex, value: 2 })}>2-pt. Conversion</button>
								</div>
							);
						})}
					</div>
				</div>
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