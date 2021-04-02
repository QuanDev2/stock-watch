import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { addStock } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
//import { isInWatchlist } from '../../redux/selectors.js'
import { watchListSymbols } from '../../redux/selectors.js'

import PropagateLoader from 'react-spinners/PropagateLoader'
import useIntrinsicValue from '../../hooks/useIntrinsicValue'
import mockData from '../../mockdata.json'
import Section from './Section'

const Container = styled.div`
	max-width: 40%;
	margin: auto;
	color: var(--black);
	margin-top: 2rem;
`

const SpinnerContainer = styled.div`
	display: flex;
	height: 80vh;
	justify-content: center;
	align-items: center;
	color: green;
`

const Header = styled.div`
	margin-top: 1rem;
	font-weight: 600;
	font-size: 1.5rem;
	&::after {
		content: '';
		border: 1px solid #666;
		margin-top: 0.5rem;
		display: block;
	}
`

const LabelContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Label = styled.div`
	margin-right: 1rem;
	font-size: 1.5rem;
	font-weight: 600;
	display: inline-block;
`

const CurrentPrice = styled.div`
	display: inline-block;
	margin-right: 1rem;
	font-size: 3rem;
	font-weight: 700;
`

const PriceCaption = styled.div`
	font-size: 1rem;
	font-weight: normal;
	margin-top: 0.2rem;
`

const AddtoWatchListBtn = styled.button`
	border: var(--blue) solid 1px;
	color: white;
	background-color: var(--blue);
	padding: 0.4rem 1.2rem;
	border-radius: 1rem;
	outline: none;
	cursor: pointer;
	&:hover {
		filter: brightness(115%);
	}
`

const AddtoWatchListBtnDisabled = styled(AddtoWatchListBtn)`
	border: var(--light-gray) solid 1px;
	background-color: var(--light-gray);
	&:hover {
		filter: brightness(100%);
	}
`

const StatsHeader = styled.h2`
	font-size: 1.5rem;
	margin-top: 1rem;
	margin-bottom: 0.5rem;
`
const MainContent = styled.div`
	display: flex;
	justify-content: space-between;
`

const VerdictContainer = styled.div`
	text-align: right;
`

const IntrinsicValue = styled.div`
	font-size: 2.5rem;
	font-weight: 700;
`

const StatsContainer = styled.div``

const StatsContent = styled.div``

/*******************************************************
 *
 *
 */
