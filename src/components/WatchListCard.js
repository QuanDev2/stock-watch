import React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { removeStock } from '../redux/actions.js'
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


function WatchListCard({ price, change, volume, symbol }) {
	const dispatch = useDispatch()
	const removeFromWatchList = removeStock(symbol)
	return (
		<Container>
			<h2>{symbol}</h2>
			<p>Current Price: ${price} </p>
			<p>Open Change: {change} </p>
			<p> Volume: {volume} shares </p>
			<button onClick={() => {(dispatch(removeFromWatchList))}} >-</button>
		</Container>
	)

}

export default WatchListCard