import { useState, useEffect, React } from 'react'
import styled from '@emotion/styled'
import StockSummaryCard from '../../components/StockSummaryCard.js'
import WatchListCard from '../../components/WatchListCard.js'
import { getTrendingLowLatency } from '../../utils/ApiService.js'
import { getStatistics } from '../../utils/ApiService'
import PropagateLoader from 'react-spinners/PropagateLoader'
import SpinnerContainer from '../../utils/GlobalStyle.js'
import { useSelector } from 'react-redux'
import { getWatchList } from '../../redux/selectors.js'



const Container = styled.div`
	display:flex;
	flex-direction:column;
	margin:10px
	
`

const MarketSummaryContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
  	align-items: center;
	margin-bottom: 15px;
`

function Homepage() {
	const [ marketSummaryState, setMarketState ] = useState([])
	const [ loaded, setLoaded ] = useState(false)
	const watchList = useSelector(getWatchList)
	
	let fetchStats = async (dow,nasdaq,spy) => {
		try{
			[dow,nasdaq,spy] = await Promise.all([
				getStatistics('dow'),
				getStatistics('ndaq'),
				getStatistics('spy')
			])
			setMarketState([dow,nasdaq,spy])
			setLoaded(prevLoaded => !prevLoaded)
		}
		catch{
			console.log("FAILED TO ACQUIRE DATA")
		}
	}

	useEffect(() => {
		let dow, nasdaq, spy
		fetchStats(dow, nasdaq, spy)
	}, [])

	return (
		<Container>
			<MarketSummaryContainer>
				{ loaded ?
					<>	<h2>Market Summary</h2>
						<StockSummaryCard 
							price = {marketSummaryState[0].price.regularMarketPrice.fmt }
							change = {marketSummaryState[0].price.regularMarketChangePercent.fmt}
							volume = {marketSummaryState[0].price.regularMarketVolume.fmt}
							symbol = {marketSummaryState[0].price.shortName}
						/>
						<StockSummaryCard 
							price = {marketSummaryState[1].price.regularMarketPrice.fmt}
							change = {marketSummaryState[1].price.regularMarketChangePercent.fmt}
							volume = {marketSummaryState[1].price.regularMarketVolume.fmt}
							symbol = {marketSummaryState[1].price.shortName}
						/>
						<StockSummaryCard 
							price = {marketSummaryState[2].price.regularMarketPrice.fmt}
							change = {marketSummaryState[2].price.regularMarketChangePercent.fmt}
							volume = {marketSummaryState[2].price.regularMarketVolume.fmt}
							symbol = {marketSummaryState[2].price.shortName}
						/>	
					</> : <SpinnerContainer> <PropagateLoader color={'#36D7B7'} size={30} /> </SpinnerContainer>
				}
			</MarketSummaryContainer>
			{ watchList.length > 0 ?
				<MarketSummaryContainer>
					<h2>Watch List</h2>
					{ watchList.map(stock => (
						<WatchListCard
							price = {stock.price}
							change = {stock.change}
							volume = {stock.volume}
							symbol = {stock.symbol}
						/>
					))}
				</MarketSummaryContainer> : null
			}
		</Container>
	)
}

export default Homepage
