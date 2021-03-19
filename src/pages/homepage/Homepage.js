import { useState, useEffect, React } from 'react'
import styled from '@emotion/styled'
import MarketSummaryCard from '../../components/MarketSummaryCard.js'
import WatchListCard from '../../components/WatchListCard.js'
import {
	getNameAndSymbol,
	getTrendingStocks,
	getStatistics
} from '../../utils/ApiService.js'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { SpinnerContainer } from '../../utils/GlobalStyle.js'
import { useSelector } from 'react-redux'
import { getWatchList } from '../../redux/selectors.js'
import mockData from '../../mockdata.json'
import { v4 as uuid } from 'uuid'
import TrendingStockItem from '../../components/TrendingStockItem.js'

const Container = styled.div`
	max-width: 40%;
	margin: auto;
	margin-top: 1rem;
	color: var(--black);
`

const MarketSummaryContainer = styled.div`
	width: 250px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 15px;
`

const WatchlistContainer = styled.div`
	width: 500px;
	margin: auto;
`

const MarketTrendContainer = styled.div`
	width: 450px;
`

const SectionHeader = styled.h2`
	margin-bottom: 1rem;
	font-size: 1.2rem;
	text-align: center;
`

const TRENDING_LIST_SIZE = 9

function Homepage() {
	const [marketSummaryState, setMarketState] = useState([])
	const [trendingStocks, setTrendingStocks] = useState([])
	const [loading, setLoading] = useState(true)
	const watchList = useSelector(getWatchList)
	console.log(watchList)
	const fetchData = async (dow, nasdaq, spy, trending) => {
		try {
			;[dow, nasdaq, spy, trending] = await Promise.all([
				getStatistics('dow'),
				getStatistics('ndaq'),
				getStatistics('spy'),
				getTrendingStocks()
			])
			setMarketState([dow, nasdaq, spy])
			// setTrendingStocks(trending)
			setLoading(false)
		} catch {
			console.log('FAILED TO ACQUIRE DATA')
		}
	}

	const fetchTrendingStocks = async () => {
		const results = await getTrendingStocks()
		// setTrendingStocks(results)
		const trending = await Promise.all(
			results
				.slice(0, TRENDING_LIST_SIZE)
				.map(item => getNameAndSymbol(item.symbol))
		)
		setTrendingStocks(trending)
	}

	useEffect(() => {
		let dow, nasdaq, spy, trending
		setLoading(true)
		// setTimeout(() => {
		// 	setMarketState(mockData.market)
		// 	setLoading(false)
		// }, 500)
		fetchData(dow, nasdaq, spy, trending)

		fetchTrendingStocks()
		setMarketState(mockData.market)
		setLoading(false)
	}, [])

	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<PropagateLoader color={'#36D7B7'} size={30} />
				</SpinnerContainer>
			) : (
				<Container>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<MarketSummaryContainer>
							<SectionHeader>Market Summary</SectionHeader>
							<MarketSummaryCard
								price={marketSummaryState[0].price.regularMarketPrice.fmt}
								change={
									marketSummaryState[0].price.regularMarketChangePercent.fmt
								}
								volume={marketSummaryState[0].price.regularMarketVolume.fmt}
								symbol={marketSummaryState[0].price.shortName}
							/>
							<MarketSummaryCard
								price={marketSummaryState[1].price.regularMarketPrice.fmt}
								change={
									marketSummaryState[1].price.regularMarketChangePercent.fmt
								}
								volume={marketSummaryState[1].price.regularMarketVolume.fmt}
								symbol={marketSummaryState[1].price.shortName}
							/>
							<MarketSummaryCard
								price={marketSummaryState[2].price.regularMarketPrice.fmt}
								change={
									marketSummaryState[2].price.regularMarketChangePercent.fmt
								}
								volume={marketSummaryState[2].price.regularMarketVolume.fmt}
								symbol={marketSummaryState[2].price.shortName}
							/>
						</MarketSummaryContainer>
						<MarketTrendContainer>
							<SectionHeader>Trending Stocks</SectionHeader>
							<ul>
								{trendingStocks.map(item => (
									<li key={uuid()}>
										<TrendingStockItem symbol={item.symbol} name={item.name} />{' '}
									</li>
								))}
							</ul>
						</MarketTrendContainer>
					</div>
					<WatchlistContainer>
						<SectionHeader style={{ marginTop: '2rem' }}>
							Watchlist
						</SectionHeader>
						{watchList.length ? (
							<ul>
								{watchList.map(stock => (
									<li key={uuid()}>
										<WatchListCard
											price={stock.price}
											changeRaw={stock.priceChangeRaw}
											changeFmt={stock.priceChangeFmt}
											symbol={stock.symbol}
											name={stock.name}
											intrinsicValue={stock.intrinsicValue}
											verdict={stock.verdict}
										/>
									</li>
								))}
							</ul>
						) : (
							<div style={{ textAlign: 'center' }}>Watchlist is empty</div>
						)}
					</WatchlistContainer>
				</Container>
			)}
		</>
	)
}

export default Homepage
