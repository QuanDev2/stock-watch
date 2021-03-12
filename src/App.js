import GlobalStyle from './utils/GlobalStyle'
import Navbar from './components/Navbar'
import Homepage from './pages/homepage/Homepage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
	return (
		<Router>
			<GlobalStyle />
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Homepage />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
