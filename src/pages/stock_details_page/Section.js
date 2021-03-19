import React from 'react'
import SectionItem from './SectionItem'
import styled from '@emotion/styled'
import { v4 as uuid } from 'uuid'

const Container = styled.div`
	margin-bottom: 1.2rem;
`
const SectionHeader = styled.h3`
	margin: 0.3rem 0;
`

function Section({ header, itemList }) {
	return (
		<Container>
			<SectionHeader>{header}</SectionHeader>
			<ul>
				{itemList.map(item => (
					<li key={uuid()}>
						<SectionItem title={item.title} content={item.content} />
					</li>
				))}
			</ul>
		</Container>
	)
}

export default Section
