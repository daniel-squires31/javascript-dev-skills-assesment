import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // YouTube: Dev Ed - https://www.youtube.com/channel/UClb90NQQcskPUGDIXsQEz5Q
import Scoreboard from './Scoreboard';
import { ScoreboardProvider } from './ScoreboardContext'; // YouTube: Codevolution - https://www.youtube.com/channel/UC80PWRj_ZU8Zu0HSMNVwKWw

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