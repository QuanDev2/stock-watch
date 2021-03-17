import { Global, css } from '@emotion/react'

function GlobalStyle() {
	const globalStyle = css`
		@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');

		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			font-family: 'Montserrat', sans-serif;
			font-size: 16px;
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

export const BOX_SHADOW = {
	SHADOW_1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
	SHADOW_2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
	SHADOW_3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
	SHADOW_4: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
	SHADOW_5: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
}
