function fetchYahooFinanceData(endpoint, symbol, region = 'US') {
	const BASE_URL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com'
	const URL = `${BASE_URL}${endpoint}?symbol=${symbol}&region=${region}`
	return fetch(URL, {
		method: 'GET',
		headers: {
			'x-rapidapi-key': process.env.REACT_APP_API_KEY,
			'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
		}
	})
}

export async function getStatistics(symbol) {
	return await (
		await fetchYahooFinanceData('/stock/v2/get-statistics', symbol)
	).json()
}

export async function getBalanceSheet(symbol) {
	return await (
		await fetchYahooFinanceData('/stock/v2/get-balance-sheet', symbol)
	).json()
}

export async function getAnalysis(symbol) {
	return await (
		await fetchYahooFinanceData('/stock/v2/get-analysis', symbol)
	).json()
}

export async function getAutoCompleteSearch(query) {
	return await (
		await fetch(
			`https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/autocomplete?query=${query}&lang=en&region=US`,
			{
				method: 'GET',
				headers: {
					'x-rapidapi-key': process.env.REACT_APP_API_KEY,
					'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
				}
			}
		)
	).json()
}
