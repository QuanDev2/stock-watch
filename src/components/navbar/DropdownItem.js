import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const TicketSymbol = styled.span`
	font-weight: 600;
	width: 120px;
	display: inline-block;
`
const CompanyName = styled.span``

function DropdownItem({ itemKey, symbol, name, closeDropdown }) {
	const [mouseHover, setMouseHover] = useState(false)

	const Container = styled.li`
		padding: 0.8rem 1rem;
		cursor: pointer;
		background-color: ${mouseHover ? '#ccc' : 'white'};
	`

	const linkUrl = `/stock-details/${symbol}`

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
			<Link to={linkUrl} onClick={closeDropdown}>
				<TicketSymbol>{symbol}</TicketSymbol>
				<CompanyName>{name}</CompanyName>
			</Link>
		</Container>
	)
}

export default DropdownItem
