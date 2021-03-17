import React, { useState } from 'react'
import styled from '@emotion/styled'

const TicketSymbol = styled.span`
	font-weight: 600;
	width: 120px;
	display: inline-block;
`
const CompanyName = styled.span``

function DropdownItem({ itemKey, symbol, name }) {
	const [mouseHover, setMouseHover] = useState(false)

	const Container = styled.li`
		padding: 0.8rem 1rem;
		cursor: pointer;
		background-color: ${mouseHover ? '#ccc' : 'white'};
	`

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
			<TicketSymbol>{symbol}</TicketSymbol>
			<CompanyName>{name}</CompanyName>
		</Container>
	)
}

export default DropdownItem
