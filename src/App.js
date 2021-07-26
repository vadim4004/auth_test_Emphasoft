import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './components/Login';
import { Users } from './components/Users';

function App() {
	const [token, setToken] = useState();

	if (!token) {
		return <Login setToken={setToken} />;
	}

	return (
		<>
			<Router>
				<Switch>
					<Route path='/'>
						<Users token={token} />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
