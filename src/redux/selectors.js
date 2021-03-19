export function getWatchList(state) {
	return state
}


export const isInWatchlist = symbol => state => {
	state.array.forEach(element => {
		if (element.symbol === symbol) {
			return true
		}
	})
	return false
}

export function watchListSymbols(state) {
	return state.map(stock => {
		return stock.symbol
	})
}
	


	

