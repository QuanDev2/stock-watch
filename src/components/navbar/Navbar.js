import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { getAutoCompleteSearch, getStatistics } from '../../utils/ApiService'
import Dropdown from './Dropdown'

const Container = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 2rem;
	background-color: var(--green);
`

const TitleLink = styled(Link)`
	color: white;
	font-size: 1.5rem;
	font-weight: 600;
`

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

const DropdownContainer = styled.div``

const LinkContainer = styled.div``

function Navbar({ changeSymbol }) {
	const [searchInput, setSearchInput] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [openDropdown, setOpenDropdown] = useState(false)

	const dropdownRef = useRef()

	const handleSubmit = async e => {
		e.preventDefault()
		// make api call to /auto-complete
		console.log('query: ', searchInput)
		setSearchResults(await getAutoCompleteSearch(searchInput))
		// display as dropdown
		setOpenDropdown(true)
	}
	console.log(openDropdown)
	async function handleInputchange(e) {
		setSearchInput(e.target.value)

		/* This is commented out because of API call limit, so we won't search on every keystroke */

		// // make api call to /auto-complete
		// setSearchResults(await getAutoCompleteSearch(e.target.value))
		// // display as dropdown
		// setOpenDropdown(true)
	}

	const handleDropdownOutsideClick = e => {
		// if click outside, close dropdown
		if (!dropdownRef.current.contains(e.target)) {
			setOpenDropdown(false)
		}
	}

	const closeDropdownOnItemClick = () => {
		setOpenDropdown(false)
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleDropdownOutsideClick)

		return () => {
			document.removeEventListener('mousedown', handleDropdownOutsideClick)
		}
	}, [])

	return (
		<Container>
			<TitleLink to="/">StockWatch</TitleLink>
			<SearchForm onSubmit={handleSubmit}>
				<SearchInput
					type="search"
					placeholder="Search a Stock"
					value={searchInput}
					onChange={handleInputchange}
				/>
				<SubmitBtn>
					<BsSearch />
				</SubmitBtn>
				<DropdownContainer ref={dropdownRef}>
					<Dropdown
						contentList={searchResults}
						open={openDropdown}
						searchInput={searchInput}
						closeDropdown={closeDropdownOnItemClick}
						changeSymbol={changeSymbol}
					/>
				</DropdownContainer>
			</SearchForm>
			<LinkContainer>{/* <Link to="#">My Stocks</Link> */}</LinkContainer>
		</Container>
	)
}

export default Navbar
