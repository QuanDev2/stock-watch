import React, { useState, useReducer } from 'react'
import styled from '@emotion/styled'
import { Link, useHistory } from 'react-router-dom'
import { useRefresh } from 'react-tidy'
import { v4 as uuid } from 'uuid'
// import { useForceUpdate } from '../../hooks/useForceUpdate'

const TicketSymbol = styled.span`
	font-weight: 600;
	width: 120px;
	display: inline-block;
`
const CompanyName = styled.span``

function DropdownItem({ itemKey, symbol, name, closeDropdown, changeSymbol }) {
	const [mouseHover, setMouseHover] = useState(false)
	// const { forceUpdate } = useForceUpdate()

	let history = useHistory()

	const Container = styled.li`
		padding: 0.8rem 1rem;
		cursor: pointer;
		background-color: ${mouseHover ? '#ccc' : 'white'};
	`
	const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
	const refresh = useRefresh()
	const path = `/stock-details/${symbol}`
	const linkUrl = {
		pathname: path,
		key: uuid(),
		state: {
			applied: true
		}
	}

	const handleClick = e => {
		closeDropdown()
		// history.push({ pathname: '/e' })
		// history.push({ pathname: path })

		changeSymbol(uuid())
	}

	return (
		<Container
			key={itemKey}
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
