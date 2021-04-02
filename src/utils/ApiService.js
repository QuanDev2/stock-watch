const API_KEY = process.env.REACT_APP_API_KEY_3
const API_KEY_LOW_LATENCY = process.env.REACT_APP_API_KEY_LOW_LATENCY

function fetchYahooFinanceData(endpoint, symbol, region = 'US') {
	const BASE_URL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com'
	const URL = `${BASE_URL}${endpoint}?symbol=${symbol}&region=${region}`
	return fetch(URL, {
		method: 'GET',
		headers: {
			'x-rapidapi-key': API_KEY,
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

export async function getTrendingStocks() {
	return await (
		await (
			await fetch(
				'https://yahoo-finance-low-latency.p.rapidapi.com/v1/finance/trending/US',
				{
					method: 'GET',
					headers: {
						'x-rapidapi-key': API_KEY_LOW_LATENCY,
						'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
					}
				}
			)
		).json()
	).finance.result[0].quotes
}

export function getTrendingStocksMockData() {
	const mockData = [
		{
			symbol: 'NKE'
		},
		{
			symbol: 'SQ'
		},
		{
			symbol: 'FDX'
		},
		{
			symbol: 'GTBIF'
		},
		{
			symbol: 'CL=F'
		},
		{
			symbol: 'WKEY'
		},
		{
			symbol: 'JFIN'
		},
		{
			symbol: 'MRKR'
		},
		{
			symbol: 'RBLX'
		},
		{
			symbol: 'SKLZ'
		},
		{
			symbol: 'JMIA'
		},
		{
			symbol: 'EXPR'
		},
		{
			symbol: 'MP'
		},
		{
			symbol: 'IDRA'
		},
		{
			symbol: 'NWG.L'
		},
		{
			symbol: 'KNSA'
		},
		{
			symbol: 'TSLA'
		},
		{
			symbol: 'SRPT'
		},
		{
			symbol: 'AAME'
		},
		{
			symbol: 'HIG'
		}
	]
	return mockData
}

export async function getStockDetailsLowLatency(symbol) {
	return await (
		await (
			await fetch(
				`https://yahoo-finance-low-latency.p.rapidapi.com/v11/finance/quoteSummary/${symbol}?modules=defaultKeyStatistics`,
				{
					method: 'GET',
					headers: {
						'x-rapidapi-key': API_KEY_LOW_LATENCY,
						'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
					}
				}
			)
		).json()
	).quoteSummary.result[0]
}

export async function getNameAndSymbol(symbol) {
	const result = await (
		await (
			await fetch(
				`https://yahoo-finance-low-latency.p.rapidapi.com/v11/finance/quoteSummary/${symbol}?modules=price`,
				{
					method: 'GET',
					headers: {
						'x-rapidapi-key': API_KEY_LOW_LATENCY,
						'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
					}
				}
			)
		).json()
	).quoteSummary.result[0].price
	return { symbol: result.symbol, name: result.shortName }
}

export function getNameAndSymbolMockData() {
	const mockData = [
		{
			symbol: 'TSLA',
			name: 'Tesla Inc'
		},
		{
			symbol: 'SQ',
			name: 'Square Inc'
		},
		{
			symbol: 'FDX',
			name: 'FedEx Corporation'
		},
		{
			symbol: 'GTBIF',
			name: 'Green Thumb Industries Inc'
		},
		{
			symbol: 'GME',
			name: 'GameStop Corp.'
		},
		{
			symbol: 'AMC',
			name: 'AMC Entertainment Holdings Inc'
		},
		{
			symbol: 'BTC-USD',
			name: 'Bitcoin USD'
		},
		{
			symbol: 'RBLX',
			name: 'Roblox Corp'
		},
		{
			symbol: 'SKLZ',
			name: 'Skillz Inc'
		},
		{
			symbol: 'ARKK',
			name: ' ARK Innovation ETF'
		},
		{
			symbol: 'EXPR',
			name: 'Express, Inc.'
		},
		{
			symbol: 'MP',
			name: 'Mp Materials Corp'
		},
		{
			symbol: 'IDRA',
			name: 'Idera Pharmaceuticals Inc'
		},
		{
			symbol: 'SRPT',
			name: 'Sarepta Therapeutics Inc'
		},
		{
			symbol: 'AAME',
			name: 'Atlantic American Corporation'
		},
		{
			symbol: 'HIG',
			name: 'Hartford Financial Services Group Inc'
		}
	]
	return mockData
}

export async function getAutoCompleteSearch(query) {
	return await (
		await (
			await fetch(
				`https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/autocomplete?query=${query}&lang=en&region=US`,
				{
					method: 'GET',
					headers: {
						'x-rapidapi-key': API_KEY_LOW_LATENCY,
						'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
					}
				}
			)
		).json()
	).ResultSet.Result
}
