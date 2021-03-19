import React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { removeStock } from '../redux/actions.js'
import { Link } from 'react-router-dom'

const Container = styled.div`
	border: solid 1px #bbb;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	transition: 0.3s;

	&:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
`
const Symbol = styled.span`
	font-weight: 700;
	margin-right: 1rem;
`

function WatchListCard({
	price,
	priceChangeRaw,
	priceChangeFmt,
	symbol,
	intrinsicValue,
	verdict,
	name
}) {
	const path = `/stock-details/${symbol}`
	const dispatch = useDispatch()
	const removeFromWatchList = removeStock(symbol)
	return (
		<Link to={path}>
			<Container>
				<div>
					<Symbol>{symbol}</Symbol>
					<span>{name}</span>
				</div>
				<div></div>
			</Container>
		</Link>
	)
}

export default WatchListCard
{
	/* <button
onClick={() => {
	dispatch(removeFromWatchList)
}}
> 
-
</button>*/
}
