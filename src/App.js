import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Scoreboard from './Scoreboard';
import { ScoreboardProvider } from './ScoreboardContext';

const App = () => {
	return (
		<ScoreboardProvider>
			<Router>
				<Switch>
					<Route path='/' exact>
						<Scoreboard />
					</Route>
					<Route path='/admin' exact>
						<Scoreboard isAdmin />
					</Route>
				</Switch>
			</Router>
		</ScoreboardProvider>
	);
};

export default App;