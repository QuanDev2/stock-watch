import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const Container = styled.div`
	border: solid 1px var(--lightest-gray);
	margin-bottom: 0.8rem;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	width: 100%;
	padding: 0.3rem 1rem;
	border-radius: 0.3rem;
	&:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
`

function TrendingStockItem({ symbol, name }) {
	const path = `/stock-details/${symbol}`
	return (
		<Container>
			<Link to={path}>
				<span
					style={{
						fontWeight: '500',
						marginRight: '1rem'
					}}
				>
					{symbol}
				</span>
				<span>{name}</span>
			</Link>
		</Container>
	)
}

export default TrendingStockItem
