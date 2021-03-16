import React from 'react'
import styled from '@emotion/styled'
import StockSummaryCard from '../../components/StockSummaryCard'

const Container = styled.div`
	
`

const MarketSummaryContainer = styled.div`
	display: flex;
	flex-direction:column;
	justify-content: center;
  	align-items: center;
`
	

function Homepage() {
	return (
		<Container>
			<MarketSummaryContainer>
				<StockSummaryCard 
					currentPrice = {500}
					openChange = {15}
					volume = {1000000}
				/>
				<StockSummaryCard 
					currentPrice = {500}
					openChange = {15}
					volume = {1000000}
				/>
				<StockSummaryCard 
					currentPrice = {500}
					openChange = {15}
					volume = {1000000}
				/>
			</MarketSummaryContainer>
		</Container>
	)
}

export default Homepage
