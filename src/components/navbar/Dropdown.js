import React from 'react'
import styled from '@emotion/styled'
import { BOX_SHADOW } from '../../utils/GlobalStyle'
import DropdownItem from './DropdownItem'

const Container = styled.div`
	position: relative;
	background: white;
	padding: 0.5rem 0;

	border-radius: 0 0 8px 8px;
	box-shadow: ${BOX_SHADOW.SHADOW_2};
`

function Dropdown({ contentList, open, searchInput, closeDropdown }) {
	if (searchInput && contentList.length === 0) {
		return (
			<Container>
				<span
					style={{
						padding: '2rem 1rem'
					}}
				>
					We were unable to find any results for your search.
				</span>
			</Container>
		)
	} else if (!open || !searchInput) {
		return null
	} else {
		return (
			<Container>
				<ul>
					{contentList.map(item => (
						<DropdownItem
							itemKey={item.key}
							symbol={item.symbol}
							name={item.name}
							closeDropdown={closeDropdown}
						/>
					))}
				</ul>
			</Container>
		)
	}
}
export default Dropdown
