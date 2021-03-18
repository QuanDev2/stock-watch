import GlobalStyle from './utils/GlobalStyle'
import Navbar from './components/navbar/Navbar'
import Homepage from './pages/homepage/Homepage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import StockDetailsPage from './pages/homepage/StockDetailsPage'

function App() {
	return (
		<Router>
			<GlobalStyle />
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Homepage />
				</Route>
				<Route exact path="/stock-details/:symbol">
					<StockDetailsPage />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
