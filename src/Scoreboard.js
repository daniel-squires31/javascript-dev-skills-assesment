import { useReducer } from 'react';
import "./Scoreboard.css";

const pre = 'scoreboard';

const initialState = {
	homeTeamData: {
		score: 0,
		name: '',
		hasPossession: true,
	},
	awayTeamData: {
		score: 0,
		name: '',
		hasPossession: true,
	},
	down: 1,
	yardsToFirst: 10,
};

const reducer = (state, action) => {
	switch(action) {
		default: return
	};
};



const Scoreboard = () => {
	const isAdmin = true;

	// Rendering
	const renderAdminControls = () => {
		const adminPre = pre + '-admin';
		return (
			<div className={`${adminPre}`}>
				ADMIN
			</div>
		);
	};

	return (
		<div className={`${pre}`}>
			<div className={`${pre}-title`}>Football Scoreboard</div>
			<div className={`${pre}-teams`}>
				<div className={`${pre}-team-container left`}>

				</div>
				<div className={`${pre}-team-container right`}>
					
				</div>
			</div>
			{isAdmin && renderAdminControls()}
		</div>
	);
};

export default Scoreboard;