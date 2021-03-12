import { Global, css } from '@emotion/react'

function GlobalStyle() {
	const globalStyle = css`
		@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');

		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			font-family: 'Montserrat', sans-serif;
		}

		a {
			text-decoration: none;
		}

		li {
			list-style: none;
		}
	`

	return <Global styles={globalStyle} />
}

export default GlobalStyle
