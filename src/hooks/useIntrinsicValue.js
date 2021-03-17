import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// sample stock data

function useIntrinsicValue() {
	const [loading, setLoading] = useState(true)
	const [stockData, setStockData] = useState({})
	const [error, setError] = useState('')
	let { symbol } = useParams()

	return { loading, stockData, error }
}

export default useIntrinsicValue
