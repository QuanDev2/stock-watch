import React, { useState, useReducer } from 'react'
import styled from '@emotion/styled'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'

const TicketSymbol = styled.span`
	font-weight: 600;
	width: 120px;
	display: inline-block;
`
const CompanyName = styled.span``

function DropdownItem({ symbol, name, closeDropdown }) {
	const [mouseHover, setMouseHover] = useState(false)
	const history = useHistory()
	const Container = styled.li`
		padding: 0.8rem 1rem;
		cursor: pointer;
		background-color: ${mouseHover ? '#ccc' : 'white'};
	`
	const path = `/stock-details/${symbol}`

	const handleClick = e => {
		closeDropdown()
		// history.push(path)
	}

	return (
		<Container
			onMouseEnter={e => {
				setMouseHover(true)
			}}
			onMouseLeave={e => {
				setMouseHover(false)
			}}
		>
			<Link to={path} onClick={handleClick}>
				<TicketSymbol>{symbol}</TicketSymbol>
				<CompanyName>{name}</CompanyName>
			</Link>
		</Container>
	)
}

export default DropdownItem
