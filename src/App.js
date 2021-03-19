import GlobalStyle from './utils/GlobalStyle'
import Navbar from './components/navbar/Navbar'
import { useState } from 'react'
import Homepage from './pages/homepage/Homepage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import StockDetailsPage from './pages/stock_details_page/StockDetailsPage'

function App() {
	return (
		<Router>
			<GlobalStyle />
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Homepage />
				</Route>
				<Route path="/stock-details/:symbol">
					<StockDetailsPage />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
