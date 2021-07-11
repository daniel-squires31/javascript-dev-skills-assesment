import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Scoreboard from './Scoreboard';

const App = () => {
	return (
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
	);
};

export default App;
