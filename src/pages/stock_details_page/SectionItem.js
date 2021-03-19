import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
	margin-bottom: 0.3rem;
`

const Title = styled.span`
	margin-right: 1rem;
	font-weight: 500;
`
const Content = styled.span``

function SectionItem({ title, content }) {
	return (
		<Container>
			<Title>{title}:</Title>
			<Content>{content}</Content>
		</Container>
	)
}

export default SectionItem
