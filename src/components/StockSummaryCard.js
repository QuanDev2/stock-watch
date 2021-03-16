import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
	border: solid 1px #bbb;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  	transition: 0.3s;
	margin:10px;
	min-width:600px;
	max-width:800px;
	
	&:hover {
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
	}

	& > p {
		padding:5px;
	}

	& > h2 {
		padding-left:2px;
	}
`


function StockSummaryCard({ currentPrice, openChange, volume }) {
	return (
		<Container>
			<h2>DOW</h2>
			<p>Current Price: ${currentPrice} </p>
			<p>Open Change: %{openChange} </p>
			<p> Volume: {volume} shares </p>
		</Container>
	)

}

export default StockSummaryCard
