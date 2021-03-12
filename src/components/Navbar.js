import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

const Container = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 2rem;
`

const Title = styled.h1``

const SearchForm = styled.form``

const SearchInput = styled.input``

const SubmitBtn = styled.button``

const LinkContainer = styled.div``

function Navbar() {
	const [searchInput, setSearchInput] = useState('')

	return (
		<Container>
			<Title>StockWatch</Title>
			<SearchForm>
				<SearchInput
					type="search"
					placeholder="Search a Stock"
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
				/>
				<SubmitBtn>
					<BsSearch />
				</SubmitBtn>
			</SearchForm>
			<LinkContainer>
				<Link to="#">My Stocks</Link>
			</LinkContainer>
		</Container>
	)
}

export default Navbar
