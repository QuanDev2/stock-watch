import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
	getAnalysis,
	getBalanceSheet,
	getStatistics
} from '../utils/ApiService'

/**
 * sample stock data object
 *
 * stockData {
 *    symbol: "TSLA",
 *
 * // getStatistics > financialData > operatingCashflow > raw
 *    currentOperatingCashFlow: 20000,
 *
 * // getStatistics > price > regularMarketPrice > raw
 *    currentPrice: 500,
 *
 * // getStatistics > defaultKeyStatistics > sharesOutstanding > raw
 *    sharesOutStanding: 10000,
 *
 * // getStatistis > summaryDetail > beta > raw
 *    beta: 1.3
 *
 * // getBalanceSheet > balanceSheetHistoryQuarterly > balanceSheetStatements[0]> cash > raw + shortTermInvestments > raw
 *    cashAndShortTermInvestments: 50000,
 *
 * //  getBalanceSheet > balanceSheetHistoryQuarterly > balanceSheetStatements[0]> shortLongTermDebt > raw + longTermDebt > raw
 *    totalDebt: 400000,
 *
 * // getAnalysis > earningsTrend > trend[4] > growth > raw
 *    growthRate: 2.3,
 *
 * // to be calculated
 *    cashFlowGrowthRate1to5: 0.32
 *    cashFlowGrowthRate5to10: 0.22
 *    cashFlowGrowthrate11to20: 0.5
 *    discountRate: 0.04
 *    intrinsicValue: 340,
 *    underOver: 0.23
 *
 * }
 *
 */

const US_GPD_GROWTH = 0.041
const RISK_FREE_RATE = 0.0144
const MARKET_RISK_PREMIUM = 0.0342

