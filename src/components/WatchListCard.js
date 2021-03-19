import React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { removeStock } from '../redux/actions.js'
import { Link } from 'react-router-dom'

const Container = styled.div`
	border: solid 1px #bbb;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	width: 500px;
	&:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
	padding: 1rem;
	border-radius: 0.5rem;
	margin-bottom: 1rem;
`

const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

const Symbol = styled.span`
	font-weight: 700;
	margin-right: 1rem;
	margin-left: 0.5rem;
	font-size: 1.2rem;
`
const BottomContainer = styled.div`
	display: flex;
	justify-content: space-between;
`
const Price = styled.span`
	font-size: 2.5rem;
	margin-right: 0.5rem;
	font-weight: 500;
`

const Label = styled.span`
	font-weight: 500;
	margin-right: 0.5rem;
	width: 120px;
	display: inline-block;
`

const RemoveBtn = styled.button`
	border: none;
	margin-left: auto;
	margin-right: 0.3rem;
	background-color: transparent;
	font-style: italic;
	cursor: pointer;
`

function WatchListCard({
	price,
	changeRaw,
	changeFmt,
	symbol,
	intrinsicValue,
	verdict,
	name
}) {
	const path = `/stock-details/${symbol}`
	const dispatch = useDispatch()
	const removeFromWatchList = removeStock(symbol)

	const Change = styled.span`
		font-weight: 500;
		color: ${changeRaw >= 0 ? 'var(--green)' : 'var(--red)'};
	`
	const Value = styled.span`
		color: ${verdict < 0 ? 'var(--green)' : 'var(--red)'};
		font-weight: 600;
	`

	return (
		<Container>
			<HeaderContainer>
				<div>
					<Symbol>{symbol}</Symbol>
					<span>{name}</span>
				</div>
				<RemoveBtn
					onClick={() => {
						dispatch(removeFromWatchList)
					}}
				>
					Remove
				</RemoveBtn>
			</HeaderContainer>
			<Link to={path}>
				<BottomContainer>
					<div>
						<Price>${price}</Price>
						<Change>{changeFmt}</Change>
					</div>

					<div>
						<div>
							<Label>Intrinsic Value:</Label> <Value>${intrinsicValue}</Value>
						</div>
						<div>
							<Label>{verdict <= 0 ? 'Undervalued:' : 'Overvalued:'}</Label>
							<Value>{verdict}%</Value>
						</div>
					</div>
				</BottomContainer>
			</Link>
		</Container>
	)
}

export default WatchListCard
