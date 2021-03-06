import {
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_ERROR,
  UPDATE_ACCOUNT_ID_TO_GET_TRANSACTIONS,
} from '../actions/transactionsAction'

const initialState = {
  listOfTransactions: [],
  transactionsLoading: false,
  accountID: -1,
}

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS_REQUEST:
      return { ...state, transactionsLoading: true, transactionsError: null }
    case GET_TRANSACTIONS_SUCCESS:
      return { ...state, listOfTransactions: action.transactions, transactionsLoading: false }
    case GET_TRANSACTIONS_ERROR:
      return { ...state, transactionsError: action.error, transactionsLoading: false }
    case UPDATE_ACCOUNT_ID_TO_GET_TRANSACTIONS:
      return { ...state, accountID: action.accountID }
    default:
      return state
  }
}
