import React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { addStock } from '../redux/actions.js'

const Container = styled.div`
	border: solid 1px var(--lightest-gray);
	/* margin: 1rem auto 0.5rem; */
	margin-bottom: 0.8rem;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	width: 100%;
	padding: 1rem;
	border-radius: 0.5rem;
	&:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
`

const Symbol = styled.h3`
	margin-bottom: 0.2rem;
`
const ItemContainer = styled.div``
const ItemTitle = styled.span`
	margin-right: 1rem;
	font-weight: 500;
`
const ItemContent = styled.span``

function StockSummaryCard({ price, change, volume, symbol }) {
	const dispatch = useDispatch()
	const addToWatchList = addStock(symbol, price, change, volume)
	return (
		<Container>
			<Symbol>{symbol}</Symbol>
			<ItemContainer>
				<ItemTitle>Market Price:</ItemTitle>
				<ItemContent>${price}</ItemContent>
			</ItemContainer>
			<ItemContainer>
				<ItemTitle>Since last close:</ItemTitle>
				<ItemContent>{change}</ItemContent>
			</ItemContainer>
			<ItemContainer>
				<ItemTitle>Volume:</ItemTitle>
				<ItemContent>${volume}</ItemContent>
			</ItemContainer>
		</Container>
	)
}

export default StockSummaryCard
