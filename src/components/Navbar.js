import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

const Container = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 2rem;
	background-color: #eee;
`

const TitleLink = styled(Link)``

const SearchForm = styled.form`
	padding-right: 0;
	height: 32px;
`

const SearchInput = styled.input`
	padding: 0.3rem 0.6rem;
	border: none;
	outline: none;
	width: 800px;
	height: 32px;
	border-radius: 5px 0 0 5px;
`

const SubmitBtn = styled.button`
	cursor: pointer;
	background-color: #ddd;
	border: none;
	height: 26.16px;
	width: 50px;
	height: 32px;
	border-radius: 0px 5px 5px 0px;
`

const LinkContainer = styled.div``

function Navbar() {
	const [searchInput, setSearchInput] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
	}

	return (
		<Container>
			<TitleLink to="/">StockWatch</TitleLink>
			<SearchForm onSubmit={handleSubmit}>
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
