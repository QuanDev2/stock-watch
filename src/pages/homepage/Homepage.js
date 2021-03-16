import React from 'react'
import styled from '@emotion/styled'
import StockSummaryCard from '../../components/StockSummaryCard'

const Container = styled.div``

const MarketSummaryContainer = styled.div``

function Homepage() {
	//marketSummaryState []

	// useEffect()
	// make api calls to nasdaq, spy, dow

	return (
		<Container>
			<MarketSummaryContainer>
				<StockSummaryCard name={'NASDAG'} currentPrice={500} openprice={300} />
				<StockSummaryCard currentPrice={500} openprice={300} />
				<StockSummaryCard currentPrice={500} openprice={300} />
			</MarketSummaryContainer>
		</Container>
	)
}

export default Homepage
