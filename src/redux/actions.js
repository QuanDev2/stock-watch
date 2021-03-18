export const ADD_STOCK_TO_WATCHLIST = 'ADD_STOCK'
export const REMOVE_STOCK_FROM_WATCHLIST = 'REMOVE_STOCK'
export const UPDATE_WATCHLIST = 'UPDATE_WATCHLIST'

export function addStock(symbol,price,change,volume) {
    return {
        type: ADD_STOCK_TO_WATCHLIST,
        symbol: symbol,
        price: price,
        change: change,
        volume: volume
    }

}

export function removeStock(symbol) {
    return {
        type: REMOVE_STOCK_FROM_WATCHLIST,
        symbol: symbol
    }
}

export function updateWatchList(symbol,price,change,volume) {
    return {
        type: UPDATE_WATCHLIST,
        symbol: symbol,
        price: price,
        change: change,
        volume: volume
    }
}