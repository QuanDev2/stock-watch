import GlobalStyle from './utils/GlobalStyle'
import Navbar from './components/navbar/Navbar'
import { useState } from 'react'
import Homepage from './pages/homepage/Homepage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import StockDetailsPage from './pages/homepage/StockDetailsPage'

function App() {
	const [symbol, setSymbol] = useState('')
	const changeSymbol = newSymbol => {
		setSymbol(newSymbol)
	}
	return (
		<Router>
			<GlobalStyle />
			<Navbar changeSymbol={changeSymbol} />
			<Switch>
				<Route exact path="/">
					<Homepage />
				</Route>
				<Route path="/stock-details/:symbol">
					<StockDetailsPage symbol={symbol} />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