function StockDetailsPage() {
	const { stockData, loading, error } = useIntrinsicValue()
	const [addedToWatchlist, setAddedToWatchlist] = useState(false)
	const watchList = useSelector(watchListSymbols)
	//const watchListStatus = useSelector(isInWatchlist(stockData.symbol)))
	// const stockData = mockData.T
	// const loading = false

	const dispatch = useDispatch()
	const addToWatchListAction = addStock(
		stockData.symbol,
		stockData.currentPrice,
		stockData.priceChangeRaw,
		stockData.priceChangePercentFmt,
		stockData.name,
		stockData.intrinsicValue,
		stockData.verdict
	)

	const {
		generalItems,
		cashInvestmentsItems,
		debtItems,
		growthItems
	} = extractData(stockData)

	const MarketChange = styled.div`
		display: inline-block;
		color: ${stockData.priceChangeRaw >= 0 ? 'var(--green)' : 'var(--red)'};
		font-weight: 600;
		font-size: 1.8rem;
	`
	const Verdict = styled.div`
		color: ${stockData.verdict <= 0 ? 'var(--green)' : 'var(--red)'};
		font-weight: 700;
		font-size: 2rem;
	`
	const handleAddToWatchlist = e => {
		dispatch(addToWatchListAction)
	}
	// console.log(watchList)
	// console.log(isInWatchlist(stockData.symbol, watchList))

	//setAddedToWatchlist(isInWatchlist(stockData.symbol,watchList))

	//setAddedToWatchlist(isInWatchlist(stockData.symbol,watchList))
	useEffect(
		() => setAddedToWatchlist(isInWatchlist(stockData.symbol, watchList)),
		[watchList]
	)

	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<PropagateLoader color={'#36D7B7'} size={30} />
				</SpinnerContainer>
			) : (
				<Container>
					<Header>
						<LabelContainer>
							<Label>
								{stockData.name} ({stockData.symbol.toUpperCase()})
							</Label>
							{addedToWatchlist ? (
								<AddtoWatchListBtnDisabled disabled>
									Added to Watchlist
								</AddtoWatchListBtnDisabled>
							) : (
								<AddtoWatchListBtn onClick={handleAddToWatchlist}>
									Add to Watchlist
								</AddtoWatchListBtn>
							)}
						</LabelContainer>
						<CurrentPrice>${stockData.currentPrice}</CurrentPrice>
						<MarketChange>
							${stockData.priceChangeFmt} ({stockData.priceChangePercentFmt})
						</MarketChange>
						{/* <PriceCaption>Market price in USD</PriceCaption> */}
					</Header>
					<MainContent>
						<StatsContainer>
							<StatsHeader>Key Financial Information</StatsHeader>
							<StatsContent>
								<Section header="General" itemList={generalItems} />
								<Section
									header="Cash and Short Term Investments"
									itemList={cashInvestmentsItems}
								/>
								<Section header="Debts" itemList={debtItems} />
								<Section header="20-Year Growth" itemList={growthItems} />
							</StatsContent>
						</StatsContainer>

						<VerdictContainer>
							<StatsHeader>Intrinsic Value</StatsHeader>
							<IntrinsicValue>${stockData.intrinsicValue}</IntrinsicValue>
							<div
								style={{
									marginTop: '1.5rem',
									fontWeight: '600',
									fontSize: '1.5rem'
								}}
							>
								{stockData.verdict <= 0 ? 'Undervalued' : 'Overvalued'}
							</div>
							<Verdict>{stockData.verdict}%</Verdict>
						</VerdictContainer>
					</MainContent>
				</Container>
			)}
		</>
	)
}

export default StockDetailsPage

const isInWatchlist = (symbol, watchList) => {
	// console.log('WathcList: ', watchList)
	// console.log('Symbol: ', symbol)

	return watchList.includes(symbol)
}

const extractData = data => {
	const generalItems = [
		{
			title: 'Market Cap',
			content: data.marketCap
		},
		{
			title: 'Shares Outstanding',
			content: data.sharesOutStandingFmt
		},
		{
			title: 'Dividend Yield',
			content: data.dividendYieldFmt
		},
		{
			title: 'Earnings per Share',
			content: data.eps
		},
		{
			title: 'Price to Earnings Ratio',
			content: data.pe
		}
	]

	const debtItems = [
		{
			title: 'Short Term Debt',
			content: data.shortTermDebtFmt
		},
		{
			title: 'Long Term Debt',
			content: data.longTermDebtFmt
		}
	]

	const cashInvestmentsItems = [
		{
			title: 'Operating Cash Flow',
			content: data.operatingCashFlowFmt
		},
		{
			title: 'Cash Reserve',
			content: data.cashFmt
		},
		{
			title: 'Short Term Investments',
			content: data.shortTermInvestmentsFmt
		}
	]

	const growthItems = [
		{
			title: 'Growth Rate in 1 to 5 years',
			content: data.cashFlowGrowthRate1to5
		},
		{
			title: 'Growth Rate in 6 to 10 years',
			content: data.cashFlowGrowthRate6to10
		},
		{
			title: 'Growth Rate in 11 to 20 years',
			content: data.cashFlowGrowthrate11to20
		},
		{
			title: 'Discount Rate',
			content: data.discountRate
		}
	]
	return { generalItems, cashInvestmentsItems, debtItems, growthItems }
}
