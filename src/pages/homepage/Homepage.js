import { useState, useEffect, React } from 'react'
import styled from '@emotion/styled'
import StockSummaryCard from '../../components/StockSummaryCard'
import { getTrendingLowLatency } from '../../utils/ApiService'
import { getStatistics } from '../../utils/ApiService'



const Container = styled.div`
	
`

const MarketSummaryContainer = styled.div`
	display: flex;
	flex-direction:column;
	justify-content: center;
  	align-items: center;
`
	

function Homepage() {
	const [ marketSummaryState, setMarketState ] = useState([])
	
	let fetchStats = async (dow,nasdaq,spy) => {
		try{
			[dow,nasdaq,spy] = await Promise.all([
				getStatistics('dow'),
				getStatistics('ndaq'),
				getStatistics('spy'),
			])
			setMarketState([dow,nasdaq,spy])
		}
		catch{
			console.log("FAILED TO ACQUIRE DATA")
		}
	}
	
	useEffect( () => {
		let dow,nasdaq,spy
		fetchStats(dow,nasdaq,spy)
	}, []);

	return (
		<Container>
			<MarketSummaryContainer>
				{marketSummaryState.length != 0 ?
					<>
						<StockSummaryCard 
							currentPrice = {marketSummaryState[0].price.regularMarketPrice.fmt }
							openChange = {marketSummaryState[0].price.preMarketChangePercent.fmt}
							volume = {marketSummaryState[0].price.regularMarketVolume.fmt}
							symbol = {marketSummaryState[0].price.shortName}
						/>
						<StockSummaryCard 
							currentPrice = {marketSummaryState[1].price.regularMarketPrice.fmt}
							openChange = {marketSummaryState[1].price.preMarketChangePercent.fmt}
							volume = {marketSummaryState[1].price.regularMarketVolume.fmt}
							symbol = {marketSummaryState[1].price.shortName}
						/>
						<StockSummaryCard 
							currentPrice = {marketSummaryState[2].price.regularMarketPrice.fmt}
							openChange = {marketSummaryState[2].price.preMarketChangePercent.fmt}
							volume = {marketSummaryState[2].price.regularMarketVolume.fmt}
							symbol = {marketSummaryState[2].price.shortName}
						/>
					</> : "Loading..."
				}
			</MarketSummaryContainer>
		</Container>
	)
}

export default Homepage
