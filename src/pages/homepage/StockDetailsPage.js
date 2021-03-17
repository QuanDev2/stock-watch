import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import PropagateLoader from 'react-spinners/PropagateLoader'

const Container = styled.div``

const SpinnerContainer = styled.div`
	display: flex;
	height: 80vh;
	justify-content: center;
	align-items: center;
	color: green;
`

function StockDetailsPage() {
	const [loading, setLoading] = useState(true)
	const [stockData, setStockData] = useState({})

	let { symbol } = useParams()
	useEffect(() => {}, [])

	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<PropagateLoader color={'#36D7B7'} size={30} />
				</SpinnerContainer>
			) : (
				<Container>
					<h1>This is stock detail page for {symbol} </h1>
				</Container>
			)}
		</>
	)
}

export default StockDetailsPage
