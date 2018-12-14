import {
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_ERROR,
} from '../actions/transactionsAction'

const initialState = {
  listOfTransactions: [],
  transactionsLoading: false,
}

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS_REQUEST:
      return { ...state, transactionsLoading: true, error: null }
    case GET_TRANSACTIONS_SUCCESS:
      return { ...state, listOfTransactions: action.transactions, transactionsLoading: false }
    case GET_TRANSACTIONS_ERROR:
      return { ...state, error: action.error, transactionsLoading: false }
    default:
      return state
  }
}
