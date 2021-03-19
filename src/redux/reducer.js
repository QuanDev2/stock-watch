import {
	ADD_STOCK_TO_WATCHLIST,
	REMOVE_STOCK_FROM_WATCHLIST,
	UPDATE_WATCHLIST
} from './actions.js'

export function StockReducer(state = [], action) {
	switch (action.type) {
		case ADD_STOCK_TO_WATCHLIST:
			if (state.find(item => item.symbol === action.symbol)) {
				return state
			} else {
				return [
					...state,
					{
						symbol: action.symbol,
						price: action.price,
						priceChangeRaw: action.priceChangeRaw,
						priceChangeFmt: action.priceChangeFmt,
						name: action.name,
						intrinsicValue: action.intrinsicValue,
						verdict: action.verdict
					}
				]
			}
		case REMOVE_STOCK_FROM_WATCHLIST:
			let newWatchList = [...state]
			const stockIndex = stock => stock.symbol === action.symbol

			newWatchList.splice(newWatchList.findIndex(stockIndex), 1)
			return newWatchList

		case UPDATE_WATCHLIST:
			if (state.length === 0) {
				return []
			} else {
				return state.map(stock =>
					stock.symbol === action.symbol
						? {
								...stock,
								symbol: action.symbol,
								price: action.price,
								priceChangeRaw: action.priceChangeRaw,
								priceChangeFmt: action.priceChangeFmt,
								name: action.name,
								intrinsicValue: action.intrinsicValue,
								verdict: action.verdict
						  }
						: stock
				)
			}

		default:
			return state
	}
}