function useIntrinsicValue() {
	let { symbol } = useParams()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [stockData, setStockData] = useState({})

	let statisticsData, balanceSheetdata, analysisData

	const fetchAllData = async () => {
		setLoading(true)
		try {
			;[statisticsData, balanceSheetdata, analysisData] = await Promise.all([
				getStatistics(symbol),
				getBalanceSheet(symbol),
				getAnalysis(symbol)
			])

			// do calculations
			const currentOperatingCashFlow =
				statisticsData.financialData.operatingCashflow.raw
			const currentOperatingCashFlowFmt =
				'$' + statisticsData.financialData.operatingCashflow.fmt
			const currentPrice = statisticsData.price.regularMarketPrice.raw
			const name = statisticsData.price.shortName
			const sharesOutStanding =
				statisticsData.defaultKeyStatistics.sharesOutstanding.raw
			const sharesOutStandingFmt =
				statisticsData.defaultKeyStatistics.sharesOutstanding.fmt

			const beta = statisticsData.summaryDetail.beta.raw
			const priceChange = statisticsData.price.regularMarketChange.fmt
			const priceChangePercent =
				statisticsData.price.regularMarketChangePercent.fmt
			const priceChangeRaw = statisticsData.price.regularMarketChange.raw

			const marketCap = '$' + statisticsData.price.marketCap.fmt
			const eps = statisticsData.defaultKeyStatistics.forwardEps
				? '$' + statisticsData.defaultKeyStatistics.forwardEps.fmt
				: '-'
			const pe = statisticsData.defaultKeyStatistics.forwardPE
				? '$' + statisticsData.defaultKeyStatistics.forwardPE.fmt
				: '-'
			const dividendYieldFmt = statisticsData.summaryDetail.dividendYield
				? statisticsData.summaryDetail.dividendYield.fmt
				: '-'

			let cash = 0
			let cashFmt = '-'
			let shortTermInvestments = 0
			let shortTermInvestmentsFmt = '-'

			let shortTermDebt = 0
			let shortTermDebtFmt = '-'
			let longTermDebtFmt = '-'
			let longTermDebt = 0
			let totalDebt = 0
			let cashAndShortTermInvestments = 0
			let cashFlowGrowthRate1to5 = 1.0
			let cashFlowGrowthRate6to10 = 1.0
			let cashFlowGrowthrate11to20 = 1.0
			let discountRate = 0.0
			// short term investments
			if (
				balanceSheetdata.balanceSheetHistoryQuarterly.balanceSheetStatements[0]
					.shortTermInvestments
			) {
				shortTermInvestments =
					balanceSheetdata.balanceSheetHistoryQuarterly
						.balanceSheetStatements[0].shortTermInvestments.raw
				shortTermInvestmentsFmt =
					'$' +
					balanceSheetdata.balanceSheetHistoryQuarterly
						.balanceSheetStatements[0].shortTermInvestments.fmt
			}

			// cash
			if (
				balanceSheetdata.balanceSheetHistoryQuarterly.balanceSheetStatements[0]
					.cash
			) {
				cash =
					balanceSheetdata.balanceSheetHistoryQuarterly
						.balanceSheetStatements[0].cash.raw
				cashFmt =
					'$' +
					balanceSheetdata.balanceSheetHistoryQuarterly
						.balanceSheetStatements[0].cash.fmt
			}

			// cash and short term investments
			cashAndShortTermInvestments = cash + shortTermInvestments

			// short term debt
			if (
				balanceSheetdata.balanceSheetHistoryQuarterly.balanceSheetStatements[0]
					.shortLongTermDebt
			) {
				shortTermDebt =
					balanceSheetdata.balanceSheetHistoryQuarterly
						.balanceSheetStatements[0].shortLongTermDebt.raw
				shortTermDebtFmt =
					'$' +
					balanceSheetdata.balanceSheetHistoryQuarterly
						.balanceSheetStatements[0].shortLongTermDebt.fmt
			}

			// long term debt
			if (
				balanceSheetdata.balanceSheetHistoryQuarterly.balanceSheetStatements[0]
					.longTermDebt
			) {
				longTermDebtFmt =
					'$' +
					balanceSheetdata.balanceSheetHistoryQuarterly
						.balanceSheetStatements[0].longTermDebt.fmt
				longTermDebt =
					balanceSheetdata.balanceSheetHistoryQuarterly
						.balanceSheetStatements[0].longTermDebt.raw
			}

			// total debt
			totalDebt = shortTermDebt + longTermDebt

			// growth rate 1-5
			cashFlowGrowthRate1to5 = analysisData.earningsTrend.trend[4].growth.raw

			// growth rate 5 - 10 years
			cashFlowGrowthRate6to10 = cashFlowGrowthRate1to5 / 2

			// growth rate 10-20 years
			cashFlowGrowthrate11to20 = US_GPD_GROWTH + 0.01

			// discount rate
			discountRate = getDiscountRate(beta)

			// sum of discounted cash flow for 20 years
			const sumDiscountedCashFlow20Years = getSumDiscountedCashFlow20Years(
				currentOperatingCashFlow,
				cashFlowGrowthRate1to5,
				cashFlowGrowthRate6to10,
				cashFlowGrowthrate11to20,
				discountRate
			)

			const debtPerShare = getDebtPerShare(totalDebt, sharesOutStanding)
			const cashPerShare = getCashPerShare(
				cashAndShortTermInvestments,
				sharesOutStanding
			)
			const intrinsicValueBeforeCashOrDebt = getIntrinsicValueBeforeCashOrDebt(
				sumDiscountedCashFlow20Years,
				sharesOutStanding
			)

			const intrinsicValue = getFinalIntrinsicValue(
				debtPerShare,
				cashPerShare,
				intrinsicValueBeforeCashOrDebt
			)

			const verdict = getVerdict(currentPrice, intrinsicValue)

			// set state
			setStockData({
				symbol: symbol,
				name: name,
				currentPrice: currentPrice,
				priceChangeFmt: priceChange,
				priceChangePercentFmt: priceChangePercent,
				priceChangeRaw: priceChangeRaw,

				marketCap: marketCap,
				eps: eps,
				pe: pe,
				dividendYieldFmt: dividendYieldFmt,
				sharesOutStandingFmt: sharesOutStandingFmt,

				operatingCashFlow: currentOperatingCashFlow,
				operatingCashFlowFmt: currentOperatingCashFlowFmt,
				shortTermDebt: shortTermDebt,
				shortTermDebtFmt: shortTermDebtFmt,
				longTermDebtFmt: longTermDebtFmt,
				totalDebt: totalDebt,
				cash: cash,
				cashFmt: cashFmt,
				shortTermInvestments: shortTermInvestments,
				shortTermInvestmentsFmt: shortTermInvestmentsFmt,
				cashAndShortTermInvestments: cashAndShortTermInvestments,
				sharesOutStanding: sharesOutStanding,
				cashFlowGrowthRate1to5: cashFlowGrowthRate1to5.toFixed(2),
				cashFlowGrowthRate6to10: cashFlowGrowthRate6to10.toFixed(2),
				cashFlowGrowthrate11to20: cashFlowGrowthrate11to20.toFixed(2),
				discountRate: discountRate.toFixed(2),
				intrinsicValue: intrinsicValue.toFixed(2),
				verdict: verdict.toFixed(2)
			})
		} catch (err) {
			setError(err)
		}

		setLoading(false)
	}

	const getDiscountRate = beta => {
		let newBeta = beta
		if (beta < 0.8) {
			newBeta = 0.8
		} else if (beta > 1.6) {
			newBeta = 1.6
		}
		return RISK_FREE_RATE + beta * MARKET_RISK_PREMIUM
	}

	const getSumDiscountedCashFlow20Years = (
		curCashFlow,
		growthRate5,
		growthRate10,
		growthRate20,
		discountRate
	) => {
		let projectedCashFlow = curCashFlow
		let sum = 0
		let growthRate
		for (let i = 0; i < 20; i++) {
			if (i < 5) {
				growthRate = growthRate5 + 1
			} else if (i < 10) {
				growthRate = growthRate10 + 1
			} else {
				growthRate = growthRate20 + 1
			}
			const discountFactor = (1 / (1 + discountRate)) ** (i + 1)
			projectedCashFlow *= growthRate
			const discountedValue = projectedCashFlow * discountFactor
			sum += discountedValue
		}

		return sum
	}

	const getDebtPerShare = (totalDebt, numShare) => {
		return totalDebt / numShare
	}

	const getCashPerShare = (totalInvestment, numShare) => {
		return totalInvestment / numShare
	}

	const getIntrinsicValueBeforeCashOrDebt = (
		sumDiscountedCashFlow20Years,
		numShare
	) => {
		return sumDiscountedCashFlow20Years / numShare
	}

	const getFinalIntrinsicValue = (
		debtPerShare,
		cashPerShare,
		intrinsicValueBeforeCashOrDebt
	) => {
		return intrinsicValueBeforeCashOrDebt + cashPerShare - debtPerShare
	}

	const getVerdict = (currentprice, intrinsicValue) => {
		return ((currentprice - intrinsicValue) / intrinsicValue) * 100
	}

	useEffect(() => {
		fetchAllData()
	}, [symbol])

	return { loading, stockData, error }
}

export default useIntrinsicValue
