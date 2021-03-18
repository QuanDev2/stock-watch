import { createStore } from 'redux'
import  { StockReducer } from'./reducer.js'
const store = createStore(StockReducer)
export default store